# Fitur Chat - NPK Production System

## Deskripsi

Fitur chat floating di pojok kanan bawah yang memungkinkan semua role (Admin, Supervisor, User) untuk berkomunikasi dalam satu chat room.

## Fitur Utama

### 1. **Floating Chat Button**

- Tombol chat melayang di pojok kanan bawah
- Icon MessageCircle dengan gradient color
- Badge notifikasi merah jika ada pesan baru
- Hover effect dengan scale animation

### 2. **Chat Window**

- Window berukuran 96x500px (responsive)
- Header dengan gradient background
- Real-time message display
- Auto-scroll ke pesan terbaru
- Message bubbles berbeda untuk pesan sendiri dan orang lain

### 3. **Message Features**

- Tampilan nama pengirim
- Badge role (Admin/Supervisor/User) dengan warna berbeda:
  - 🔴 Admin: Red badge
  - 🔵 Supervisor: Blue badge
  - 🟢 User: Green badge
- Timestamp setiap pesan (format HH:MM)
- Message bubbles dengan warna berbeda untuk pesan sendiri

### 4. **Real-time Updates**

- Auto-polling setiap 5 detik untuk pesan baru
- Notifikasi badge jika ada pesan baru saat chat tertutup
- Auto-scroll ke pesan terbaru saat membuka chat

### 5. **Input Message**

- Input field dengan placeholder "Ketik pesan..."
- Send button dengan icon
- Enter key untuk mengirim pesan
- Loading state saat mengirim pesan

## Google Sheets Setup

Tambahkan sheet baru bernama **`chat_messages`** dengan kolom:

| ID     | Sender   | Role                  | Message   | Timestamp |
| ------ | -------- | --------------------- | --------- | --------- |
| (auto) | username | admin/supervisor/user | Isi pesan | (auto)    |

## Cara Menggunakan

### Untuk Semua Role:

1. **Membuka Chat**

   - Klik tombol chat di pojok kanan bawah
   - Chat window akan muncul dengan animasi slide-up

2. **Mengirim Pesan**

   - Ketik pesan di input field
   - Tekan Enter atau klik tombol Send
   - Pesan akan muncul dengan bubble warna berbeda

3. **Melihat Pesan Baru**

   - Badge merah (!) akan muncul jika ada pesan baru
   - Chat akan auto-scroll ke pesan terbaru

4. **Menutup Chat**
   - Klik tombol X di header
   - Atau klik tombol chat lagi

## Keamanan & Privacy

- ✅ Hanya user yang login dapat menggunakan chat
- ✅ Nama pengirim diambil dari session login
- ✅ Role badge otomatis sesuai permission user
- ✅ History chat tersimpan di Google Sheets
- ✅ Real-time sync antar user

## Technical Details

### State Management:

```typescript
- chatMessages: ChatMessage[] // Array semua pesan
- showChat: boolean // Tampilan chat window
- chatInput: string // Input message current
- isSendingMessage: boolean // Loading state
- hasNewMessages: boolean // Notifikasi badge
```

### API Endpoints:

```
GET:  ?action=getChatMessages
POST: { action: "addChatMessage", data: messageData }
```

### Message Structure:

```typescript
interface ChatMessage {
  id: string;
  sender: string;
  role: "admin" | "supervisor" | "user";
  message: string;
  timestamp: Date;
}
```

## Styling

- **Primary Color**: Gradient dari #494E6B ke #98878F
- **Own Message**: Gradient background dengan text putih
- **Other Message**: White background dengan border
- **Animations**: slideUp, pulse, hover scale

## Future Enhancements (Optional)

- [ ] Typing indicator
- [ ] Read receipts
- [ ] File attachment
- [ ] Message reactions
- [ ] Private messaging
- [ ] Message search
- [ ] Delete/Edit message
- [ ] Push notifications

---

**Created**: November 24, 2025
**Version**: 1.0.0
