# Hasil Pengujian Unit — Subbab 4.2 HIUPL

> Tabel berikut disusun dari hasil pengujian unit terbaru pada 20 November 2026: **62 test lulus dan 0 gagal**. Jalankan dari `src/backend` dengan `npm run test:unit`.
>
> Coverage dinilai pada implementasi kelas inti, bukan pada seluruh file yang ikut dimuat dalam proses unit test.

## Tabel 4.2.1. Hasil Pengujian Unit Kelas C01 — Penjual

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C01-UT01 | `getIdPenjual()` / validasi profil | Normal | Parse profil berisi `shop_name`, alamat, latitude, dan longitude yang valid. | Profil valid diterima dan nama gerai dipertahankan. | **62 suite unit:** test runner lulus. | Pass |
| C01-UT02 | `getProfil()` / validasi profil | Negatif/batas | Parse profil dengan nama terlalu pendek, alamat kosong, latitude di luar rentang, dan longitude di luar rentang. | Profil tidak lengkap atau koordinat tidak valid ditolak. | **62 suite unit:** test runner lulus. | Pass |
| C01-UT03 | Validasi rekening pada profil | Normal/negatif | Profil dengan `bank_destination` enam digit, kemudian dengan karakter nonangka. | Rekening enam digit diterima; nilai nonangka ditolak. | **62 suite unit:** test runner lulus. | Pass |

## Tabel 4.2.2. Hasil Pengujian Unit Kelas C02 — Pembeli

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C02-UT01 | `getIdPembeli()` | Normal | Periksa struktur preferensi pembeli dengan daftar alergen kosong. | Struktur preferensi kosong terbentuk dengan benar. | **62 suite unit:** test runner lulus. | Pass |
| C02-UT02 | `getPreferensiAlergen()` | Normal/batas | Parse penawaran dengan daftar alergen kosong. | Daftar alergen kosong diterima. | **62 suite unit:** test runner lulus. | Pass |
| C02-UT03 | `updatePreferensi(alergen)` | Negatif | Parse daftar dengan nilai `gluten` berulang. | Duplikasi alergen ditolak. | **62 suite unit:** test runner lulus. | Pass |
| C02-UT04 | `updatePreferensi(alergen)` | Batas/negatif | Parse daftar dengan sembilan alergen. | Lebih dari delapan alergen ditolak. | **62 suite unit:** test runner lulus. | Pass |

## Tabel 4.2.3. Hasil Pengujian Unit Kelas C03 — Penawaran

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C03-UT01 | `getIdPenawaran()` | Normal | Validasi penawaran dengan kategori `makanan_berat`. | Data penawaran valid dikembalikan. | Test runner lulus. | Pass |
| C03-UT02 | `kurangiKuota(qty)` | Batas/negatif | Validasi kuota 0 dan kuota 1. | Kuota 0 ditolak; kuota 1 diterima. | Test runner lulus. | Pass |
| C03-UT03 | `getDetailPenawaran()` | Normal | Validasi harga normal 100000 dan harga diskon 40000. | Detail harga sesuai masukan. | Test runner lulus. | Pass |
| C03-UT04 | `ubahStatus(status)` | Negatif/batas | Jadwal pickup sebelum sekarang dan jadwal pada rentang valid. | Jadwal lampau ditolak; jadwal valid diterima. | Test runner lulus. | Pass |
| C03-UT05 | Validasi aturan penawaran | Batas/negatif | Uji diskon, kuota maksimum, waktu pickup, safe-eat, dan konfirmasi kelayakan. | Nilai di luar batas ditolak; nilai batas valid diterima. | Test runner lulus. | Pass |
| C03-UT06 | `create()` | Normal/negatif | Profil penjual lengkap dan penawaran valid; profil penjual tidak lengkap. | Penawaran dibuat serta diaudit untuk penjual valid; penjual invalid ditolak. | Test runner lulus. | Pass |
| C03-UT07 | `create()` | Negatif | Profil penjual tidak lengkap dan pengguna bukan penjual. | `PROFILE_INCOMPLETE` atau `FORBIDDEN` dikembalikan. | Test runner lulus. | Pass |
| C03-UT08 | `update()` | Normal/batas | Perbarui penawaran aktif yang belum memiliki reservasi atau pembayaran. | Penawaran diperbarui dan audit dicatat. | Test runner lulus. | Pass |
| C03-UT09 | `update()` | Negatif | Penawaran reserved, pernah dibayar, closed, atau tidak ditemukan. | Penawaran ditolak sesuai `OFFER_RESERVED`, `OFFER_PAID`, `OFFER_CLOSED`, atau `OFFER_NOT_FOUND`. | Test runner lulus. | Pass |
| C03-UT10 | `close()` | Normal/negatif | Tutup penawaran active dan tutup penawaran yang sudah closed. | Penawaran active berubah menjadi closed; penawaran closed tidak berubah. | Test runner lulus. | Pass |
| C03-UT11 | `list()` dan `detail()` | Normal/negatif | Ambil satu halaman penawaran penjual dan detail milik penjual lain/tidak ada. | Pagination dan scope penjual diterapkan; detail invalid ditolak. | Test runner lulus. | Pass |

### Ringkasan Cakupan Kelas C03

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `getIdPenawaran()`, `kurangiKuota(qty)`, `getDetailPenawaran()`, `ubahStatus(status)`; implementasi layanan juga menyediakan `create()`, `update()`, `close()`, `list()`, dan `detail()` |
| Operasi yang diuji | Seluruh operasi validasi C03 serta operasi layanan `create()`, `update()`, `close()`, `list()`, dan `detail()` |
| ID Algoritma yang tercakup | Validasi integer diskon dan kuota, validasi batas waktu UTC/pickup, kepemilikan penjual, status mutable, pagination, dan audit |
| Statement/line coverage | `offers/service.ts` 100%; `offers/repository.ts` 100%; `offers/schema.ts` 100% |
| Branch coverage | `offers/service.ts` 84,62%; `offers/repository.ts` 100%; `offers/schema.ts` 100% |
| Fungsi | `offers/service.ts` 100%; `offers/repository.ts` 100%; `offers/schema.ts` 100% |
| Alat dan bukti | Node.js `--experimental-test-coverage` melalui `npm run test:coverage:c03`; 12 test lulus, 0 gagal |

## Tabel 4.2.4. Hasil Pengujian Unit Kelas C04 — Pesanan

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C04-UT01 | `read()` pada repository | Normal/negatif | Baca pesanan yang ada dan pesanan tidak ada. | Pesanan ditemukan atau `undefined` dikembalikan. | Test runner lulus. | Pass |
| C04-UT02 | `release()` pada repository | Normal/negatif | Reservasi held ada dan tidak ada. | Inventori dikembalikan hanya jika reservasi held ada. | Test runner lulus. | Pass |
| C04-UT03 | `list()` pembeli | Normal/batas | Daftar pembeli dengan limit 2, tiga baris, status paid. | Scope buyer digunakan dan next cursor dibuat. | Test runner lulus. | Pass |
| C04-UT04 | `list()` penjual | Normal/batas | Daftar penjual dengan satu baris terakhir. | Scope seller digunakan dan next cursor bernilai null. | Test runner lulus. | Pass |
| C04-UT05 | `detail()` pembeli pending | Normal/negatif | Pesanan pending_payment milik pembeli. | Aksi `pay` tersedia; identitas merchant tidak dirilis. | Test runner lulus. | Pass |
| C04-UT06 | `detail()` penjual paid | Normal | Pesanan paid milik penjual pada jendela pickup. | Aksi `cancel` dan `pickup` tersedia; detail merchant terlihat. | Test runner lulus. | Pass |
| C04-UT07 | `detail()` pembeli completed | Normal | Pesanan completed milik pembeli. | Aksi `review` tersedia. | Test runner lulus. | Pass |
| C04-UT08 | `detail()` | Negatif | Pembeli lain mencoba membaca pesanan. | `ORDER_NOT_FOUND` dikembalikan. | Test runner lulus. | Pass |
| C04-UT09 | `processNoShow()` | Negatif/batas | Pesanan belum paid, belum melewati pickup, atau memiliki complaint open. | Tidak ada no-show dan payout tidak dijadwalkan. | Test runner lulus. | Pass |
| C04-UT10 | `processNoShow()` | Normal/batas | Pesanan paid melewati pickup_end tanpa complaint open. | Status berubah no_show dan payout dijadwalkan. | Test runner lulus. | Pass |
| C04-UT11 | `checkout()` | Normal | Penawaran valid milik penjual dengan kuota tersedia dan pembeli valid. | Pesanan dibuat, reservasi stok dibuat, dan payment intent diterbitkan. | Test runner lulus. | Pass |
| C04-UT12 | `checkout()` | Negatif | Pengguna bukan pembeli, penawaran unavailable, atau alergen berkonflik. | Role, availabilitas, atau filter alergen ditolak. | Test runner lulus. | Pass |
| C04-UT13 | `cancelBySeller()` | Normal | Penjual membatalkan pesanan paid miliknya. | Refund dibuat, complaint open disetujui, status menjadi refunded. | Test runner lulus. | Pass |
| C04-UT14 | `cancelBySeller()` | Negatif | Pengguna bukan penjual, penjual bukan pemilik, atau status tidak dapat dibatalkan. | Role, kepemilikan, atau state pesanan ditolak. | Test runner lulus. | Pass |

### Ringkasan Cakupan Kelas C04

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `buatPesanan()`, `ubahStatus(statusBaru)`, `getStatusPesanan()`, `getDetailPesanan()` |
| Operasi yang diuji | Implementasi aktual: `checkout()`, `detail()`, `list()`, `cancelBySeller()`, `processNoShow()` serta repository `read()` dan `release()` |
| ID Algoritma yang tercakup | Reservasi kuota, batas deadline pembayaran, scope pembeli/penjual, aksi status pesanan, no-show, refund pembatalan, dan state pesanan |
| Statement/line coverage | `orders/service.ts` 99,65%; `orders/repository.ts` 100% |
| Branch coverage | `orders/service.ts` 90,91%; `orders/repository.ts` 100% |
| Fungsi | `orders/service.ts` 100%; `orders/repository.ts` 100% |
| Alat dan bukti | Node.js `--experimental-test-coverage` melalui `npm run test:coverage:c04`; 16 test lulus, 0 gagal |

## Tabel 4.2.5. Hasil Pengujian Unit Kelas C06 — QRIS

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C06-UT01 | `generateQRIS()` | Normal | Enkripsi dan dekripsi invoice berisi nomor, jumlah, dan waktu kedaluwarsa. | Data hasil dekripsi sama dengan data asal. | Test runner lulus. | Pass |
| C06-UT02 | `generateQRIS()` | Batas | Bandingkan waktu sekarang dengan payment deadline yang telah lewat. | Deadline lampau dikenali kedaluwarsa. | Test runner lulus. | Pass |
| C06-UT03 | Dekripsi payload invoice | Negatif | Dekripsi payload terenkripsi dengan format tidak valid. | Payload tidak valid ditolak. | Test runner lulus. | Pass |

## Tabel 4.2.6. Hasil Pengujian Unit Kelas C08 — QRPickup

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C08-UT01 | `generateToken()` | Normal | Buat secret token dan ciphertext bersama OTP. | Token base64url 43 karakter dan ciphertext berformat `v1`. | Test runner lulus. | Pass |
| C08-UT02 | `validasiToken(token)` | Normal/negatif | Dekripsi token/OTP valid dan bandingkan hash valid/tidak valid. | Nilai valid dikenali; nilai invalid atau tampered ditolak. | Test runner lulus. | Pass |
| C08-UT03 | `tandaiDigunakan()` | Normal/batas | Parse OTP enam digit dan payload QR. | Bentuk OTP/QR yang memenuhi skema diterima. | Test runner lulus. | Pass |
| C08-UT04 | Validasi input pickup | Batas/negatif | OTP pendek dan QR dengan bentuk/payload tidak valid. | Input tidak valid ditolak. | Test runner lulus. | Pass |
| C08-UT05 | `issue()` | Normal | Terbitkan credential untuk pesanan. | Credential QR/OTP tersimpan dengan token hash dan ciphertext. | Test runner lulus. | Pass |
| C08-UT06 | `credential()` | Normal/negatif | Ambil credential active; credential tidak ada. | Credential active dikembalikan; credential tidak tersedia menghasilkan `undefined`. | Test runner lulus. | Pass |
| C08-UT07 | `validate()` | Normal | Validasi QR pesanan milik penjual dan paid pada jendela pickup. | Pesanan completed dan payout dijadwalkan. | Test runner lulus. | Pass |
| C08-UT08 | `validate()` | Negatif | Penjual salah, QR invalid, pesanan unavailable, atau credential used. | Kesalahan kepemilikan, QR, status, atau credential ditolak. | Test runner lulus. | Pass |

### Ringkasan Cakupan Kelas C08

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `generateToken()`, `validasiToken(token)`, `tandaiDigunakan()` |
| Operasi yang diuji | Seluruh operasi implementasi: `issue()`, `credential()`, `validate()` serta pembentukan dan validasi token/OTP/QR |
| ID Algoritma yang tercakup | Penyimpanan hash dan enkripsi credential, pembentukan OTP enam digit, pembatasan percobaan, validasi kepemilikan/status/jadwal, dan completion payout |
| Statement/line coverage | `pickup/service.ts` 89,76%; `pickup/repository.ts` 88,46%; `pickup/schema.ts` 100% |
| Branch coverage | `pickup/service.ts` 89,47%; `pickup/repository.ts` 100%; `pickup/schema.ts` 100% |
| Fungsi | `pickup/service.ts` 100%; `pickup/repository.ts` 75%; `pickup/schema.ts` 100% |
| Alat dan bukti | Node.js `--experimental-test-coverage` melalui `npm run test:coverage:c08`; 15 test lulus, 0 gagal |

## Tabel 4.2.7. Hasil Pengujian Unit Kelas C09 — Pengaduan

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C09-UT01 | `ajukanPengaduan()` | Normal/negatif | Alasan valid, deskripsi terlalu pendek, atau alasan tidak dikenal. | Masukan valid diterima; deskripsi/alasan tidak valid ditolak. | Test runner lulus. | Pass |
| C09-UT02 | `prosesPengaduan(keputusan)` | Normal/negatif | Keputusan boolean dan respons valid; tipe keputusan/respons tidak valid. | Keputusan valid diterima; tipe tidak valid ditolak. | Test runner lulus. | Pass |
| C09-UT03 | Validasi bukti | Batas/negatif | Media duplicate atau lebih dari dua file. | Bukti duplikat atau berlebih ditolak. | Test runner lulus. | Pass |
| C09-UT04 | `open()` | Normal | Pesanan paid milik pembeli membuka dispute. | Dispute dan complaint view dibuat. | Test runner lulus. | Pass |
| C09-UT05 | `open()` | Negatif | Pembeli salah, pesanan bukan miliknya, belum paid, atau belum melewati batas pickup. | Pengaduan ditolak sesuai aturan kepemilikan dan status. | Test runner lulus. | Pass |
| C09-UT06 | `autoRefund()` | Batas/negatif | Complaint belum jatuh tempo dan complaint toko tutup yang jatuh tempo. | Complaint belum jatuh tempo tidak diproses; due complaint direfund. | Test runner lulus. | Pass |
| C09-UT07 | `detail()` dan `list()` | Normal | Ambil detail dan daftar dengan scope buyer/seller. | Data complaint sesuai scope pengguna dikembalikan. | Test runner lulus. | Pass |
| C09-UT08 | `decide()` approve | Normal | Keputusan approve pada complaint open. | Complaint approved dan refund dipicu. | Test runner lulus. | Pass |
| C09-UT08b | `decide()` reject | Normal | Keputusan reject pada complaint open. | Complaint rejected dan status pesanan kembali paid. | Test runner lulus. | Pass |
| C09-UT09 | `decide()` repeated/negative | Negatif/batas | Keputusan berulang atau kasus negatif. | Keputusan berulang ditangani; kasus negatif ditolak. | Test runner lulus. | Pass |
| C09-UT10 | `decide()` | Negatif | State dispute tidak konsisten. | Keputusan ditolak untuk state tidak konsisten. | Test runner lulus. | Pass |
| C09 tambahan | Pengaduan tanpa bukti | Normal | `media_ids` kosong pada pengaduan valid. | Pengaduan tanpa lampiran diterima. | Test runner lulus. | Pass |

### Ringkasan Cakupan Kelas C09

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ajukanPengaduan()`, `prosesPengaduan(keputusan)` |
| Operasi yang diuji | Implementasi aktual: `open()`, `autoRefund()`, `detail()`, `list()`, `decide()` serta validasi schema pengaduan/keputusan/bukti |
| ID Algoritma yang tercakup | Validasi alasan/deskripsi/bukti, kepemilikan pesanan, state paid/pickup, auto-refund, scope pengguna, approve/reject, dan penanganan repeated decision |
| Statement/line coverage | `complaints/service.ts` 95,69%; `complaints/repository.ts` 96,88% |
| Branch coverage | `complaints/service.ts` 80,85%; `complaints/repository.ts` 83,33% |
| Fungsi | `complaints/service.ts` 100%; `complaints/repository.ts` 80% |
| Alat dan bukti | Node.js `--experimental-test-coverage` pada file C09; 8 test layanan C09 lulus, 0 gagal |

## Tabel 4.2.8. Hasil Pengujian Unit Kelas C11 — RiwayatTransaksi

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C11-UT01 | `getRiwayatPembeli(idPembeli)` | Normal | Aktor buyer diubah menjadi scope `buyer_id`. | Riwayat hanya menggunakan kolom identitas pembeli. | Test runner lulus. | Pass |
| C11-UT02 | `getRiwayatPenjual(idPenjual)` | Normal | Aktor seller diubah menjadi scope `seller_id`. | Riwayat hanya menggunakan kolom identitas penjual. | Test runner lulus. | Pass |
| C11-UT03 | Pagination riwayat | Batas | Ambil dua item dari tiga baris dengan limit 2. | Dua item dikembalikan dan next cursor tersedia. | Test runner lulus. | Pass |

## C05 — MetodePembayaran dan C07 — EWallet

Kelas C05 dan C07 tidak diwujudkan sebagai kelas mandiri. C05 direpresentasikan melalui abstraksi/simulasi payment method pada pembayaran, sedangkan C07 tidak memiliki implementasi kelas tersendiri. Pengujian C05-UT01 dan C05-UT02, serta C07-UT01, tercatat lulus dalam unit suite sebesar 62 test. Karena tidak ada kelas mandiri, tidak ada ringkasan coverage kelas C05/C07 yang terpisah.

### Catatan cakupan

- Hasil unit suite keseluruhan: **62 test lulus dan 0 gagal**.
- Lokasi test C04: `src/backend/test/unit/c04-c11.test.ts`.
- Lokasi test C03: `src/backend/test/unit/c03-offer.test.ts`, `src/backend/test/unit/c03-offer-service.test.ts`, `src/backend/test/unit/offer-rules.test.ts`.
- Lokasi test C08: `src/backend/test/unit/c08-pickup.test.ts`, `src/backend/test/unit/c08-pickup-service.test.ts`.
- Lokasi test C09: `src/backend/test/unit/c09-complaint-service.test.ts`.
- Lokasi test C11: `src/backend/test/unit/c04-c11.test.ts`.
