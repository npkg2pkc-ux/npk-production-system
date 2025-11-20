# Panduan Setup Google Apps Script untuk NPK Production App

## 📋 Langkah-langkah Setup

### 1. Buat Google Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **Blank** untuk membuat spreadsheet baru
3. Beri nama: **NPK Production Database**

### 2. Buat Sheet-sheet yang Diperlukan

Buat 12 sheet dengan nama berikut (case-sensitive):

1. `produksi_npk`
2. `produksi_blending`
3. `produksi_npk_mini`
4. `timesheet_forklift`
5. `timesheet_loader`
6. `downtime`
7. `work_request`
8. `bahan_baku`
9. `vibrasi`
10. `gate_pass`
11. `akun`
12. `rkap`

**Cara membuat sheet:**

- Klik tanda **+** di bagian bawah
- Atau klik kanan pada tab sheet > Insert sheet
- Rename sheet sesuai nama di atas

### 3. Deploy Google Apps Script

1. Di Google Sheets, klik **Extensions** > **Apps Script**
2. Akan terbuka editor Apps Script dengan file `Code.gs`
3. Hapus semua kode default yang ada
4. Copy seluruh isi file `google-apps-script.js`
5. Paste ke editor Apps Script
6. Klik **Save** (💾) atau tekan `Ctrl+S`
7. Beri nama project: **NPK Production API**

### 4. Deploy sebagai Web App

1. Klik **Deploy** > **New deployment**
2. Klik icon ⚙️ (gear) di sebelah "Select type"
3. Pilih **Web app**
4. Isi konfigurasi:
   - **Description**: NPK Production API v1
   - **Execute as**: **Me** (email Anda)
   - **Who has access**: **Anyone**
5. Klik **Deploy**
6. Akan muncul popup authorization:
   - Klik **Authorize access**
   - Pilih akun Google Anda
   - Klik **Advanced** > **Go to NPK Production API (unsafe)**
   - Klik **Allow**
7. **COPY URL yang dihasilkan** - ini adalah webhook URL Anda

### 5. Test Apps Script

1. Di editor Apps Script, pilih function `testScript` dari dropdown
2. Klik **Run** (▶️)
3. Cek sheet `produksi_npk` - seharusnya ada data test
4. Jika berhasil, hapus data test tersebut

### 6. Update Webhook URL di Aplikasi Web

URL webhook Anda saat ini adalah:

```
https://script.google.com/macros/s/AKfycbwURvYXyBD0-SrqomO4eNbE16-KtdD1g6e8G0LLIZA0_nb_jkz9FHDp_SPA1r57vkVE/exec
```

**PENTING:** Jika Anda deploy ulang Apps Script, URL webhook akan berubah. Pastikan update URL di file `src/App.tsx` baris ke-10.

## 🔧 Struktur Data untuk Setiap Sheet

### 1. produksi_npk

| tanggal | shiftMalamOnspek | shiftMalamOffspek | shiftPagiOnspek | shiftPagiOffspek | shiftSoreOnspek | shiftSoreOffspek | totalOnspek | totalOffspek | total |
| ------- | ---------------- | ----------------- | --------------- | ---------------- | --------------- | ---------------- | ----------- | ------------ | ----- |

### 2. produksi_blending

| tanggal | kategori | formula | tonase |
| ------- | -------- | ------- | ------ |

### 3. produksi_npk_mini

| tanggal | formulasi | tonase |
| ------- | --------- | ------ |

### 4. timesheet_forklift

| tanggal | forklift | deskripsiTemuan | jamOff | jamStart | jamGrounded | jamOperasi | keterangan |
| ------- | -------- | --------------- | ------ | -------- | ----------- | ---------- | ---------- |

### 5. timesheet_loader

| tanggal | shift | deskripsiTemuan | jamOff | jamStart | jamGrounded | jamOperasi | keterangan |
| ------- | ----- | --------------- | ------ | -------- | ----------- | ---------- | ---------- |

### 6. downtime

| tanggal | item | deskripsi | jamOff | jamStart | downtime |
| ------- | ---- | --------- | ------ | -------- | -------- |

### 7. work_request

| tanggal | nomorWR | item | area | eksekutor | include | deskripsiPekerjaan |
| ------- | ------- | ---- | ---- | --------- | ------- | ------------------ |

### 8. bahan_baku

| tanggal | jenisBahanBaku | tonase | keterangan |
| ------- | -------------- | ------ | ---------- |

### 9. vibrasi

| tanggal | equipment | position | point | nilai | keterangan |
| ------- | --------- | -------- | ----- | ----- | ---------- |

### 10. gate_pass

| noFile | noPol | pemilikBarang | namaPembawa | namaBarang | alasanMengeluarkan | tanggal | approver |
| ------ | ----- | ------------- | ----------- | ---------- | ------------------ | ------- | -------- |

### 11. akun

| noBadge | nama | jabatan | passwordESS | passwordPismart | passwordDOF | tanggalUpdate |
| ------- | ---- | ------- | ----------- | --------------- | ----------- | ------------- |

### 12. rkap

| bulan | targetRKAP |
| ----- | ---------- |

## 🔒 Keamanan

**PENTING:**

- Sheet `akun` berisi password, pastikan hanya orang tertentu yang bisa akses
- Set permission Google Sheets ke **Restricted** atau **Only specific people**
- Untuk production, sebaiknya gunakan enkripsi password
- Jangan share webhook URL di public

## 🐛 Troubleshooting

### Error: "Script function not found: doPost"

**Solusi:** Pastikan Anda sudah save script dan deploy ulang

### Error: "Authorization required"

**Solusi:**

1. Deploy ulang dengan "Execute as: Me"
2. Authorize akses saat diminta

### Data tidak tersimpan

**Solusi:**

1. Cek nama sheet sudah benar (case-sensitive)
2. Buka Apps Script > Executions untuk lihat error log
3. Test dengan function `testScript`

### Error CORS

**Solusi:** Pastikan "Who has access" diset ke "Anyone"

## 📊 Monitoring

Untuk monitor penggunaan API:

1. Buka Apps Script
2. Klik **Executions** di sidebar kiri
3. Lihat history request dan error yang terjadi

## 🔄 Update Script

Jika perlu update script:

1. Edit code di Apps Script editor
2. Save
3. Deploy > **Manage deployments**
4. Klik ✏️ Edit
5. Ubah version ke **New version**
6. Klik **Deploy**
7. **URL tetap sama**, tidak perlu update di aplikasi

## 📞 Support

Jika ada masalah:

1. Cek Executions log di Apps Script
2. Lihat console browser (F12) untuk error di frontend
3. Test endpoint dengan Postman atau curl

---

**Catatan:** Script ini akan otomatis membuat header untuk setiap sheet jika sheet masih kosong.
