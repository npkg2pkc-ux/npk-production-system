# Arsitektur Sistem NPK Production Management

## 📐 Diagram Alur Data

```
┌─────────────────────────────────────────────────────────────┐
│                     WEB APPLICATION                          │
│                   (React + TypeScript)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │   Produksi   │  │   Laporan    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Data     │  │   Settings   │  │   Reports    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│                   src/App.tsx (Main Component)               │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ HTTP Request
                         │ (GET/POST)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    WEBHOOK API                               │
│   https://script.google.com/macros/s/[ID]/exec             │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ Apps Script
                         │ doGet() / doPost()
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              GOOGLE APPS SCRIPT ENGINE                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ function doGet(e) {                                  │  │
│  │   - Handle READ requests                             │  │
│  │   - Return JSON data                                 │  │
│  │ }                                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ function doPost(e) {                                 │  │
│  │   - Handle CREATE/UPDATE/DELETE requests             │  │
│  │   - Process data                                     │  │
│  │   - Return success/error                             │  │
│  │ }                                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ Spreadsheet Service API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   GOOGLE SHEETS DATABASE                     │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │ produksi_npk   │  │produksi_blend..│  │produksi_npk..│  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │timesheet_fork..│  │timesheet_load..│  │   downtime   │  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │ work_request   │  │  bahan_baku    │  │   vibrasi    │  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │   gate_pass    │  │     akun       │  │     rkap     │  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Alur Operasi CRUD

### CREATE (Simpan Data Baru)

```
User Input Form
    │
    ▼
handleSubmit()
    │
    ▼
saveData(sheetName, data)
    │
    ▼
POST Request
    │
    ├─ action: 'create'
    ├─ sheet: 'produksi_npk'
    └─ data: { tanggal, shift... }
    │
    ▼
Apps Script doPost()
    │
    ▼
createData(sheetName, rowData)
    │
    ├─ Get/Create Sheet
    ├─ Add Headers (if empty)
    ├─ Append Row
    └─ Return success
    │
    ▼
Response JSON
    │
    ▼
Update Local State
    │
    ▼
Show Alert "Data berhasil disimpan!"
```

### READ (Ambil Data)

```
Component Mount / Load Data
    │
    ▼
fetchData(sheetName)
    │
    ▼
GET Request
?action=read&sheet=produksi_npk
    │
    ▼
Apps Script doGet()
    │
    ▼
readData(sheetName)
    │
    ├─ Get Sheet
    ├─ Get All Values
    ├─ Convert to JSON
    └─ Return data array
    │
    ▼
Response JSON
    │
    ▼
Set State with Data
    │
    ▼
Render Table/Chart
```

### UPDATE (Edit Data)

```
User Click Edit Button
    │
    ▼
handleEdit(index, dataType)
    │
    ├─ Set editingIndex
    ├─ Fill Form with data
    └─ Show form
    │
    ▼
User Update & Submit
    │
    ▼
handleSubmit() [with editingIndex]
    │
    ▼
saveData(sheetName, data)
    │
    ▼
POST Request
    │
    ├─ action: 'update'
    ├─ sheet: 'produksi_npk'
    └─ data: { tanggal, ... }
    │
    ▼
Apps Script doPost()
    │
    ▼
updateData(sheetName, rowData)
    │
    ├─ Find row by ID field
    ├─ Update row values
    └─ Return success
    │
    ▼
Update Local State
    │
    ▼
Show Alert "Data berhasil diupdate!"
```

### DELETE (Hapus Data)

```
User Click Delete Button
    │
    ▼
handleDelete(index, dataType)
    │
    ▼
Confirm Dialog
    │
    ├─ Cancel → Do nothing
    └─ OK → Continue
        │
        ▼
    POST Request
        │
        ├─ action: 'delete'
        ├─ sheet: 'produksi_npk'
        └─ data: { tanggal }
        │
        ▼
    Apps Script doPost()
        │
        ▼
    deleteData(sheetName, rowData)
        │
        ├─ Find row by ID field
        ├─ Delete row
        └─ Return success
        │
        ▼
    Remove from Local State
        │
        ▼
    Show Alert "Data berhasil dihapus!"
```

## 🔑 ID Fields untuk Setiap Sheet

Setiap sheet menggunakan field tertentu sebagai identifier:

| Sheet Name         | ID Field |
| ------------------ | -------- |
| produksi_npk       | tanggal  |
| produksi_blending  | tanggal  |
| produksi_npk_mini  | tanggal  |
| timesheet_forklift | tanggal  |
| timesheet_loader   | tanggal  |
| downtime           | tanggal  |
| work_request       | nomorWR  |
| bahan_baku         | tanggal  |
| vibrasi            | tanggal  |
| gate_pass          | noFile   |
| akun               | noBadge  |
| rkap               | bulan    |

## 📊 Format Data JSON

### Request Format (POST)

```json
{
  "action": "create",
  "sheet": "produksi_npk",
  "data": {
    "tanggal": "2025-11-15",
    "shiftMalamOnspek": 100,
    "shiftMalamOffspek": 10,
    "shiftPagiOnspek": 110,
    "shiftPagiOffspek": 15,
    "shiftSoreOnspek": 105,
    "shiftSoreOffspek": 12,
    "totalOnspek": 315,
    "totalOffspek": 37,
    "total": 352
  }
}
```

### Response Format (Success)

```json
{
  "success": true,
  "message": "Data berhasil disimpan",
  "timestamp": "2025-11-15T10:30:00.000Z"
}
```

### Response Format (Error)

```json
{
  "error": "Sheet not found"
}
```

## 🛡️ Error Handling

```
Web App Error
    │
    ├─ Network Error
    │   └─ console.error()
    │       └─ User sees alert
    │
    ├─ Apps Script Error
    │   └─ Logged in Executions
    │       └─ Return error JSON
    │           └─ User sees alert
    │
    └─ Validation Error
        └─ Form validation
            └─ Required fields check
```

## 🎯 Best Practices

1. **Always check sheet exists** - Apps Script auto-creates if missing
2. **Use consistent ID fields** - For UPDATE/DELETE operations
3. **Handle errors gracefully** - Show user-friendly messages
4. **Log everything** - Check Apps Script Executions for debugging
5. **Test with sample data** - Use test-api.js before production
6. **Backup regularly** - Google Sheets has version history
7. **Secure sensitive data** - Limit sheet access permissions

## 🔒 Security Considerations

```
┌─────────────────────────────────────┐
│      Security Layers                │
├─────────────────────────────────────┤
│ 1. Google Account Authentication    │
│    - Apps Script runs as owner      │
│    - Owner has full sheet access    │
├─────────────────────────────────────┤
│ 2. Webhook URL                      │
│    - Long random string             │
│    - Hard to guess                  │
│    - Can be regenerated             │
├─────────────────────────────────────┤
│ 3. Sheet Permissions                │
│    - Control who can view/edit      │
│    - Restricted access recommended  │
├─────────────────────────────────────┤
│ 4. Data Validation                  │
│    - Apps Script validates input    │
│    - Type checking                  │
│    - Required fields                │
└─────────────────────────────────────┘
```

## 📈 Performance Tips

- **Batch operations**: Process multiple rows together
- **Cache data**: Store in local state, reduce API calls
- **Lazy loading**: Load data when needed
- **Optimize queries**: Use specific sheet instead of all
- **Limit data range**: Don't load thousands of rows at once

## 🔍 Monitoring & Debugging

1. **Browser Console** (F12)

   - Network tab: See API requests/responses
   - Console tab: See errors and logs

2. **Apps Script Executions**

   - See all API calls
   - View execution time
   - Check errors and stack traces

3. **Google Sheets**
   - Verify data is saved correctly
   - Check formulas and formatting
   - Use version history if needed
