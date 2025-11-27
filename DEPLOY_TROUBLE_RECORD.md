# 🚀 INSTRUKSI INTEGRASI GOOGLE APPS SCRIPT - TROUBLE RECORD

## Langkah-langkah Deploy

### 1️⃣ Buka Google Apps Script Editor

1. Buka Google Spreadsheet Anda
2. Klik **Extensions** → **Apps Script**
3. Akan terbuka Script Editor

### 2️⃣ Tambahkan Fungsi Trouble Record

Buka file `google-apps-script-trouble-record.js` dan copy SEMUA fungsi berikut ke Apps Script Editor Anda:

#### A. Fungsi getTroubleRecordData()

Copy fungsi lengkap mulai dari:

```javascript
function getTroubleRecordData() {
  // ... full code
}
```

#### B. Fungsi saveTroubleRecordData()

Copy fungsi lengkap

#### C. Fungsi updateTroubleRecordData()

Copy fungsi lengkap

#### D. Fungsi deleteTroubleRecordData()

Copy fungsi lengkap

### 3️⃣ Update Fungsi doGet()

Cari fungsi `doGet()` di script Anda, lalu tambahkan case baru:

```javascript
function doGet(e) {
  const sheet = e.parameter.sheet;

  switch (sheet) {
    // ... existing cases

    case "trouble_record":
      return getTroubleRecordData();

    // ... rest of code
  }
}
```

ATAU jika menggunakan action parameter:

```javascript
function doGet(e) {
  const action = e.parameter.action;

  switch (action) {
    // ... existing cases

    case "getTroubleRecord":
      return getTroubleRecordData();

    // ... rest of code
  }
}
```

### 4️⃣ Update Fungsi doPost() - Save

Cari bagian save di fungsi `doPost()`, tambahkan case:

```javascript
function doPost(e) {
  const contents = JSON.parse(e.postData.contents);
  const action = contents.action;
  const data = contents.data;
  const sheet = contents.sheet;

  if (action === "save") {
    switch (sheet) {
      // ... existing cases

      case "trouble_record":
        return saveTroubleRecordData(data);

      // ... rest
    }
  }
}
```

### 5️⃣ Update Fungsi doPost() - Update

Cari bagian update di fungsi `doPost()`, tambahkan case:

```javascript
if (action === "update") {
  switch (sheet) {
    // ... existing cases

    case "trouble_record":
      return updateTroubleRecordData(data);

    // ... rest
  }
}
```

### 6️⃣ Update Fungsi doPost() - Delete

Cari bagian delete di fungsi `doPost()`, tambahkan case:

```javascript
if (action === "delete") {
  switch (sheet) {
    // ... existing cases

    case "trouble_record":
      return deleteTroubleRecordData(data);

    // ... rest
  }
}
```

### 7️⃣ Deploy Web App

1. Klik **Deploy** → **New deployment**
2. Pilih type: **Web app**
3. Settings:
   - Description: "Added Trouble Record"
   - Execute as: **Me**
   - Who has access: **Anyone** (atau sesuai kebutuhan)
4. Klik **Deploy**
5. **PENTING**: Copy URL deployment yang baru
6. Authorize jika diminta

### 8️⃣ Update URL di Frontend (JIKA PERLU)

Jika URL deployment berubah, update di `src/App.tsx`:

```typescript
const API_URL = "YOUR_NEW_DEPLOYMENT_URL_HERE";
```

Cari baris ini di awal file App.tsx dan ganti dengan URL baru.

### 9️⃣ Test Deployment

1. Buka aplikasi web Anda
2. Login sebagai admin
3. Navigasi ke **Data** → **Trouble Record**
4. Test operasi berikut:
   - ✅ Create new record
   - ✅ View detail record
   - ✅ Edit record
   - ✅ Close record
   - ✅ Delete record

### 🔟 Verify Google Sheet

1. Kembali ke Google Spreadsheet
2. Sheet baru bernama **trouble_record** harus terbuat otomatis
3. Cek struktur columns:

   - A: ID
   - B: Nomor Berkas
   - C: Tanggal Kejadian
   - D: Kode Peralatan
   - E: Deskripsi Masalah
   - F: Data Kronologis (JSON)
   - G: Pembahasan (JSON)
   - H: Tindakan Perbaikan (JSON)
   - I: Catatan
   - J: Status
   - K: Tanggal Selesai
   - L: Catatan Penyelesaian

4. Test input data dan lihat hasilnya di sheet

## 🔍 Troubleshooting

### Problem: Sheet tidak terbuat otomatis

**Solution:**

- Run fungsi `getTroubleRecordData()` manual dari Script Editor
- Atau create new record dari frontend
- Sheet akan terbuat saat pertama kali diakses

### Problem: Error "Script not authorized"

**Solution:**

1. Klik **Review Permissions**
2. Pilih akun Google Anda
3. Klik **Advanced** → **Go to [Project Name] (unsafe)**
4. Klik **Allow**

### Problem: Data tidak tersimpan

**Solution:**

- Check Execution log di Apps Script: **Executions** tab
- Lihat error message
- Pastikan semua fungsi sudah ditambahkan
- Verify JSON format dari frontend

### Problem: Date format salah

**Solution:**

- Google Sheets akan auto-format tanggal
- Pastikan format di Apps Script: `dd/MM/yyyy`
- Frontend kirim format: `YYYY-MM-DD`

### Problem: JSON arrays tidak parse

**Solution:**

- Check `JSON.stringify()` di frontend saat save
- Check `JSON.parse()` di Apps Script saat retrieve
- Lihat raw data di Google Sheet column F, G, H

## 📋 Checklist Deployment

- [ ] Copy 4 fungsi Trouble Record ke Apps Script
- [ ] Update doGet() dengan case trouble_record
- [ ] Update doPost() save dengan case trouble_record
- [ ] Update doPost() update dengan case trouble_record
- [ ] Update doPost() delete dengan case trouble_record
- [ ] Save script (Ctrl+S)
- [ ] Deploy as Web App
- [ ] Copy deployment URL (jika berubah)
- [ ] Update API_URL di frontend (jika perlu)
- [ ] Test create record
- [ ] Test view record
- [ ] Test edit record
- [ ] Test close record
- [ ] Test delete record
- [ ] Verify data di Google Sheet
- [ ] Test pagination
- [ ] Test permission per role

## 🎯 Expected Results

Setelah deployment sukses:

1. ✅ Menu "Trouble Record" muncul di sidebar Data
2. ✅ Bisa create new record dengan nomor berkas auto
3. ✅ Bisa view detail dengan semua sections
4. ✅ Bisa edit record yang Open
5. ✅ Bisa close record dengan form completion
6. ✅ Record Closed tidak bisa di-edit
7. ✅ Bisa delete record yang Open
8. ✅ Data tersimpan di Google Sheet "trouble_record"
9. ✅ Pagination berfungsi
10. ✅ Permission sesuai role

## 📞 Support

Jika mengalami masalah:

1. Check error di browser console (F12)
2. Check execution log di Apps Script
3. Verify all functions are added
4. Re-deploy if needed
5. Clear browser cache

---

**IMPORTANT NOTES:**

- Backup Apps Script sebelum edit
- Test di environment development dulu
- Jangan lupa save script sebelum deploy
- URL deployment bisa berubah setiap deploy baru
- Authorize script dengan akun yang benar

**Happy Deploying! 🚀**
