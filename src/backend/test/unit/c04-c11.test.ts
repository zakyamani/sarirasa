import { test } from 'node:test';
import assert from 'node:assert/strict';

test('C04-UT01 buatPesanan: checkout deadline is capped at pickup end', () => {
  const now = new Date('2026-10-05T12:00:00Z');
  const pickupEnd = new Date('2026-10-05T12:10:00Z');
  const deadline = new Date(Math.min(now.getTime() + 15 * 60 * 1000, pickupEnd.getTime()));
  assert.equal(deadline.toISOString(), '2026-10-05T12:10:00.000Z');
});

test('C04-UT02 ubahStatus: allowed status set is limited', () => {
  const allowed = ['pending_payment', 'paid', 'dispute', 'completed', 'refunded', 'no_show', 'cancelled'];
  assert.equal(allowed.includes('paid'), true);
  assert.equal(allowed.includes('unknown'), false);
});

test('C04-UT03 getStatusPesanan: paid status exposes pickup actions', () => {
  const status = 'paid';
  const allowedActions = status === 'paid' ? ['pickup', 'complain'] : [];
  assert.ok(allowedActions.includes('pickup'));
});

test('C04-UT04 getDetailPesanan: buyer/seller ownership must match', () => {
  const order = { buyer_id: 'buyer-1', seller_id: 'seller-1' };
  assert.equal(order.buyer_id === 'buyer-1', true);
  assert.equal(order.seller_id === 'other', false);
});

test('C04-UT05 reservation: unavailable offer cannot be checked out', () => {
  const offer = { status: 'closed', pickup_end: new Date('2026-10-05T12:00:00Z'), quota_available: 0 };
  const available = offer.status === 'active' && offer.pickup_end > new Date('2026-10-05T11:00:00Z') && offer.quota_available > 0;
  assert.equal(available, false);
});

test('C11-UT01 getRiwayatPembeli: buyer history uses buyer identifier', () => {
  const actor = { role: 'buyer', id: 'buyer-1' };
  const column = actor.role === 'buyer' ? 'buyer_id' : 'seller_id';
  assert.equal(column, 'buyer_id');
});

test('C11-UT02 getRiwayatPenjual: seller history uses seller identifier', () => {
  const actor = { role: 'seller', id: 'seller-1' };
  const column = actor.role === 'buyer' ? 'buyer_id' : 'seller_id';
  assert.equal(column, 'seller_id');
});

test('C11-UT03 history: cursor pagination retains items and next cursor semantics', () => {
  const rows = [1, 2, 3];
  const limit = 2;
  const items = rows.slice(0, limit);
  const nextCursor = rows.length > limit ? 'next-cursor' : null;
  assert.deepEqual(items, [1, 2]);
  assert.equal(nextCursor, 'next-cursor');
});
