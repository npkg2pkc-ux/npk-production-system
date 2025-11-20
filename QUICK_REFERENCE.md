# 🚀 Quick Reference - NPK Production App

## 📦 File yang Penting

| File                          | Kegunaan                             |
| ----------------------------- | ------------------------------------ |
| `google-apps-script.js`       | Script untuk Google Sheets (backend) |
| `GOOGLE_APPS_SCRIPT_SETUP.md` | Panduan setup lengkap                |
| `test-api.js`                 | Testing API endpoints                |
| `ARCHITECTURE.md`             | Diagram dan arsitektur sistem        |
| `src/App.tsx`                 | Aplikasi utama React                 |
| `README.md`                   | Dokumentasi umum                     |

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Setup dalam 5 Menit

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Buat Google Sheets**

   - Buat 12 sheet: produksi_npk, produksi_blending, dll

3. **Deploy Apps Script**

   - Extensions > Apps Script
   - Copy paste `google-apps-script.js`
   - Deploy > Web App

4. **Update Webhook URL**

   - Copy URL dari deployment
   - Update di `src/App.tsx` baris 10

5. **Run App**
   ```bash
   npm run dev
   ```

## 📝 12 Sheet yang Harus Dibuat

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

## 🧪 Testing API

### Browser Console

```javascript
// Test read data
fetch('WEBHOOK_URL?action=read&sheet=produksi_npk')
  .then(r => r.json())
  .then(d => console.log(d));

// Test create data
fetch('WEBHOOK_URL', {
  method: 'POST',
  body: JSON.stringify({
    action: 'create',
    sheet: 'produksi_npk',
    data: { tanggal: '2025-11-15', ... }
  })
}).then(r => r.json()).then(d => console.log(d));
```

### Atau gunakan test-api.js

```javascript
// Copy paste isi test-api.js ke console
testReadData("produksi_npk");
runAllTests();
```

## 🔑 Webhook URL Format

```
https://script.google.com/macros/s/[SCRIPT_ID]/exec
```

**Update di:** `src/App.tsx` baris 10

```typescript
const WEBHOOK_URL = "YOUR_WEBHOOK_URL_HERE";
```

## 📊 API Operations

### READ (GET)

```
GET WEBHOOK_URL?action=read&sheet=produksi_npk
```

### CREATE (POST)

```json
{
  "action": "create",
  "sheet": "produksi_npk",
  "data": { ... }
}
```

### UPDATE (POST)

```json
{
  "action": "update",
  "sheet": "produksi_npk",
  "data": { ... }
}
```

### DELETE (POST)

```json
{
  "action": "delete",
  "sheet": "produksi_npk",
  "data": { "tanggal": "2025-11-15" }
}
```

## 🐛 Common Issues & Fixes

| Problem              | Solution                                           |
| -------------------- | -------------------------------------------------- |
| Data tidak tersimpan | Cek webhook URL sudah benar                        |
| Error CORS           | Deploy Apps Script dengan "Who has access: Anyone" |
| Sheet not found      | Pastikan nama sheet benar (case-sensitive)         |
| Authorization error  | Re-deploy Apps Script, authorize ulang             |
| Blank screen         | Cek browser console (F12) untuk error              |

## 🎯 Apps Script Deployment Checklist

- [ ] Copy `google-apps-script.js` ke Apps Script
- [ ] Save project (Ctrl+S)
- [ ] Deploy > New Deployment
- [ ] Type: Web App
- [ ] Execute as: **Me**
- [ ] Who has access: **Anyone**
- [ ] Click Deploy
- [ ] Authorize access
- [ ] Copy webhook URL
- [ ] Update URL di `src/App.tsx`
- [ ] Test dengan `testScript()` function

## 📱 Access URLs

| Environment   | URL                                      |
| ------------- | ---------------------------------------- |
| Development   | http://localhost:5173                    |
| Production    | Deploy to Vercel/Netlify                 |
| API (Webhook) | https://script.google.com/...            |
| Google Sheets | https://docs.google.com/spreadsheets/... |

## 🔐 Security Checklist

- [ ] Set Google Sheets permission ke Restricted
- [ ] Jangan share webhook URL di public
- [ ] Backup data regularly
- [ ] Monitor Apps Script Executions
- [ ] Enkripsi password di sheet `akun`

## 💡 Tips & Tricks

### Debugging

1. Browser Console (F12) - Frontend errors
2. Apps Script Executions - Backend logs
3. Network tab - See API requests/responses

### Performance

- Cache data di local state
- Batch operations
- Lazy loading untuk data besar

### Best Practices

- Backup before major changes
- Test with sample data first
- Use version control (Git)
- Document custom changes

## 📞 Support Resources

- **Google Apps Script Docs**: https://developers.google.com/apps-script
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com

## 🎓 Learning Resources

### Apps Script

- [Apps Script Overview](https://developers.google.com/apps-script/overview)
- [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet)
- [Web Apps](https://developers.google.com/apps-script/guides/web)

### React & TypeScript

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🔄 Update Workflow

1. Make changes to code
2. Test locally (`npm run dev`)
3. Test API with `test-api.js`
4. Build for production (`npm run build`)
5. Deploy to hosting (Vercel/Netlify)
6. Update Apps Script if needed
7. Test production deployment

## 📦 Deployment Options

### Frontend (React App)

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use gh-pages package
- **Firebase Hosting**: `firebase deploy`

### Backend (Apps Script)

- Already deployed via Google
- Update: Deploy > Manage > New version

## ✅ Production Checklist

- [ ] All 12 sheets created in Google Sheets
- [ ] Apps Script deployed and authorized
- [ ] Webhook URL updated in code
- [ ] API tested with test-api.js
- [ ] All features working locally
- [ ] Build successful (`npm run build`)
- [ ] Production build tested (`npm run preview`)
- [ ] Frontend deployed
- [ ] Test production deployment
- [ ] Backup original data
- [ ] Document any customizations

---

**Version:** 1.0.0  
**Last Updated:** November 15, 2025  
**Project:** NPK Production Management System
