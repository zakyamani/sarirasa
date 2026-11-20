import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Dependencies, ServiceContext, Tx } from '../../src/core/contracts.js';
import { ComplaintService } from '../../src/modules/complaints/service.js';
import type { ComplaintRecord } from '../../src/modules/complaints/repository.js';
import type { OrderRecord } from '../../src/modules/orders/repository.js';
import { canonical } from '../../src/core/idempotency.js';
import { hash } from '../../src/core/crypto.js';

const now = new Date('2026-10-05T14:00:00Z');
const orderId = '550e8400-e29b-41d4-a716-446655440000';
const complaintId = '750e8400-e29b-41d4-a716-446655440000';
function order(): OrderRecord {
  return {
    id: orderId, code: 'SR-0123456789', invoice: 'INV-test', offer_id: '650e8400-e29b-41d4-a716-446655440000',
    buyer_id: 'buyer-1', seller_id: 'seller-1', status: 'paid', price: 40000, fee: 2000, fee_bps: 500,
    snapshot: { category: 'makanan_berat', allergens: [], normal_price: 100000, discount_price: 40000,
      merchant: { id: 'seller-1', name: 'Toko', address: 'Jl. Contoh', latitude: -6, longitude: 107, photo_id: null } },
    payment_deadline: new Date('2026-10-05T12:15:00Z'), pickup_start: new Date('2026-10-05T13:00:00Z'),
    pickup_end: new Date('2026-10-05T15:00:00Z'), safe_eat_until: new Date('2026-10-05T15:30:00Z'),
    paid_at: now, completed_at: null, created_at: now, updated_at: now,
  };
}
function complaint(overrides: Partial<ComplaintRecord> = {}): ComplaintRecord {
  return { id: complaintId, order_id: orderId, buyer_id: 'buyer-1', reason: 'unfit', description: 'Makanan sudah tidak layak dimakan.', status: 'open', response: null, response_due: null, created_at: now, decided_at: null, ...overrides };
}
const buyer: ServiceContext = { actor: { id: 'buyer-1', role: 'buyer', sessionId: 's1' }, clock: { now: () => now } };
const seller: ServiceContext = { actor: { id: 'seller-1', role: 'seller', sessionId: 's1' }, clock: { now: () => now } };

function harness(options: { order?: OrderRecord; complaint?: ComplaintRecord; missingComplaint?: boolean } = {}) {
  const o = options.order ?? order();
  let c = options.complaint ?? complaint();
  let payloadHash = '';
  const statements: string[] = [];
  const tx = {
    query: async (sql: string, values: unknown[] = []) => {
      statements.push(sql);
      if (sql.startsWith('INSERT INTO idempotency_keys')) { payloadHash = String(values[3]); return { rows: [], rowCount: 1 }; }
      if (sql.startsWith('SELECT * FROM idempotency_keys')) return { rows: [{ payload_hash: payloadHash, response: null }], rowCount: 1 };
      if (sql.startsWith('SELECT offer_id FROM orders')) return { rows: [{ offer_id: o.offer_id }], rowCount: 1 };
      if (sql.startsWith('SELECT * FROM offers')) return { rows: [{}], rowCount: 1 };
      if (sql.startsWith('SELECT * FROM orders')) return { rows: [o], rowCount: 1 };
      if (sql.startsWith('SELECT id FROM orders')) return { rows: [{ id: orderId }], rowCount: 1 };
      if (sql.startsWith('INSERT INTO complaints')) { c = complaint({ reason: values[2] as ComplaintRecord['reason'], description: String(values[3]), response_due: values[4] as Date | null }); return { rows: [c], rowCount: 1 }; }
      if (sql.startsWith('SELECT * FROM complaints')) return { rows: options.missingComplaint ? [] : [c], rowCount: options.missingComplaint ? 0 : 1 };
      if (sql.startsWith('SELECT media_id FROM complaint_media')) return { rows: [], rowCount: 0 };
      if (sql.startsWith('SELECT order_id FROM complaints')) return { rows: [{ order_id: orderId }], rowCount: 1 };
      if (sql.startsWith('INSERT INTO notifications')) return { rows: [{ id: 'notification-1' }], rowCount: 1 };
      return { rows: [], rowCount: 0 };
    },
  } as unknown as Tx;
  const deps = {
    db: {
      transaction: async (fn: (tx: Tx) => Promise<unknown>) => fn(tx),
      query: async () => ({ rows: [], rowCount: 0 }),
    },
    config: {}, clock: { now: () => now },
  } as unknown as Dependencies;
  return { service: new ComplaintService(deps), tx, statements, getComplaint: () => c, getPayloadHash: () => payloadHash };
}

test('C09-UT04 ComplaintService.open creates dispute and returns complaint view', async () => {
  const h = harness();
  const result = await h.service.open(buyer, { order_id: orderId, reason: 'unfit', description: 'Makanan sudah tidak layak dimakan.', media_ids: [] }, 'complaint-key');
  assert.equal(result.status, 'open');
  assert.ok(h.statements.some((sql) => sql.includes("status='dispute'")));
  assert.ok(h.statements.some((sql) => sql.startsWith('INSERT INTO payout_entitlements')));
  assert.equal(h.getPayloadHash(), hash(canonical({ order_id: orderId, reason: 'unfit', description: 'Makanan sudah tidak layak dimakan.', media_ids: [] })));
});

test('C09-UT05 ComplaintService.open enforces buyer, ownership, paid state, and pickup time', async () => {
  const value = { order_id: orderId, reason: 'unfit' as const, description: 'Makanan sudah tidak layak dimakan.', media_ids: [] };
  await assert.rejects(harness().service.open(seller, value, 'k'), { code: 'FORBIDDEN' });
  await assert.rejects(harness({ order: { ...order(), buyer_id: 'someone' } }).service.open(buyer, value, 'k'), { code: 'ORDER_NOT_FOUND' });
  await assert.rejects(harness({ order: { ...order(), status: 'completed' } }).service.open(buyer, value, 'k'), { code: 'COMPLAINT_STATE_CONFLICT' });
  await assert.rejects(harness({ order: { ...order(), pickup_end: new Date('2026-10-05T13:00:00Z') } }).service.open(buyer, value, 'k'), { code: 'COMPLAINT_EXPIRED' });
});

test('C09-UT06 ComplaintService.autoRefund rejects non-due cases without side effects', async () => {
  const h = harness();
  assert.equal(await h.service.autoRefund(h.tx, complaint(), order(), now), false);
  assert.equal(await h.service.autoRefund(h.tx, complaint({ reason: 'store_closed', response_due: new Date('2026-10-06T14:00:00Z') }), order(), now), false);
});

test('C09-UT07 ComplaintService.detail and list return complaint data with buyer/seller scopes', async () => {
  const h = harness();
  assert.equal((await h.service.detail(buyer, complaintId)).id, complaintId);
  const buyerList = await h.service.list(buyer, { status: 'open', limit: 5 });
  assert.equal(buyerList.items.length, 0);
  assert.ok(h.statements.some((sql) => sql.includes('o.buyer_id')));
  await h.service.list(seller, {});
  assert.ok(h.statements.some((sql) => sql.includes('o.seller_id')));
  await assert.rejects(harness({ missingComplaint: true }).service.detail(buyer, complaintId), { code: 'COMPLAINT_NOT_FOUND' });
});
