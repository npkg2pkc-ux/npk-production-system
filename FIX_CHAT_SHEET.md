# 🔧 Cara Memperbaiki Sheet Chat_Messages

## Masalah

Sheet `chat_messages` sudah ada tapi tidak memiliki header, sehingga:

- Pesan muncul lalu hilang
- Data tidak terstruktur dengan baik

## Solusi Cepat - Opsi 1: Hapus dan Buat Ulang (RECOMMENDED)

### Langkah:

1. Buka Google Sheets "Database NPK"
2. Klik kanan pada tab sheet `chat_messages`
3. Pilih **Delete**
4. Buka aplikasi web dan kirim pesan baru
5. Sheet akan otomatis dibuat dengan header yang benar

**⚠️ Warning**: Ini akan menghapus semua history chat!

---

## Solusi 2: Tambahkan Header Manual

### Langkah:

1. Buka Google Sheets "Database NPK"
2. Buka sheet `chat_messages`
3. Klik kanan pada baris 1
4. Pilih **Insert 1 row above**
5. Isi baris 1 dengan:
   - **A1**: ID
   - **B1**: Sender
   - **C1**: Role
   - **D1**: Message
   - **E1**: Timestamp
6. Format header (optional):
   - Select A1:E1
   - Bold (Ctrl+B)
   - Background color: Dark gray (#4a5568)
   - Text color: White

---

## Solusi 3: Gunakan Fungsi Auto-Fix

### Langkah:

1. Buka Google Sheets "Database NPK"
2. Klik **Extensions** > **Apps Script**
3. Di Apps Script editor, pastikan fungsi `fixChatMessagesSheet()` sudah ada
4. Di dropdown function (atas), pilih **fixChatMessagesSheet**
5. Klik **Run** (▶️)
6. Tunggu selesai
7. Cek sheet `chat_messages` - header sudah ditambahkan!

---

## Verifikasi

Setelah memperbaiki sheet:

### ✅ Header harus seperti ini:

| ID     | Sender | Role   | Message | Timestamp |
| ------ | ------ | ------ | ------- | --------- |
| (data) | (data) | (data) | (data)  | (data)    |

### ✅ Test Chat:

1. Buka aplikasi web
2. Login sebagai Admin/Supervisor/User
3. Klik tombol chat di pojok kanan bawah
4. Kirim pesan "Test"
5. Pesan harus **tetap muncul** (tidak hilang)
6. Cek Google Sheets - pesan ada dengan header yang benar

---

## Update Google Apps Script

Pastikan Anda sudah deploy ulang Google Apps Script dengan kode terbaru:

1. Copy file `google-apps-script.js` yang terbaru
2. Paste ke Apps Script editor
3. **Save** (Ctrl+S)
4. **Deploy** > **Manage deployments**
5. Klik icon ✏️ (Edit) pada deployment yang aktif
6. Ganti **Version**: New version
7. Klik **Deploy**
8. Copy URL baru (atau gunakan URL lama jika tidak berubah)

---

## Troubleshooting

### Pesan masih hilang?

- Pastikan sheet memiliki header di baris 1
- Deploy ulang Apps Script
- Clear cache browser (Ctrl+Shift+Delete)
- Reload aplikasi (Ctrl+R)

### Data lama tidak terstruktur?

- Backup data lama (copy ke sheet lain)
- Hapus sheet `chat_messages`
- Biarkan otomatis dibuat ulang dengan struktur benar

### Error saat mengirim pesan?

- Cek console browser (F12)
- Pastikan WEBHOOK_URL di `App.tsx` sudah benar
- Pastikan Apps Script sudah di-deploy dengan access "Anyone"

---

**Last Updated**: November 24, 2025
