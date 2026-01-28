# WA Bot Panel - WhatsApp Bot Services

Website panel management bot WhatsApp dengan fitur lengkap dan modern.

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

5. **Deposit Saldo**
   - Deposit via QRIS otomatis
   - Timer countdown untuk QRIS
   - Cek status pembayaran otomatis
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

## Cara Menjalankan

1. **Lokal**
   - Download semua file (index.html, style.css, app.js)
   - Buka file index.html di browser
   - Atau gunakan live server extension di VS Code

2. **Demo Akun**
   - Email: demo@demo.com
   - Password: 123456

## Cara Mengubah Data

1. **Produk**
   - Edit array `products` di fungsi `initData()` di app.js
   - Format:
     ```javascript
     {
       id: 1,
       name: "Nama Produk",
       category: "Kategori",
       price: 10000,
       description: "Deskripsi produk",
       features: ["Fitur 1", "Fitur 2"],
       isFeatured: false
     }
     ```

2. **Banner Promosi**
   - Edit array `banners` di fungsi `initData()` di app.js
   - Format:
     ```javascript
     {
       id: 1,
       title: "Judul Banner",
       description: "Deskripsi banner",
       color: "gradient-1" // gradient-1 sampai gradient-4
     }
     ```

3. **Layanan**
   - Edit array `services` di fungsi `initData()` di app.js

## Struktur File
