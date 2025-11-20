# 📋 Deploy Google Apps Script - Session Management Update

## 🎯 Tujuan

Menambahkan sistem session management ke Google Apps Script yang sudah ada untuk mencegah multiple login dari browser/perangkat berbeda.

---

## 📝 Langkah-Langkah Deploy

### 1️⃣ **Buka Google Sheets Anda**

- Buka spreadsheet yang sudah Anda gunakan untuk aplikasi NPK Production Management
- Pastikan sheet `produksi_npk`, `produksi_miniplan`, dll sudah ada

### 2️⃣ **Buat Sheet Baru untuk Sessions**

1. Klik tombol **"+"** di bawah untuk tambah sheet baru
2. Rename sheet menjadi **`sessions`**
3. Isi header di baris pertama:
   - Cell A1: `Username`
   - Cell B1: `Session ID`
   - Cell C1: `Timestamp`
   - Cell D1: `Browser`
   - Cell E1: `IP`

### 3️⃣ **Buka Script Editor**

1. Di Google Sheets, klik **Extensions** > **Apps Script**
2. Anda akan melihat file `Code.gs` yang sudah ada

### 4️⃣ **Update Script dengan Kode Baru**

1. **BACKUP dulu script lama:**

   - Copy semua isi script lama
   - Paste ke Notepad atau file text untuk backup

2. **Ganti dengan script baru:**

   - Buka file `google-apps-script.js` dari folder proyek
   - Copy SEMUA isinya
   - Paste ke `Code.gs` di Apps Script Editor (ganti semua isi lama)

3. **Save script:**
   - Klik icon **💾 Save** atau tekan `Ctrl+S`
   - Beri nama project jika diminta (misal: "NPK Production API")

### 5️⃣ **Deploy Ulang Script**

1. Klik tombol **Deploy** > **Manage deployments**
2. Klik **icon pensil** (✏️) di deployment yang sudah ada
3. Di bagian **"New version"**, pilih **New version**
4. Klik **Deploy**
5. **PENTING:** Copy Web App URL yang baru (atau tetap sama)
   - Format: `https://script.google.com/macros/s/AKfycby.../exec`

### 6️⃣ **Update API_URL di App.tsx (Jika Perlu)**

1. Buka file `src/App.tsx`
2. Cari baris yang ada `const API_URL = ...`
3. Pastikan URL-nya sama dengan Web App URL dari step 5
4. Jika beda, update dengan URL yang baru

### 7️⃣ **Test Endpoint Sessions**

Buka browser dan test endpoint:

```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=checkSession&username=admin
```

Harusnya return:

```json
{
  "hasSession": false
}
```

---

## 🧪 Testing Multi-Login Detection

### Test Case 1: Login di Chrome

1. Buka Chrome
2. Login sebagai `admin`
3. Cek sheet `sessions` - harusnya ada 1 row baru

### Test Case 2: Coba Login di Edge dengan Akun Sama

1. Buka Edge (browser berbeda)
2. Coba login sebagai `admin` lagi
3. **Expected:** Muncul warning "Akun admin sedang aktif di perangkat/browser lain"
4. Login **ditolak** (tidak bisa masuk)
5. Chrome tetap login (tidak logout otomatis)

### Test Case 3: Logout dari Chrome

1. Logout dari Chrome
2. Cek sheet `sessions` - row admin harusnya **hilang**
3. Sekarang coba login di Edge
4. **Expected:** Berhasil login karena session sudah dihapus

### Test Case 4: Session Timeout (2 Menit)

1. Login sebagai `admin` di Chrome
2. Tunggu **2 menit** (jangan klik apa-apa)
3. Coba login di Edge dengan akun `admin`
4. **Expected:** Berhasil login karena session Chrome sudah expired

---

## 🔧 Troubleshooting

### ❌ Error: "Script function not found: doGet"

**Solusi:**

- Pastikan fungsi `doGet` ada di script
- Deploy ulang dengan version baru
- Tunggu 1-2 menit setelah deploy

### ❌ Error: "Access denied" atau 403

**Solusi:**

1. Klik **Deploy** > **Manage deployments**
2. Pastikan "Who has access" = **Anyone**
3. Redeploy

### ❌ Kedua browser bisa login bersamaan

**Solusi:**

- Cek sheet `sessions` - apakah ada data masuk?
- Jika tidak ada, berarti script belum terdeploy dengan benar
- Cek API_URL di App.tsx - pastikan benar
- Cek console browser (F12) - apakah ada error fetch?

### ❌ Keep-alive tidak berfungsi

**Solusi:**

- Session akan expired setelah 2 menit jika tidak ada aktivitas
- Keep-alive otomatis update setiap 30 detik saat user login
- Cek console browser apakah ada error saat update session

---

## 📊 Monitoring Sessions

### Lihat Active Sessions

1. Buka Google Sheets
2. Klik tab **sessions**
3. Semua user yang sedang login akan terlihat
4. Kolom timestamp menunjukkan last activity

### Manual Delete Session (Jika Perlu)

1. Buka sheet `sessions`
2. Hapus row user yang ingin di-force logout
3. User tersebut akan logout otomatis (atau tidak bisa login lagi)

---

## 🎉 Selesai!

Aplikasi Anda sekarang sudah memiliki:

- ✅ Cross-browser session tracking
- ✅ Prevent multiple simultaneous logins
- ✅ Auto session cleanup (2 menit timeout)
- ✅ Keep-alive mechanism (30 detik update)
- ✅ Centralized session monitoring via Google Sheets

Sekarang deploy ke Vercel:

```powershell
git add .
git commit -m "Add Google Sheets session management for multi-login prevention"
git push
```

Tunggu auto-deploy di Vercel selesai, lalu test di **npk-digital.vercel.app**!
