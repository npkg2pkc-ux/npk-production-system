# Instruksi Update Sistem Edit & Delete

## ✅ Perubahan yang Sudah Dilakukan

### 1. **Frontend (App.tsx)**

- ✅ Menambahkan fungsi `updateData()` dan `deleteDataFromSheet()`
- ✅ Memperbaiki 12 submit handlers untuk menggunakan `updateData()` saat editing
- ✅ Memperbaiki `handleDelete()` untuk memanggil API backend sebelum menghapus dari local state
- ✅ Menambahkan field `id?: string` di semua 12 interface TypeScript

### 2. **Backend (google-apps-script.js)**

- ✅ Menambahkan auto-generate ID unik untuk setiap data baru
- ✅ Memperbaiki `updateData()` untuk mencari berdasarkan ID unik (lebih akurat)
- ✅ Memperbaiki `deleteData()` untuk mencari berdasarkan ID unik
- ✅ Menambahkan fallback ke field identifier lama untuk backward compatibility
- ✅ Menambahkan kolom "id" di semua header sheet

## 🔧 Langkah-Langkah Update Google Apps Script

### **PENTING: Anda HARUS Update Google Apps Script!**

1. **Buka Google Sheets Anda**

   - Buka spreadsheet yang digunakan untuk aplikasi ini

2. **Buka Apps Script Editor**

   - Klik menu **Extensions** > **Apps Script**

3. **Update Script**

   - Pilih semua kode yang ada (Ctrl+A)
   - Hapus semua
   - Copy seluruh isi file `google-apps-script.js` yang sudah diupdate
   - Paste ke Apps Script Editor

4. **Save & Deploy Ulang**

   - Klik **Save** (ikon disket atau Ctrl+S)
   - Klik **Deploy** > **Manage deployments**
   - Klik ikon **Edit** (pensil) pada deployment yang aktif
   - Pada **Version**, pilih **New version**
   - Klik **Deploy**

5. **WAJIB: Tambahkan Kolom ID di Sheet yang Sudah Ada**

   **UNTUK SHEET YANG SUDAH MEMILIKI DATA:**

   - Buka setiap sheet (produksi_npk, produksi_blending, dll)
   - Insert kolom baru di kolom A (paling kiri)
   - Beri nama kolom: **id**
   - Untuk data yang sudah ada, Anda bisa:
     - **Opsi 1 (Rekomendasi):** Biarkan kosong untuk data lama. Sistem akan menggunakan fallback identifier (tanggal, nomorWR, dll)
     - **Opsi 2:** Generate ID manual untuk setiap row dengan formula:
       ```
       =TEXT(NOW(),"yyyymmddhhmmss")&"_"&RANDBETWEEN(10000,99999)
       ```

## 🎯 Cara Kerja Sistem Baru

### **Create (Tambah Data Baru)**

1. User mengisi form dan submit
2. Backend auto-generate ID unik (timestamp + random)
3. Data disimpan ke Google Sheets dengan ID

### **Update (Edit Data)**

1. User klik tombol Edit
2. Form terisi dengan data existing (termasuk ID-nya)
3. User ubah data dan submit
4. Frontend memanggil `updateData()` dengan ID
5. Backend mencari row berdasarkan ID unik
6. Row ditemukan dan diupdate

### **Delete (Hapus Data)**

1. User klik tombol Delete
2. Frontend memanggil `deleteDataFromSheet()` dengan data (termasuk ID)
3. Backend mencari row berdasarkan ID unik
4. Row ditemukan dan dihapus
5. Frontend menghapus dari tampilan lokal

## 🔄 Backward Compatibility

Sistem ini tetap kompatibel dengan data lama yang belum memiliki ID:

- Jika ID tidak ditemukan, sistem akan fallback ke identifier lama:
  - `produksi_npk` → mencari berdasarkan `tanggal`
  - `work_request` → mencari berdasarkan `nomorWR`
  - `gate_pass` → mencari berdasarkan `noFile`
  - `akun` → mencari berdasarkan `noBadge`
  - `rkap` → mencari berdasarkan `bulan`

## ⚠️ Catatan Penting

1. **Data dengan tanggal sama:** Sebelumnya, jika ada 2 data dengan tanggal yang sama, edit/delete akan mengenai data pertama saja. Dengan sistem ID baru, masalah ini teratasi.

2. **Data lama tanpa ID:** Data lama yang belum memiliki ID masih bisa diedit/dihapus menggunakan fallback mechanism, tapi kurang akurat jika ada duplikat identifier.

3. **Data baru:** Semua data baru yang ditambahkan setelah update ini akan otomatis memiliki ID unik.

## 🧪 Testing

Setelah update, test fitur berikut:

### Test Create

- ✅ Tambah data baru → cek apakah muncul di Google Sheets dengan ID
- ✅ Refresh aplikasi → cek apakah data masih muncul

### Test Edit

- ✅ Edit data baru → cek apakah data ter-update (bukan menambah data baru)
- ✅ Edit data lama (tanpa ID) → cek apakah masih bisa diedit
- ✅ Edit 2 data dengan tanggal sama → cek apakah mengedit yang benar

### Test Delete

- ✅ Delete data baru → cek apakah hilang dari Google Sheets
- ✅ Delete data lama (tanpa ID) → cek apakah masih bisa dihapus
- ✅ Refresh aplikasi → cek apakah data yang dihapus tidak muncul lagi

## 🆘 Troubleshooting

### Error: "Data not found" saat edit/delete

- Pastikan Google Apps Script sudah diupdate
- Pastikan deployment sudah diupdate ke version baru
- Clear cache browser (Ctrl+Shift+Delete)

### Data baru tidak muncul ID-nya

- Cek Console log browser (F12)
- Pastikan response dari backend menyertakan ID
- Pastikan Apps Script sudah di-save dan deploy ulang

### Edit malah menambah data baru

- Pastikan Apps Script sudah diupdate
- Pastikan function `updateData()` di Apps Script sudah benar
- Cek apakah data memiliki ID

## 📝 Summary

**Yang HARUS dilakukan:**

1. ✅ Update Google Apps Script (copy paste file baru)
2. ✅ Deploy ulang dengan New Version
3. ✅ (Opsional) Tambah kolom "id" di sheet yang sudah ada data
4. ✅ Test semua fungsi create, edit, delete

**Yang TIDAK perlu dilakukan:**

- ❌ Tidak perlu ubah URL webhook
- ❌ Tidak perlu hapus data yang sudah ada
- ❌ Tidak perlu install library tambahan
