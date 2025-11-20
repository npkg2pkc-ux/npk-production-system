# ✅ Setup Checklist - NPK Production Management System

## 📋 Tahap 1: Persiapan Google Sheets

### Buat Spreadsheet Baru

- [ ] Login ke Google Account
- [ ] Buka https://sheets.google.com
- [ ] Klik "Blank" untuk spreadsheet baru
- [ ] Rename: "NPK Production Database"

### Buat 12 Sheet

- [ ] Sheet 1: `produksi_npk`
- [ ] Sheet 2: `produksi_blending`
- [ ] Sheet 3: `produksi_npk_mini`
- [ ] Sheet 4: `timesheet_forklift`
- [ ] Sheet 5: `timesheet_loader`
- [ ] Sheet 6: `downtime`
- [ ] Sheet 7: `work_request`
- [ ] Sheet 8: `bahan_baku`
- [ ] Sheet 9: `vibrasi`
- [ ] Sheet 10: `gate_pass`
- [ ] Sheet 11: `akun`
- [ ] Sheet 12: `rkap`

**Catatan:** Nama sheet harus persis sama (case-sensitive)!

---

## 📋 Tahap 2: Deploy Google Apps Script

### Buka Apps Script Editor

- [ ] Di Google Sheets, klik **Extensions**
- [ ] Pilih **Apps Script**
- [ ] Tab baru akan terbuka dengan editor

### Copy Paste Script

- [ ] Hapus semua kode default di `Code.gs`
- [ ] Buka file `google-apps-script.js` dari project
- [ ] Copy seluruh isi file
- [ ] Paste ke editor Apps Script
- [ ] Klik **Save** (💾) atau Ctrl+S
- [ ] Rename project: "NPK Production API"

### Test Script (Optional tapi Recommended)

- [ ] Di dropdown function, pilih `testScript`
- [ ] Klik **Run** (▶️)
- [ ] Jika diminta authorize, klik **Review permissions**
- [ ] Pilih akun Google Anda
- [ ] Klik **Advanced** > **Go to NPK Production API (unsafe)**
- [ ] Klik **Allow**
- [ ] Cek sheet `produksi_npk` - harus ada 1 baris data test
- [ ] Hapus data test tersebut

### Deploy sebagai Web App

- [ ] Klik **Deploy** > **New deployment**
- [ ] Klik icon ⚙️ (gear) di "Select type"
- [ ] Pilih **Web app**
- [ ] Isi Description: "NPK Production API v1"
- [ ] **Execute as**: Pilih **Me** (email Anda)
- [ ] **Who has access**: Pilih **Anyone**
- [ ] Klik **Deploy**
- [ ] **COPY URL** yang muncul dan simpan!

**URL Format:**

```
https://script.google.com/macros/s/[RANDOM_ID]/exec
```

---

## 📋 Tahap 3: Update Aplikasi Web

### Update Webhook URL

- [ ] Buka file `src/App.tsx`
- [ ] Pergi ke baris 10
- [ ] Replace URL dengan URL webhook Anda:

```typescript
const WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_ID_HERE/exec";
```

- [ ] Save file (Ctrl+S)

### Install Dependencies (Jika belum)

- [ ] Buka terminal di folder project
- [ ] Run: `npm install`
- [ ] Tunggu sampai selesai

### Run Development Server

- [ ] Run: `npm run dev`
- [ ] Buka browser: http://localhost:5173
- [ ] Aplikasi harus terbuka tanpa error

---

## 📋 Tahap 4: Testing

### Test Manual di Browser

- [ ] Buka aplikasi di browser
- [ ] Klik menu "Produksi" > "Produksi NPK"
- [ ] Klik "Tambah Data"
- [ ] Isi form dengan data test:
  - Tanggal: Hari ini
  - Shift Malam Onspek: 100
  - Shift Malam Offspek: 10
  - (dst, isi semua field)
- [ ] Klik "Simpan Data"
- [ ] Harus muncul alert "Data berhasil disimpan!"
- [ ] Cek Google Sheets - data harus ada di sheet `produksi_npk`

### Test dengan test-api.js (Optional)

- [ ] Buka file `test-api.js`
- [ ] Update WEBHOOK_URL di baris 4 dengan URL Anda
- [ ] Buka Browser Console (F12)
- [ ] Copy paste isi `test-api.js` ke console
- [ ] Run: `runAllTests()`
- [ ] Cek hasil di console dan Google Sheets

### Test Semua Menu

- [ ] Dashboard - Lihat grafik dan metrik
- [ ] Produksi NPK - Create, Read, Edit, Delete
- [ ] Produksi Blending - Create, Read
- [ ] Produksi NPK Mini - Create, Read
- [ ] Timesheet Forklift - Create, Read
- [ ] Timesheet Loader - Create, Read
- [ ] Downtime - Create, Read
- [ ] Work Request - Create, Read
- [ ] Bahan Baku - Create, Read
- [ ] Vibrasi - Create, Read
- [ ] Gate Pass - Create, Read
- [ ] Akun - Create, Read
- [ ] RKAP - Create, Read

---

## 📋 Tahap 5: Production Deployment (Optional)

### Build Aplikasi

- [ ] Run: `npm run build`
- [ ] Folder `dist/` harus terbuat
- [ ] Test build: `npm run preview`

### Deploy ke Hosting

Pilih salah satu:

#### Option A: Vercel

- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run: `vercel --prod`
- [ ] Follow instructions
- [ ] Copy production URL

#### Option B: Netlify

- [ ] Login ke https://netlify.com
- [ ] Drag & drop folder `dist/`
- [ ] Copy production URL

#### Option C: GitHub Pages

- [ ] Install gh-pages: `npm i -D gh-pages`
- [ ] Add to package.json scripts: `"deploy": "gh-pages -d dist"`
- [ ] Run: `npm run deploy`

---

## 📋 Tahap 6: Security & Backup

### Security Settings

- [ ] Buka Google Sheets
- [ ] Klik **Share** button
- [ ] Set access ke **Restricted**
- [ ] Tambahkan email orang yang boleh akses
- [ ] Remove "Anyone with link"
- [ ] Jangan share webhook URL di public

### Backup

- [ ] Buat copy Google Sheets: File > Make a copy
- [ ] Simpan backup di Google Drive
- [ ] Export data penting: File > Download > Excel/CSV

### Monitoring

- [ ] Bookmark Apps Script editor
- [ ] Cek **Executions** tab untuk monitor API calls
- [ ] Setup alerts jika perlu

---

## 📋 Tahap 7: Documentation

### Save Important Info

- [ ] Simpan webhook URL di tempat aman
- [ ] Catat Google Sheets URL
- [ ] Catat production deployment URL
- [ ] Save credentials jika ada

### Share ke Team

- [ ] Share Google Sheets dengan read/write permission
- [ ] Share production URL
- [ ] Share documentation files:
  - README.md
  - GOOGLE_APPS_SCRIPT_SETUP.md
  - QUICK_REFERENCE.md

---

## ✅ Final Verification

### Functionality Check

- [ ] ✅ Dashboard menampilkan data dengan benar
- [ ] ✅ Bisa create data di semua menu
- [ ] ✅ Bisa read/view data di semua menu
- [ ] ✅ Bisa edit data
- [ ] ✅ Bisa delete data
- [ ] ✅ Grafik di dashboard update otomatis
- [ ] ✅ Kalkulasi otomatis berjalan (Total Onspek, Grounded, dll)
- [ ] ✅ Data tersimpan di Google Sheets
- [ ] ✅ No console errors

### Performance Check

- [ ] ✅ Load time < 3 detik
- [ ] ✅ Save data < 2 detik
- [ ] ✅ Smooth scrolling
- [ ] ✅ Responsive di mobile
- [ ] ✅ No memory leaks

### Security Check

- [ ] ✅ Google Sheets access restricted
- [ ] ✅ Webhook URL tidak di-public
- [ ] ✅ Password di sheet `akun` aman
- [ ] ✅ Backup tersedia

---

## 🎉 Congratulations!

Jika semua checklist di atas sudah ✅, maka aplikasi Anda sudah siap digunakan!

### Next Steps:

1. **Train users** - Ajari tim cara menggunakan aplikasi
2. **Monitor usage** - Cek Apps Script Executions regularly
3. **Gather feedback** - Dengar masukan dari users
4. **Iterate** - Improve berdasarkan feedback

### Support & Maintenance:

- Backup data setiap minggu
- Update RKAP setiap bulan
- Review data quality bulanan
- Update aplikasi jika ada bug

---

## 📞 Need Help?

### Common Issues

Lihat file: `QUICK_REFERENCE.md` bagian "Common Issues & Fixes"

### Documentation

- `README.md` - Overview dan quick start
- `GOOGLE_APPS_SCRIPT_SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - System architecture
- `QUICK_REFERENCE.md` - Quick commands dan tips

### Debugging

1. Check browser console (F12)
2. Check Apps Script Executions
3. Check Google Sheets data
4. Test with test-api.js

---

**Setup Date:** ******\_\_\_******  
**Setup By:** ******\_\_\_******  
**Webhook URL:** ******\_\_\_******  
**Google Sheets URL:** ******\_\_\_******  
**Production URL:** ******\_\_\_******
