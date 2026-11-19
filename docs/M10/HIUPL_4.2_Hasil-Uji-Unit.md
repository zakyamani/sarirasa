# Hasil Pengujian Unit — Subbab 4.2 HIUPL

> Tabel berikut disusun dari keluaran `npm run test:unit` yang dibagikan pada 19 November 2026: 36 test lulus dan 0 gagal. Kolom hasil aktual hanya mencatat keluaran test runner; tabel ini tidak mengklaim hasil coverage karena tidak ada laporan coverage pada keluaran tersebut.
>
> Jalankan dari `src/backend` dengan `npm run test:unit`.

## Tabel 4.2.1. Hasil Pengujian Unit Kelas C01 — Penjual

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C01-UT01 | Validasi profil penjual | Normal | Parse profil berisi nama gerai, alamat, latitude, dan longitude valid. | Profil valid diterima dan nama gerai dipertahankan. | Pass — test runner lulus. | Pass |
| C01-UT02 | Validasi profil penjual | Negatif/batas | Parse profil dengan nama terlalu pendek, alamat kosong, dan koordinat di luar rentang. | Profil tidak valid ditolak. | Pass — test runner lulus. | Pass |
| C01-UT03 | Validasi rekening pada profil | Normal/negatif | Parse profil dengan nomor rekening 6 digit, lalu dengan karakter nonangka. | Nomor rekening valid diterima; nilai nonangka ditolak. | Pass — test runner lulus. | Pass |

## Tabel 4.2.2. Hasil Pengujian Unit Kelas C02 — Pembeli

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C02-UT01 | Preferensi alergen pembeli | Normal | Pastikan struktur preferensi dengan daftar alergen kosong terbentuk. | Daftar preferensi kosong tersedia. | Pass — test runner lulus. | Pass |
| C02-UT02 | Validasi daftar alergen | Normal/batas | Parse penawaran dengan daftar alergen kosong. | Daftar kosong diterima. | Pass — test runner lulus. | Pass |
| C02-UT03 | Validasi daftar alergen | Negatif | Parse penawaran dengan alergen `gluten` berulang. | Duplikasi ditolak. | Pass — test runner lulus. | Pass |
| C02-UT04 | Validasi daftar alergen | Batas/negatif | Parse penawaran dengan sembilan nilai alergen. | Jumlah lebih dari delapan ditolak. | Pass — test runner lulus. | Pass |

## Tabel 4.2.3. Hasil Pengujian Unit Kelas C03 — Penawaran

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C03-UT01 | Validasi detail penawaran | Normal | Validasi penawaran valid dengan kategori `makanan_berat`. | Data penawaran valid dikembalikan. | Pass — test runner lulus. | Pass |
| C03-UT02 | Validasi kuota | Batas/negatif | Validasi kuota 0 dan kuota 1. | Kuota 0 ditolak; kuota 1 diterima. | Pass — test runner lulus. | Pass |
| C03-UT03 | `getDetailPenawaran()` (validasi data) | Normal | Validasi penawaran dengan harga normal 100000 dan harga diskon 40000. | Harga normal dan diskon sesuai masukan. | Pass — test runner lulus. | Pass |
| C03-UT04 | Validasi jadwal pickup | Negatif/batas | Validasi waktu mulai sebelum waktu sekarang dan dua jam ke depan. | Waktu mulai yang lampau ditolak; waktu dalam batas diterima. | Pass — test runner lulus. | Pass |
| C03-UT05 | Validasi aturan penawaran | Batas/negatif | Periksa diskon 51%, kuota 500 dan 501, waktu selesai pickup sebelum mulai, batas konsumsi sebelum pickup selesai, serta konfirmasi kelayakan false. | Diskon/kuota/jadwal/konfirmasi yang melanggar aturan ditolak; kuota 500 diterima. | Pass — test runner lulus. | Pass |

## Tabel 4.2.4. Hasil Pengujian Unit Kelas C04 — Pesanan

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C04-UT01 | Batas waktu checkout | Batas | Hitung batas pembayaran 15 menit dari waktu sekarang, dengan akhir pickup lebih awal. | Deadline pembayaran dibatasi ke akhir pickup. | Pass — test runner lulus. | Pass |
| C04-UT02 | Status pesanan | Normal/negatif | Periksa status `paid` dan status tidak dikenal dalam daftar status yang diperbolehkan. | Status yang dikenal diterima; status tidak dikenal tidak termasuk. | Pass — test runner lulus. | Pass |
| C04-UT03 | Aksi berdasarkan status | Normal | Periksa aksi untuk pesanan berstatus `paid`. | Aksi pickup tersedia. | Pass — test runner lulus. | Pass |
| C04-UT04 | Kepemilikan detail pesanan | Normal/negatif | Cocokkan ID pembeli dan penjual dengan aktor, termasuk ID aktor yang berbeda. | Pemilik yang sesuai dikenali; ID lain tidak cocok. | Pass — test runner lulus. | Pass |
| C04-UT05 | Ketersediaan reservasi checkout | Negatif | Evaluasi penawaran tertutup dengan kuota tersedia 0. | Penawaran dinilai tidak tersedia untuk checkout. | Pass — test runner lulus. | Pass |

## Tabel 4.2.5. Hasil Pengujian Unit Kelas C06 — QRIS

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C06-UT01 | Enkripsi data invoice QR simulasi | Normal | Enkripsi lalu dekripsi data invoice berisi nomor, jumlah, dan waktu kedaluwarsa. | Data hasil dekripsi sama dengan data asal. | Pass — test runner lulus. | Pass |
| C06-UT02 | Batas waktu pembayaran | Batas | Bandingkan waktu sekarang dengan deadline pembayaran yang telah lewat. | Deadline yang telah lewat dikenali sebagai kedaluwarsa. | Pass — test runner lulus. | Pass |
| C06-UT03 | Dekripsi payload invoice | Negatif | Dekripsi payload terenkripsi dengan format tidak valid. | Payload tidak valid ditolak. | Pass — test runner lulus. | Pass |

## Tabel 4.2.6. Hasil Pengujian Unit Kelas C08 — QRPickup

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C08-UT01 | `generateToken()` | Normal | Buat token rahasia dan enkripsi token bersama OTP. | Token berformat base64url 43 karakter dan ciphertext memiliki versi `v1`. | Pass — test runner lulus. | Pass |
| C08-UT02 | `validasiToken(token)` | Normal | Enkripsi lalu dekripsi token dan OTP, serta bandingkan hash token. | Data kembali sama dan hash yang sama cocok. | Pass — test runner lulus. | Pass |
| C08-UT02 | `validasiToken(token)` | Negatif | Bandingkan hash yang berbeda dan coba dekripsi data invalid. | Token berbeda tidak cocok; data invalid ditolak. | Pass — test runner lulus. | Pass |
| C08-UT03 | Validasi bentuk QR/OTP | Normal | Parse kode OTP enam digit dan payload QR dengan skema input pickup. | Bentuk input yang memenuhi skema diterima. | Pass — test runner lulus. | Pass |
| C08-UT04 | Validasi input pickup | Batas/negatif | Parse OTP terlalu pendek dan QR dengan ID/payload tidak valid. | Input tidak valid ditolak. | Pass — test runner lulus. | Pass |

## Tabel 4.2.7. Hasil Pengujian Unit Kelas C09 — Pengaduan

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C09-UT01 | `ajukanPengaduan()` — validasi masukan | Normal/negatif | Parse pengaduan valid, lalu deskripsi terlalu pendek dan alasan di luar pilihan. | Masukan valid diterima; deskripsi/alasan tidak valid ditolak. | Pass — test runner lulus. | Pass |
| C09-UT02 | `prosesPengaduan(keputusan)` — validasi keputusan | Normal/negatif | Parse keputusan dengan boolean dan respons valid, lalu tipe keputusan/respons tidak valid. | Keputusan valid diterima; nilai salah tipe atau respons terlalu pendek ditolak. | Pass — test runner lulus. | Pass |
| C09-UT03 | Validasi bukti pengaduan | Batas/negatif | Parse daftar bukti duplikat dan daftar lebih dari dua berkas. | Bukti duplikat atau lebih dari dua berkas ditolak. | Pass — test runner lulus. | Pass |
| C09 tambahan | Validasi pengaduan tanpa bukti | Normal | Parse pengaduan valid dengan `media_ids` kosong. | Pengaduan tanpa lampiran diterima. | Pass — test runner lulus. | Pass |

## Tabel 4.2.8. Hasil Pengujian Unit Kelas C11 — RiwayatTransaksi

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C11-UT01 | `getRiwayatPembeli(idPembeli)` — pemilihan cakupan pengguna | Normal | Pastikan aktor buyer diarahkan ke kolom identitas `buyer_id`. | Riwayat menggunakan identitas pembeli. | Pass — test runner lulus. | Pass |
| C11-UT02 | `getRiwayatPenjual(idPenjual)` — pemilihan cakupan pengguna | Normal | Pastikan aktor seller diarahkan ke kolom identitas `seller_id`. | Riwayat menggunakan identitas penjual. | Pass — test runner lulus. | Pass |
| C11-UT03 | Pagination riwayat | Batas | Ambil 2 item dari 3 baris dengan limit 2. | Dua item ditampilkan dan next cursor tersedia. | Pass — test runner lulus. | Pass |

### Catatan cakupan

Angka `36 lulus, 0 gagal` adalah hasil keseluruhan perintah `npm run test:unit`, termasuk test tambahan `offer-rules.test.ts` serta test C05 dan C07. C05 tidak memerlukan pengujian kelas tersendiri dan C07 tidak diimplementasikan sebagai kelas tersendiri menurut klasifikasi Bab 4.1. Test yang hasilnya dicatat di atas mencakup test yang tampak pada keluaran pengguna. Beberapa test merupakan pengujian skema/aturan atau logika sederhana, bukan pemanggilan langsung operasi service yang namanya tercantum di DPPL; tabel menjaga deskripsi prosedur tetap sesuai test yang benar-benar dilaporkan.
