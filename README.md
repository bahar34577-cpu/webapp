# WA Bot Panel - WhatsApp Bot Services dengan API Pakasir

Website panel management bot WhatsApp dengan fitur lengkap dan integrasi API QRIS Pakasir.

## Fitur Utama

1. **Autentikasi Pengguna**
   - Login dengan email atau nomor WhatsApp
   - Registrasi akun baru
   - Validasi email dan nomor telepon
   - Sistem verifikasi akun

2. **Dashboard Pengguna**
   - Tampilan saldo dan status akun
   - Banner promosi dengan slider
   - Daftar produk dan layanan

3. **Produk & Layanan**
   - Panel Bot WhatsApp (1GB - Unlimited)
   - Sewa Bot WhatsApp (1 Jam - Permanen)
   - Layanan "Jadi Bot WhatsApp"
   - App Premium (Coming Soon)

4. **Sistem Pembayaran**
   - Checkout dengan ringkasan pembayaran
   - Swipe to confirm untuk konfirmasi pembayaran
   - Animasi pembayaran berhasil/gagal
   - Riwayat transaksi

5. **Deposit Saldo dengan API Pakasir**
   - Deposit via QRIS menggunakan API Pakasir
   - Generate QRIS langsung dari API
   - Cek status pembayaran real-time
   - Riwayat deposit

6. **Manajemen Akun**
   - Profil pengguna lengkap
   - Verifikasi email dan WhatsApp
   - Edit profil dan keamanan
   - Logout

## Teknologi yang Digunakan

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- LocalStorage untuk penyimpanan data
- Font Awesome untuk ikon
- Google Fonts (Poppins, Inter)
- QRCode.js untuk generate QR Code
- **API Pakasir untuk transaksi QRIS**

## Konfigurasi API Pakasir

1. **Ganti Project Slug**:
   - Buka file `app.js`
   - Cari `PAKASIR_CONFIG.PROJECT_SLUG`
   - Ganti `'YOUR_PROJECT_SLUG_HERE'` dengan slug proyek Anda dari Pakasir

2. **API Key**:
   - API Key sudah diatur: `ES4mWVwOTQC5zp1TYheedHcJlgt4bq7o`
   - Key ini sudah terintegrasi di kode

3. **Endpoint API Pakasir**:
   - Create QRIS: `https://app.pakasir.com/api/transactioncreate/qris`
   - Check Status: `https://app.pakasir.com/api/transactiondetail`

## Cara Menjalankan

1. **Lokal**
   - Download semua file (index.html, style.css, app.js)
   - Pastikan ada koneksi internet untuk load library
   - Buka file index.html di browser
   - Atau gunakan live server extension di VS Code

2. **Demo Akun**
   - Email: demo@demo.com
   - Password: 123456

## Cara Mengubah Data

1. **Produk**
   - Edit array `products` di fungsi `initData()` di app.js

2. **Banner Promosi**
   - Edit array `banners` di fungsi `initData()` di app.js

3. **Layanan**
   - Edit array `services` di fungsi `initData()` di app.js

## Struktur File
