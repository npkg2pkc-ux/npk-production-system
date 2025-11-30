# 👥 User & Role Management System

## 📋 Overview

Sistem User Management memungkinkan Admin untuk mengelola user dan role access di aplikasi NPK Production System secara lengkap melalui UI dan Google Sheets.

## 🎯 Features

### 1. **Role-Based Access Control**

Aplikasi mendukung 5 jenis role:

- **Admin** - Full access ke semua fitur termasuk user management
- **AVP** - View all data + approve access
- **Manager** - View all data (read-only for most features)
- **Supervisor** - Manage production data & reports
- **User** - View only access

### 2. **User Management UI (Admin Only)**

- ✅ Tambah user baru dengan form lengkap
- ✅ Edit user existing (username, nama, role, status)
- ✅ Hapus user (kecuali user yang sedang login)
- ✅ Toggle status Active/Inactive
- ✅ Reset password user
- ✅ View last login timestamp
- ✅ Role badges dengan color coding

### 3. **Google Sheets Integration**

- ✅ Semua data user disimpan di sheet "users"
- ✅ Auto-sync dengan Google Sheets
- ✅ Backup otomatis setiap perubahan
- ✅ Easy to manage via spreadsheet

## 🛠️ Setup Instructions

### Step 1: Buat Sheet "users" di Google Sheets

1. Buka Google Sheets yang sama dengan aplikasi
2. Buat sheet baru dengan nama **`users`** (huruf kecil semua)
3. Tambahkan header di baris pertama:

```
id | username | password | role | namaLengkap | status | createdAt | lastLogin
```

### Step 2: Tambahkan User Default (Admin)

Masukkan data default admin di baris ke-2:

| id  | username | password | role  | namaLengkap   | status | createdAt  | lastLogin |
| --- | -------- | -------- | ----- | ------------- | ------ | ---------- | --------- |
| 1   | admin    | admin123 | admin | Administrator | active | 2025-11-30 |           |

### Step 3: Update Google Apps Script

Google Apps Script sudah otomatis support sheet "users". Pastikan:

- Script sudah di-deploy ulang jika ada perubahan
- Permissions sudah diberikan untuk akses sheet

### Step 4: Test User Management

1. Login sebagai **admin**
2. Buka menu **Setting → User Management**
3. Coba tambah user baru
4. Test edit, hapus, dan toggle status

## 📊 Sheet Structure

### Sheet: `users`

| Column      | Type   | Description                       | Required |
| ----------- | ------ | --------------------------------- | -------- |
| id          | String | Unique ID (auto-generated)        | Yes      |
| username    | String | Username untuk login              | Yes      |
| password    | String | Password (plain text)             | Yes      |
| role        | String | admin/avp/manager/supervisor/user | Yes      |
| namaLengkap | String | Nama lengkap user                 | Yes      |
| status      | String | active/inactive                   | Yes      |
| createdAt   | Date   | Tanggal user dibuat               | Auto     |
| lastLogin   | Date   | Last login timestamp              | Auto     |

## 🔐 Security Features

### Password Management

- Password edit optional (kosongkan jika tidak ingin mengubah)
- Password disimpan plain text (untuk kemudahan internal)
- ⚠️ **Untuk production**: Implementasikan password hashing

### Access Control

- Menu User Management hanya visible untuk role **admin**
- User tidak bisa menghapus diri sendiri
- Inactive user tidak bisa login

## 🎨 UI Features

### Role Badges

Setiap role memiliki warna badge sendiri:

- 🔴 **Admin** - Red badge
- 🟣 **AVP** - Purple badge
- 🔵 **Manager** - Blue badge
- 🟢 **Supervisor** - Green badge
- ⚪ **User** - Gray badge

### Status Badges

- 🟢 **Active** - User bisa login
- 🔴 **Inactive** - User tidak bisa login

### Form Validation

- Username unique (tidak bisa duplikat)
- Username read-only saat edit
- Password optional saat edit
- Role dan status dengan dropdown select

## 📱 Usage Examples

### Tambah User Baru

```
Username: johndoe
Nama Lengkap: John Doe
Password: securepass123
Role: supervisor
Status: active
```

### Edit User Existing

- Klik tombol Edit (icon kuning) di table
- Ubah data yang diperlukan
- Password kosongkan jika tidak ingin mengubah
- Klik "Update User"

### Non-aktifkan User

- Klik Edit pada user
- Ubah Status menjadi "Inactive"
- User tidak bisa login setelah logout

### Hapus User

- Klik tombol Hapus (icon merah)
- Konfirmasi penghapusan
- Data akan dihapus dari sheet

## 🔄 Sync with Google Sheets

### Otomatis Sync

- Setiap CRUD operation langsung sync ke Google Sheets
- Data di-fetch ulang setelah save/update/delete
- Real-time updates

### Manual Refresh

- Reload page untuk fetch latest data
- Data di-load saat login

## ⚙️ Configuration

### Menambah Role Baru

1. **Update Type di App.tsx:**

```typescript
role: "admin" | "user" | "supervisor" | "avp" | "manager" | "newrole";
```

2. **Update UI Form:**
   Tambahkan option di dropdown:

```tsx
<SelectItem value="newrole">
  <div className="flex items-center gap-2">
    <Shield className="w-4 h-4 text-orange-600" />
    <span>New Role - Description</span>
  </div>
</SelectItem>
```

3. **Update Role Badge:**
   Tambahkan case di getRoleBadge():

```typescript
newrole: "bg-orange-100 text-orange-700 border-orange-300";
```

## 🧪 Testing Checklist

- [ ] Buat user baru berhasil
- [ ] Edit user berhasil (tanpa ubah password)
- [ ] Edit user + ubah password berhasil
- [ ] Hapus user berhasil
- [ ] Toggle status active/inactive berhasil
- [ ] User inactive tidak bisa login
- [ ] Data ter-sync dengan Google Sheets
- [ ] Role badges tampil dengan benar
- [ ] Cannot delete logged-in user

## 📝 Notes

### Best Practices

1. **Backup Regular** - Export sheet users secara berkala
2. **Password Policy** - Gunakan password yang kuat
3. **Audit Log** - Track perubahan user di sheet
4. **Role Hierarchy** - Definisikan clear role responsibilities

### Limitations

- Password disimpan plain text (tidak encrypted)
- Tidak ada password strength validation
- Tidak ada password reset via email
- Tidak ada 2FA support

### Future Improvements

- [ ] Password hashing (bcrypt)
- [ ] Password strength meter
- [ ] Email verification
- [ ] 2FA authentication
- [ ] Audit log untuk user changes
- [ ] Bulk user import via CSV
- [ ] User profile management

## 🆘 Troubleshooting

### User tidak muncul di table

- Cek nama sheet harus "users" (lowercase)
- Cek header columns sesuai format
- Reload page atau re-login

### Error saat save user

- Cek Google Apps Script deployed dengan benar
- Cek permissions di Google Sheets
- Check browser console untuk error details

### Login gagal setelah tambah user

- Cek username dan password benar
- Cek status user = "active"
- Cek role valid (admin/supervisor/avp/manager/user)

## 📞 Support

Untuk pertanyaan atau issue terkait User Management:

1. Check dokumentasi ini terlebih dahulu
2. Review console.log di browser untuk error details
3. Check Google Apps Script execution logs
4. Verify sheet structure dan permissions

---

**Version:** 1.0.0  
**Last Updated:** November 30, 2025  
**Author:** NPK Production System Team
