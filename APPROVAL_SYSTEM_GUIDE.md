# Approval System Guide

## 📋 Overview

Sistem Approval Request memungkinkan **User role** untuk mengajukan permintaan edit/delete data kepada **AVP** sebelum perubahan dapat dilakukan. Sistem ini memberikan kontrol tambahan dan audit trail untuk semua perubahan data.

## 🔑 Role Permissions

### Admin

- ✅ Edit/Delete langsung tanpa approval
- ✅ View dan manage approval requests
- ✅ Full access ke semua fitur

### AVP (Assistant Vice President)

- ✅ Edit/Delete langsung tanpa approval
- ✅ **Approve/Reject approval requests dari User**
- ✅ View semua data

### Supervisor

- ✅ Edit/Delete langsung tanpa approval
- ❌ Tidak bisa manage approval requests
- ✅ Full CRUD access ke production data

### Manager

- ❌ View only (tidak bisa edit/delete)
- ❌ Tidak bisa manage approval requests

### User

- ⚠️ **Harus request approval ke AVP untuk edit/delete**
- ✅ Bisa melihat semua data
- ✅ Bisa menambah data baru (tanpa approval)

## 🚀 Cara Kerja

### Untuk User Role

1. **Request Edit/Delete Data**

   - Klik tombol Edit/Delete pada data yang ingin diubah
   - Modal approval request akan muncul
   - Isi alasan dengan jelas dan lengkap
   - Klik "Kirim Request ke AVP"

2. **Contoh Alasan yang Baik**

   ```
   Edit:
   "Data produksi tanggal 15 Nov 2024 salah input.
   Seharusnya shift malam 100 ton, bukan 10 ton."

   Delete:
   "Data duplikat. Data dengan tanggal yang sama
   sudah diinput oleh supervisor sebelumnya."
   ```

3. **Menunggu Approval**
   - Request akan masuk ke queue AVP
   - AVP akan review dan approve/reject
   - User akan melihat hasilnya di history

### Untuk AVP Role

1. **View Pending Requests**

   - Buka menu **Setting** → **Approval Requests**
   - Lihat semua pending requests di bagian atas
   - Setiap request menampilkan:
     - User yang request
     - Tanggal request
     - Tipe aksi (Edit/Delete)
     - Data yang akan diubah
     - Alasan dari user

2. **Approve Request**

   - Klik tombol **Approve** hijau
   - Opsional: Tambahkan catatan persetujuan
   - Sistem akan:
     - Tandai request sebagai "Approved"
     - Jika action = Delete, otomatis hapus data
     - Jika action = Edit, user bisa edit setelah approved

3. **Reject Request**

   - Klik tombol **Reject** merah
   - Opsional: Berikan alasan penolakan
   - Request akan ditandai sebagai "Rejected"

4. **View History**
   - Scroll ke bawah untuk melihat approval history
   - Filter by status, user, atau date
   - Export untuk audit trail

## 📊 Data Flow

```
User Action → Check Role
    ↓
  User Role?
    ↓
  Yes → Show Approval Modal
    ↓
  User fills reason
    ↓
  Submit to approval_requests sheet
    ↓
  AVP views in Setting → Approval Requests
    ↓
  AVP Approves/Rejects
    ↓
  If Approved + Delete → Auto delete data
  If Approved + Edit → Mark as approved (manual edit later)
  If Rejected → Mark as rejected
```

## 🗄️ Database Schema

### approval_requests Sheet

| Column        | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| id            | string | Unique identifier                        |
| requestBy     | string | Username yang request                    |
| requestByName | string | Nama lengkap user                        |
| sheetType     | string | Nama sheet (produksi_npk, downtime, etc) |
| action        | string | "edit" atau "delete"                     |
| dataId        | string | ID data yang akan diubah                 |
| dataPreview   | string | Preview data untuk referensi             |
| reason        | string | Alasan dari user                         |
| status        | string | "pending", "approved", atau "rejected"   |
| requestDate   | string | Tanggal request dibuat                   |
| reviewBy      | string | Username AVP yang review                 |
| reviewDate    | string | Tanggal di-review                        |
| reviewNotes   | string | Catatan dari AVP                         |

## 🔧 Setup di Google Sheets

1. **Create approval_requests Sheet**

   ```
   Sheet name: approval_requests
   ```

2. **Add Headers (Row 1)**

   ```
   id | requestBy | requestByName | sheetType | action | dataId |
   dataPreview | reason | status | requestDate | reviewBy |
   reviewDate | reviewNotes
   ```

3. **Format Columns**
   - Date columns: Format as Date/Time
   - Status column: Use data validation (pending, approved, rejected)
   - Action column: Use data validation (edit, delete)

## 📝 Best Practices

### Untuk User

- ✅ Berikan alasan yang **jelas dan spesifik**
- ✅ Sertakan **data yang salah** dan **data yang benar**
- ✅ Request hanya jika **benar-benar diperlukan**
- ❌ Jangan request untuk perubahan kecil yang tidak penting
- ❌ Jangan request berulang kali untuk data yang sama

### Untuk AVP

- ✅ Review request **secepat mungkin**
- ✅ Berikan **feedback** jika reject
- ✅ Dokumentasikan keputusan di reviewNotes
- ✅ Pastikan alasan user **masuk akal**
- ⚠️ Hati-hati dengan delete request - **periksa data dulu**

## 🔍 Troubleshooting

### Request tidak muncul di AVP

- Cek apakah sheet approval_requests sudah dibuat
- Pastikan Google Apps Script sudah di-update
- Refresh browser

### Approved tapi data belum berubah

- Untuk **Edit**: Approval hanya memberi izin, user harus edit manual setelah approved
- Untuk **Delete**: Data akan otomatis terhapus setelah approved

### Error saat submit request

- Pastikan alasan tidak kosong
- Cek koneksi internet
- Cek apakah Google Sheets API aktif

## 🎯 Future Enhancements

### Planned Features

- [ ] Email notification ke AVP saat ada pending request
- [ ] Bulk approve/reject
- [ ] Approval chain (User → Supervisor → AVP)
- [ ] Auto-reject setelah X hari
- [ ] Request expiry date
- [ ] Advanced filtering di history
- [ ] Export approval history ke Excel

## 📞 Support

Jika ada masalah dengan approval system:

1. Cek dokumentasi ini terlebih dahulu
2. Lihat error message di console browser (F12)
3. Screenshot error dan kirim ke IT support
4. Include: Username, timestamp, dan deskripsi masalah

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Author**: NPK Production System Team
