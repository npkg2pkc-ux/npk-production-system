# 👔 Role AVP (Assistant Vice President)

## Kredensial Login

| Field        | Value    |
| ------------ | -------- |
| **Username** | `avp`    |
| **Password** | `avpnpk` |

## Permissions & Access

Role AVP memiliki level akses yang **sama dengan Admin dan Supervisor**:

### ✅ Hak Akses Penuh:

- ✏️ **Create** - Menambah data baru
- ✏️ **Edit** - Mengubah data yang ada
- 🗑️ **Delete** - Menghapus data
- 👁️ **View** - Melihat semua data
- 📊 **Dashboard** - Akses ke dashboard dan analytics
- 💬 **Chat** - Komunikasi dengan semua role
- 🔔 **Notifications** - Melihat notifikasi dari user

### 🎨 Visual Identity:

- **Avatar Letter**: **V** (untuk aVp)
- **Avatar Color**: Gradient purple-blue
- **Chat Badge**: 🟣 Purple (`bg-purple-500/20 text-purple-700`)
- **Role Name**: AVP
- **Role Description**: Assistant Vice President

## Perbedaan dengan Role Lain

| Feature       | Admin | Supervisor | **AVP** | User |
| ------------- | ----- | ---------- | ------- | ---- |
| Create Data   | ✅    | ✅         | ✅      | ✅   |
| Edit Data     | ✅    | ✅         | ✅      | ❌   |
| Delete Data   | ✅    | ✅         | ✅      | ❌   |
| View Data     | ✅    | ✅         | ✅      | ✅   |
| Notifications | ✅    | ✅         | ✅      | ❌   |
| Chat Access   | ✅    | ✅         | ✅      | ✅   |
| Settings      | ✅    | ✅         | ✅      | ❌   |

## Fitur yang Dapat Diakses AVP

### 📊 Dashboard (Home)

- Grafik produksi
- Metrik RKAP vs Aktual
- Overview semua data

### 🏭 Produksi

- Produksi NPK (Create, Edit, Delete)
- Produksi Blending (Create, Edit, Delete)
- Produksi NPK Mini (Create, Edit, Delete)

### 📝 Laporan

- Timesheet Forklift (Create, Edit, Delete)
- Timesheet Loader (Create, Edit, Delete)
- Downtime (Create, Edit, Delete)

### 📦 Data

- Work Request (Create, Edit, Delete)
- Bahan Baku (Create, Edit, Delete)
- Vibrasi (Create, Edit, Delete)
- Gate Pass (Create, Edit, Delete)

### ⚙️ Setting

- RKAP (Create, Edit, Delete)
- Akun (Create, Edit, Delete)
- Perta (Create, Edit, Delete)

### 💬 Chat

- Akses penuh ke chat room
- Dapat mengirim dan menerima pesan
- Badge warna purple untuk identifikasi role

## Cara Login

1. Buka aplikasi NPK Production System
2. Masukkan username: `avp`
3. Masukkan password: `avpnpk`
4. Klik **Login**
5. Avatar dengan huruf **"V"** akan muncul di pojok kanan atas

## Troubleshooting

### Login Gagal?

- Pastikan username: `avp` (huruf kecil semua)
- Pastikan password: `avpnpk` (tanpa spasi)
- Jika tetap gagal, clear cache browser (Ctrl+Shift+Delete)

### Tidak Bisa Edit/Delete?

- Pastikan sudah login sebagai AVP
- Refresh halaman (F5)
- Cek avatar di pojok kanan atas, harus huruf **"V"**

### Chat Badge Warna Tidak Muncul?

- Badge purple hanya muncul jika pesan dikirim sebagai AVP
- Refresh halaman dan coba kirim pesan lagi

## Technical Details

### Type Definition:

```typescript
type UserRole = "admin" | "user" | "supervisor" | "avp";
```

### Permission Check:

```typescript
const canEditDelete = () => {
  return (
    userRole === "admin" || userRole === "supervisor" || userRole === "avp"
  );
};
```

### Chat Badge Color:

```typescript
msg.role === "avp"
  ? "bg-purple-500/20 text-purple-700"
  : // other colors...
```

---

**Created**: November 24, 2025  
**Version**: 1.0.0
