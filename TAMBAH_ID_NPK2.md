# Panduan Menambahkan ID ke Sheet NPK2

## Masalah

Sheet NPK2 (produksi_npk, produksi_blending, dll) tidak memiliki kolom ID, sehingga fungsi EDIT gagal dengan error "Data not found".

## Solusi

### Langkah 1: Tambahkan ID ke Data Existing di Google Sheets

1. **Buka Google Sheets** Database NPK Anda

2. **Buka Apps Script Editor**:

   - Klik menu **Extensions** > **Apps Script**

3. **Buat File Baru untuk Script ID**:

   - Klik tombol **+** di sebelah Files
   - Pilih **Script**
   - Beri nama: `AddIdToSheets`

4. **Copy-Paste Script**:

   - Buka file `add-id-to-npk2-sheets.js` di folder project
   - Copy seluruh isinya
   - Paste ke file `AddIdToSheets.gs` di Apps Script Editor

5. **Pilih Fungsi yang Akan Dijalankan**:

   - Di dropdown fungsi (di toolbar atas), pilih: `checkWhichSheetsHaveId`
   - Klik tombol **Run** (▶)
   - Izinkan akses jika diminta
   - Klik **View** > **Logs** untuk melihat hasilnya

6. **Jalankan Fungsi Utama**:

   - Di dropdown fungsi, pilih: `addIdToAllNPK2Sheets`
   - Klik tombol **Run** (▶)
   - **Tunggu sampai selesai** (bisa 1-2 menit tergantung jumlah data)
   - Klik **View** > **Logs** untuk melihat progress

7. **Verifikasi Hasil**:
   - Kembali ke Google Sheets
   - **Refresh** halaman (F5)
   - Cek setiap sheet NPK2, seharusnya sekarang ada kolom **id** di kolom A (paling kiri)
   - Setiap row data seharusnya sudah terisi ID unik

### Langkah 2: Test Fungsi Edit

1. **Buka webapp** di browser (localhost:5173)
2. **Login** sebagai user NPK2
3. **Pilih tab Produksi NPK**
4. **Klik Edit** pada salah satu data
5. **Ubah nilai** (misalnya Shift Malam Onspek)
6. **Klik Update Data**
7. **Cek Console** (F12) - seharusnya muncul log ✅ Success
8. **Refresh Google Sheets** - data seharusnya sudah berubah

### Langkah 3: Deploy Ulang Apps Script (Jika Perlu)

Jika setelah menambahkan ID masih ada error, pastikan Apps Script sudah di-deploy ulang:

1. Di Apps Script Editor
2. Klik **Deploy** > **Manage deployments**
3. Klik ⚙️ (gear icon) pada deployment yang aktif
4. Pilih **New version**
5. Klik **Deploy**
6. Pastikan URL deployment sama dengan WEBHOOK_URL di webapp

## Troubleshooting

### Jika Ada Error "Authorization Required"

- Klik **Review Permissions**
- Pilih akun Google Anda
- Klik **Advanced** > **Go to [Project Name] (unsafe)**
- Klik **Allow**

### Jika Fungsi Tidak Muncul di Dropdown

- Pastikan sudah save file (Ctrl+S)
- Refresh Apps Script Editor (F5)

### Jika Sheet Sudah Punya ID tapi Masih Error

- Jalankan fungsi `checkWhichSheetsHaveId` untuk verifikasi
- Jika ada row yang ID-nya kosong, jalankan ulang `addIdToAllNPK2Sheets`

### Jika Edit Masih Gagal Setelah Tambah ID

- Buka Console browser (F12)
- Cari log dengan emoji 🔄 yang menunjukkan data yang dikirim
- Pastikan ada field `id` dengan nilai yang sama dengan di Google Sheets
- Screenshot dan kirim untuk debugging

## Catatan Penting

- Script akan menambahkan kolom ID di **kolom A (paling kiri)**
- Kolom yang sudah ada akan bergeser ke kanan
- ID yang di-generate bersifat **unik dan permanent**
- Format ID: `timestamp_randomstring` (contoh: `1764923825929_2n23vgk47`)
- Data baru yang dibuat dari webapp akan **otomatis dapat ID**
- NPK1 sudah memiliki ID, tidak perlu dijalankan lagi

## Hasil Akhir

Setelah selesai, struktur sheet NPK2 akan seperti ini:

```
| id                        | tanggal    | shiftMalamOnspek | shiftMalamOffspek | ... |
|---------------------------|------------|------------------|-------------------|-----|
| 1764923825929_2n23vgk47  | 2025-12-01 | 100              | 0                 | ... |
| 1764923825941_kd92jf83   | 2025-12-02 | 154              | 2                 | ... |
```

Sama seperti NPK1! ✅
