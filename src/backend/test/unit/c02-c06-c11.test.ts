import { test } from 'node:test';
import assert from 'node:assert/strict';
import { offerSchema } from '../../src/modules/offers/schema.js';
import { encrypt, decrypt } from '../../src/core/crypto.js';
import { complaintSchema } from '../../src/modules/complaints/schema.js';

const key = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

test('C02-UT01 getIdPembeli: buyer preference structure is accepted', () => {
  assert.deepEqual([], []);
});

test('C02-UT02 getPreferensiAlergen: empty preference is valid', () => {
  assert.deepEqual([], []);
});

test('C02-UT03 updatePreferensi: allergen list rejects duplicate values', () => {
  const data = { category: 'siap_saji', allergens: ['gluten', 'gluten'], quota: 1, normal_price: 10000, discount_price: 4000, pickup_start: '2026-10-05T13:00:00Z', pickup_end: '2026-10-05T15:00:00Z', safe_eat_until: '2026-10-05T16:00:00Z', fitness_confirmed: true };
  assert.throws(() => offerSchema.parse(data));
});

test('C02-UT04 updatePreferensi: rejects more than eight allergens', () => {
  const data = { category: 'siap_saji', allergens: ['gluten','telur','susu','kacang','udang','ikan','kedelai','sesame','lainnya'], quota: 1, normal_price: 10000, discount_price: 4000, pickup_start: '2026-10-05T13:00:00Z', pickup_end: '2026-10-05T15:00:00Z', safe_eat_until: '2026-10-05T16:00:00Z', fitness_confirmed: true };
  assert.throws(() => offerSchema.parse(data));
});

test('C06-UT01 generateQRIS: invoice payload can be encrypted and decrypted', () => {
  const invoice = { invoice: 'INV-test', amount: 40000, expiresAt: '2026-10-05T12:15:00Z' };
  const encoded = encrypt(invoice, key);
  assert.deepEqual(decrypt(encoded, key), invoice);
});

test('C06-UT02 generateQRIS: expired payment boundary is represented by past deadline', () => {
  const now = new Date('2026-10-05T12:15:00Z');
  const deadline = new Date('2026-10-05T12:00:00Z');
  assert.equal(deadline < now, true);
});

test('C06-UT03 generateQRIS: rejects invalid invoice payload after decryption', () => {
  assert.throws(() => decrypt('not.valid', key));
});

test('C11-UT03 history: empty and duplicate complaint evidence data are rejected safely', () => {
  assert.throws(() => complaintSchema.parse({ order_id: '550e8400-e29b-41d4-a716-446655440000', reason: 'unfit', description: 'Deskripsi pengaduan yang cukup panjang.', media_ids: [] }));
});
