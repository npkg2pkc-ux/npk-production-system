# TROUBLE RECORD - Dokumentasi Lengkap

## 📋 Deskripsi

Fitur Trouble Record adalah sistem pencatatan masalah/kerusakan peralatan yang memungkinkan tracking dari kejadian awal hingga penyelesaian masalah. Fitur ini menggunakan workflow status Open/Closed untuk memastikan semua masalah terselesaikan dengan baik.

## 🎯 Fitur Utama

### 1. **Nomor Berkas Otomatis**

- Format: `001/PNPKP-2/XI/2025`
- Pattern: `[Nomor Urut]/PNPKP-2/[Bulan Romawi]/[Tahun]`
- Generate otomatis saat membuat record baru
- Increment berdasarkan jumlah record yang ada

### 2. **Field Data Utama**

- **Nomor Berkas**: Auto-generated, read-only
- **Tanggal Kejadian**: Date picker untuk tanggal masalah terjadi
- **Kode Peralatan**: Text input untuk kode equipment (contoh: C2-L-001)
- **Deskripsi Masalah**: Text input untuk deskripsi singkat masalah

### 3. **Data Kronologis (Dynamic Textbox)**

- Multiple textarea yang bisa ditambah/dikurangi
- Setiap item dinomori otomatis (1, 2, 3, ...)
- Button [+] untuk menambah field baru
- Button [X] untuk menghapus field (minimal 1 field)
- Required field - minimal 1 data kronologis harus diisi

### 4. **Pembahasan (Dynamic Textbox)**

- Multiple textarea yang bisa ditambah/dikurangi
- Setiap item dinomori otomatis
- Format sama dengan Data Kronologis
- Required field

### 5. **Tindakan Perbaikan (Dynamic Textbox)**

- Multiple textarea yang bisa ditambah/dikurangi
- Setiap item dinomori otomatis
- Format sama dengan Data Kronologis
- Required field

### 6. **Catatan (Rich Textbox)**

- Large textarea untuk catatan tambahan
- Mendukung line breaks dan formatting
- Optional field
- Bisa diisi dengan informasi tambahan yang relevan

### 7. **Status Management**

- **Status Open**:
  - Default status saat record baru dibuat
  - Bisa di-edit dan di-delete
  - Tombol "Close" tersedia untuk menutup record
- **Status Closed**:
  - Tidak bisa di-edit atau di-delete
  - Hanya bisa dilihat (view only)
  - Menampilkan info penyelesaian

### 8. **Close Record Workflow**

- Khusus untuk record dengan status "Open"
- Form modal untuk menutup record berisi:
  - Tanggal Selesai (date picker)
  - Catatan Penyelesaian (textarea, required)
- Setelah di-close, record tidak bisa diubah lagi

## 📊 Struktur Data Google Sheets

### Sheet Name: `trouble_record`

### Columns:

| Column | Field Name           | Type          | Description                 |
| ------ | -------------------- | ------------- | --------------------------- |
| A      | ID                   | String (UUID) | Unique identifier           |
| B      | Nomor Berkas         | String        | Format: 001/PNPKP-2/XI/2025 |
| C      | Tanggal Kejadian     | Date          | Format: dd/MM/yyyy          |
| D      | Kode Peralatan       | String        | Equipment code              |
| E      | Deskripsi Masalah    | String        | Problem description         |
| F      | Data Kronologis      | JSON String   | Array of {text: string}     |
| G      | Pembahasan           | JSON String   | Array of {text: string}     |
| H      | Tindakan Perbaikan   | JSON String   | Array of {text: string}     |
| I      | Catatan              | String        | Additional notes            |
| J      | Status               | String        | "Open" or "Closed"          |
| K      | Tanggal Selesai      | Date          | Completion date (optional)  |
| L      | Catatan Penyelesaian | String        | Completion notes (optional) |

## 🔧 Implementasi Technical

### Frontend (React TypeScript)

#### Interfaces:

```typescript
interface KronologisItem {
  text: string;
}

interface PembahasanItem {
  text: string;
}

interface TindakanItem {
  text: string;
}

interface TroubleRecord {
  id?: string;
  nomorBerkas: string;
  tanggalKejadian: string;
  kodePeralatan: string;
  deskripsiMasalah: string;
  dataKronologis: KronologisItem[];
  pembahasan: PembahasanItem[];
  tindakanPerbaikan: TindakanItem[];
  catatan: string;
  status: "Open" | "Closed";
  tanggalSelesai?: string;
  catatanPenyelesaian?: string;
}
```

#### State Management:

- `troubleRecordData`: Array untuk menyimpan semua data
- `formTroubleRecord`: Form state untuk input
- `viewTroubleRecordModal`: Modal state untuk view detail
- `closeTroubleModal`: Modal state untuk close record
- `currentPage.trouble_record`: Pagination state

### Backend (Google Apps Script)

#### API Endpoints:

1. **GET - Retrieve Data**

   ```
   ?action=getData&sheet=trouble_record
   ```

2. **POST - Save New Record**

   ```json
   {
     "action": "save",
     "sheet": "trouble_record",
     "data": { ... }
   }
   ```

3. **POST - Update Record**

   ```json
   {
     "action": "update",
     "sheet": "trouble_record",
     "data": { ... }
   }
   ```

4. **POST - Delete Record**
   ```json
   {
     "action": "delete",
     "sheet": "trouble_record",
     "data": { "id": "..." }
   }
   ```

## 🎨 UI/UX Features

### 1. Form Modal

- Size: Extra Large (xl)
- Sections dengan border separator
- Dynamic add/remove buttons
- Color-coded action buttons
- Validation untuk required fields

### 2. View Detail Modal

- Size: Extra Large (xl)
- Organized sections dengan headers
- Numbered items display
- Status badge (color-coded)
- Completion info section (jika status Closed)

### 3. Close Modal

- Size: Medium (md)
- Warning/info box dengan data summary
- Simple form dengan 2 fields
- Color: Green untuk action button (Close)

### 4. Data Table

- Sortable by date (newest first)
- Status badge di column
- Action buttons berbeda untuk Open vs Closed status
- Pagination support
- Hover effects

### 5. Color Scheme

- Primary: #00B4D8 (Cyan)
- Open Status: Yellow (#FBBF24)
- Closed Status: Green (#10B981)
- Delete: Red (#EF4444)
- Edit: Yellow (#F59E0B)
- View: Blue (#3B82F6)

## 📝 User Flow

### Creating New Trouble Record:

1. Klik "Tambah Data"
2. Nomor Berkas auto-generated
3. Isi form (semua field required kecuali catatan)
4. Tambah/kurangi textbox sesuai kebutuhan
5. Klik "Simpan Data"
6. Record tersimpan dengan status "Open"

### Viewing Record:

1. Klik tombol Eye icon pada record
2. Modal menampilkan semua detail
3. Jika status Closed, tampil info penyelesaian

### Editing Record (Open only):

1. Klik tombol Edit (pensil kuning)
2. Form pre-filled dengan data existing
3. Ubah data sesuai kebutuhan
4. Klik "Update Data"

### Closing Record:

1. Klik tombol CheckCircle (hijau) pada record Open
2. Isi Tanggal Selesai
3. Isi Catatan Penyelesaian
4. Klik "Tutup Trouble Record"
5. Status berubah menjadi Closed
6. Record tidak bisa di-edit lagi

### Deleting Record (Open only):

1. Klik tombol Trash (merah)
2. Konfirmasi delete
3. Record terhapus permanen

## 🔒 Permission & Access Control

### Role Capabilities:

- **Admin**: Full access (CRUD + Close)
- **Supervisor**: Full access (CRUD + Close)
- **AVP**: Full access (CRUD + Close)
- **User**: View only + Create

## 📱 Responsive Design

- Form responsive dengan grid layout
- Table scrollable horizontal pada mobile
- Modal adjustable size
- Touch-friendly buttons

## 🚀 Deployment Steps

1. **Update Google Apps Script**

   - Copy functions dari `google-apps-script-trouble-record.js`
   - Tambahkan cases ke doGet() dan doPost()
   - Deploy ulang sebagai Web App

2. **Test Functionality**

   - Test create new record
   - Test edit record
   - Test view detail
   - Test close record
   - Test delete record
   - Test pagination

3. **Verify Data Storage**
   - Check Google Sheet terbuat otomatis
   - Verify data formatting
   - Check date format
   - Verify JSON parsing

## 🐛 Troubleshooting

### Problem: Nomor berkas tidak generate

- **Solution**: Check `generateTroubleRecordNumber()` function
- Pastikan trigger pada `useEffect` dengan dependency `activeTab`

### Problem: Data tidak tersimpan

- **Solution**:
  - Check API endpoint
  - Verify JSON.stringify untuk arrays
  - Check Google Apps Script permissions

### Problem: Status tidak update

- **Solution**:
  - Verify `handleCloseTroubleRecord()` function
  - Check update API call
  - Refresh data after update

### Problem: Arrays tidak tampil benar

- **Solution**:
  - Check JSON.parse di normalization
  - Verify stringify di save/update
  - Check Apps Script JSON handling

## ✅ Testing Checklist

- [ ] Create new record dengan nomor berkas auto
- [ ] Edit record (status Open)
- [ ] View detail record
- [ ] Close record dari Open ke Closed
- [ ] Verify Closed record tidak bisa di-edit
- [ ] Delete record (status Open only)
- [ ] Pagination berfungsi
- [ ] Search/filter (jika ada)
- [ ] Data persist di Google Sheets
- [ ] Multiple dynamic textboxes berfungsi
- [ ] Date formatting correct
- [ ] Status badge display correct
- [ ] Permission control sesuai role

## 📚 Additional Notes

- Field arrays (Kronologis, Pembahasan, Tindakan) disimpan sebagai JSON string di Google Sheets
- Parsing dilakukan otomatis saat load data
- Nomor berkas tidak bisa diubah setelah dibuat
- Status transition hanya satu arah: Open → Closed (tidak bisa dibuka kembali)
- Tanggal selesai dan catatan penyelesaian hanya muncul saat record Closed

## 🎓 Best Practices

1. **Selalu isi kronologis dengan detail lengkap**
2. **Dokumentasikan semua tindakan perbaikan**
3. **Close record setelah masalah benar-benar selesai**
4. **Gunakan kode peralatan yang konsisten**
5. **Review data sebelum close record**

---

**Version**: 1.0
**Last Updated**: November 27, 2025
**Developer**: GitHub Copilot
