# NPK Production Management System

Web aplikasi untuk manajemen produksi NPK dengan fitur lengkap tracking produksi, timesheet, downtime, dan laporan.

## Fitur

- 📊 Dashboard dengan grafik dan metrik produksi
- 🏭 Manajemen Produksi NPK, Blending, dan NPK Mini
- 📝 Timesheet Forklift dan Loader
- ⚠️ Tracking Downtime
- 📋 Work Request Management
- 📦 Manajemen Bahan Baku
- 🔧 Monitoring Vibrasi Equipment
- 🚪 Gate Pass System
- ⚙️ Setting RKAP dan Akun
- 💬 **Chat Room** - Komunikasi real-time untuk semua role (Admin, Supervisor, User)

## Teknologi

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts (untuk grafik)
- Lucide React (untuk icon)

## Instalasi

1. Install dependencies:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka browser di `http://localhost:5173`

## Build untuk Production

```bash
npm run build
```

Hasil build akan ada di folder `dist/`

## Preview Production Build

```bash
npm run preview
```

## Struktur Project

```
├── src/
│   ├── components/
│   │   └── ui/          # Komponen UI dasar (Button, Card, Input, dll)
│   ├── App.tsx          # Komponen utama aplikasi
│   ├── main.tsx         # Entry point aplikasi
│   └── index.css        # Global CSS dengan Tailwind
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── tailwind.config.js   # Tailwind CSS config
```

## Integrasi Google Sheets

Aplikasi ini terintegrasi dengan Google Sheets melalui webhook URL untuk menyimpan dan membaca data.

### Setup Google Apps Script

**Lihat panduan lengkap di:** [GOOGLE_APPS_SCRIPT_SETUP.md](GOOGLE_APPS_SCRIPT_SETUP.md)

**File yang perlu Anda deploy:**

1. `google-apps-script.js` - Copy ke Google Apps Script
2. `test-api.js` - Untuk testing API endpoints

**Webhook URL (contoh):**

```
https://script.google.com/macros/s/AKfycbwURvYXyBD0-SrqomO4eNbE16-KtdD1g6e8G0LLIZA0_nb_jkz9FHDp_SPA1r57vkVE/exec
```

**Langkah Singkat:**

1. Buat Google Sheets baru dengan 12 sheet (produksi_npk, produksi_blending, dll)
2. Extensions > Apps Script
3. Copy paste isi `google-apps-script.js`
4. Deploy sebagai Web App (Execute as: Me, Access: Anyone)
5. Copy webhook URL dan update di `src/App.tsx` baris 10

**Testing API:**
Buka browser console dan jalankan:

```javascript
// Copy paste isi test-api.js ke console
testReadData("produksi_npk");
```

## File Penting

- `google-apps-script.js` - Script untuk Google Sheets backend
- `GOOGLE_APPS_SCRIPT_SETUP.md` - Panduan lengkap setup Google Apps Script
- `test-api.js` - Script untuk testing API endpoints
- `src/App.tsx` - Aplikasi utama React

## Troubleshooting

### Data tidak tersimpan ke Google Sheets

1. Pastikan webhook URL sudah benar di `src/App.tsx` baris 10
2. Cek Apps Script sudah di-deploy sebagai Web App
3. Pastikan "Who has access" di-set ke "Anyone"
4. Lihat error di browser console (F12)
5. Cek execution log di Apps Script

### Error CORS

Pastikan Apps Script di-deploy dengan setting "Who has access: Anyone"

### Sheet tidak ditemukan

Pastikan nama sheet di Google Sheets sesuai (case-sensitive):

- produksi_npk
- produksi_blending
- produksi_npk_mini
- dll (lihat GOOGLE_APPS_SCRIPT_SETUP.md)

## Lisensi

© 2025 NPK NPKG2 Production
