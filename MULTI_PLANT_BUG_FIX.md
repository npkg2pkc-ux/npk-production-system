# Multi-Plant Bug Fix - NPK1 User Melihat Data NPK2

## 🐛 Bug Report

**Issue**: User NPK1 melihat data NPK2 di dashboard dan form produksi.

**Reported**: NPK1 user yang baru dibuat menampilkan:

- Dashboard menunjukkan "Plant NPK 2"
- Form produksi menampilkan data NPK2
- Data yang disimpan masuk ke sheet NPK2

## ✅ Root Cause Analysis

Terdapat 3 masalah utama:

### 1. Data Tidak Di-tag dengan `_plant` Property

**File**: `src/App.tsx` line ~2157
**Problem**: `fetchDataForPlant()` hanya menambahkan `_plant` property untuk user dengan role "ALL", tidak untuk NPK1/NPK2 spesifik.

```typescript
// ❌ SEBELUM (SALAH)
if (plantToUse === "ALL") {
  // Fetch both plants and tag data
} else {
  return await fetchData(sheetName); // Tidak ada _plant tag!
}
```

**Solution**: Tambahkan `_plant` tag untuk semua kasus

```typescript
// ✅ SESUDAH (BENAR)
const data = await fetchData(sheetName);
return (data || []).map((item: any) => ({
  ...item,
  _plant: plantToUse,
}));
```

### 2. Dashboard Metrics Tidak Filter Berdasarkan Plant

**File**: `src/App.tsx` line ~5226
**Problem**: `calculateDashboardMetrics()` langsung menggunakan `produksiNPKData` dan `rkapData` tanpa filter plant.

**Solution**: Tambahkan filter logic

```typescript
// ✅ SESUDAH (BENAR)
const activePlantFilter =
  userPlant === "ALL" ? dashboardPlantFilter : userPlant;

const filteredProduksiData = produksiNPKData.filter((item: any) => {
  if (activePlantFilter === "ALL") return true;
  return (
    item._plant === activePlantFilter ||
    (!item._plant && activePlantFilter === "NPK2")
  );
});

const filteredRkapData = rkapData.filter((item: any) => {
  if (activePlantFilter === "ALL") return true;
  return item.plant === activePlantFilter;
});
```

### 3. Submit Handlers Menggunakan Hardcoded Sheet Names

**File**: `src/App.tsx` multiple handlers
**Problem**: Semua submit handlers menggunakan `saveData("produksi_npk", ...)` yang hardcoded, jadi NPK1 user menyimpan ke sheet NPK2.

**Solution**: Buat plant-aware CRUD wrappers dan update semua handlers

## 🛠️ Fixes Implemented

### 0. CRITICAL: Menu Sidebar Produksi (LATEST FIX - Dec 5, 2025)

**Problem**: User NPK1 melihat menu "Produksi Granul", "Produksi Blending", "Produksi NPK Mini" padahal seharusnya HANYA "Produksi Retail".

**Root Cause**: Di `getNavItems()` line 12914, code selalu menambahkan "Produksi Granul" sebagai tab pertama untuk SEMUA user:

```typescript
// ❌ SALAH - Semua user dapat Granul
const produksiTabs = [{ id: "npk", label: "Produksi Granul" }];
if (userPlant === "NPK1") {
  produksiTabs.push({ id: "blending", label: "Produksi Retail" });
}
```

**Solution**: Ubah logic agar produksiTabs dibangun conditional berdasarkan plant:

```typescript
// ✅ BENAR - Menu sesuai plant
let produksiTabs: { id: string; label: string }[] = [];

if (userPlant === "NPK1") {
  // NPK1: HANYA Retail
  produksiTabs = [{ id: "blending", label: "Produksi Retail" }];
} else if (userPlant === "NPK2") {
  // NPK2: Granul + Blending + Mini
  produksiTabs = [
    { id: "npk", label: "Produksi Granul" },
    { id: "blending", label: "Produksi Blending" },
    { id: "mini", label: "Produksi NPK Mini" },
  ];
} else if (userPlant === "ALL") {
  // Management: Semua dengan label jelas
  produksiTabs = [
    { id: "npk", label: "Produksi Granul (NPK2)" },
    { id: "blending", label: "Blending/Retail" },
    { id: "mini", label: "NPK Mini (NPK2)" },
  ];
}
```

**Additional Protections**:

1. **Tab "npk" (Granul)** - Tambah guard clause untuk reject NPK1 access
2. **Tab "mini"** - Tambah guard clause untuk reject NPK1 access
3. **Tab "blending"** - Dynamic title: "Produksi Retail" untuk NPK1, "Produksi Blending" untuk NPK2

### 1. Plant-Aware CRUD Wrappers (Line 2118-2131)

```typescript
const saveDataForPlant = async (baseSheet: string, data: any) => {
  const sheetName = getSheetName(baseSheet, userPlant);
  return await saveData(sheetName, data);
};

const updateDataForPlant = async (baseSheet: string, data: any) => {
  const sheetName = getSheetName(baseSheet, userPlant);
  return await updateData(sheetName, data);
};

const deleteDataFromSheetForPlant = async (baseSheet: string, data: any) => {
  const sheetName = getSheetName(baseSheet, userPlant);
  return await deleteDataFromSheet(sheetName, data);
};
```

### 2. Updated All Submit Handlers

Replaced hardcoded CRUD calls dengan plant-aware wrappers di:

- ✅ `handleSubmitProduksiNPK` (line ~2584, 2590)
- ✅ `handleSubmitProduksiBlending` (line ~2664, 2671)
- ✅ `handleSubmitProduksiNPKMini` (line ~2746, 2753)
- ✅ `handleSubmitTimesheetForklift` (line ~2819, 2826)
- ✅ `handleSubmitTimesheetLoader` (line ~2904, 2911)
- ✅ `handleSubmitDowntime` (line ~2977, 3030)
- ✅ `handleSubmitWorkRequest` (line ~3098, 3127)
- ✅ `handleSubmitBahanBaku` (line ~3217, 3223)
- ✅ `handleSubmitVibrasi` (line ~3283, 3289)
- ✅ `handleSubmitGatePass` (line ~3351, 3357)
- ✅ `handleSubmitAkun` (line ~3451, 3456)
- ✅ `handleSubmitRKAP` (line ~3498, 3503)
- ✅ `handleSubmitPerta` (line ~3815, 3838)
- ✅ `handleSubmitTroubleRecord` (line ~3931, 3954, 4017)

### 3. Updated Delete Handler

Replaced semua `deleteDataFromSheet()` calls di `handleDeleteClick` (line ~4147-4276) dengan `deleteDataFromSheetForPlant()` untuk:

- ✅ produksi_npk
- ✅ produksi_blending
- ✅ produksi_npk_mini
- ✅ timesheet_forklift
- ✅ timesheet_loader
- ✅ downtime
- ✅ work_request
- ✅ bahan_baku
- ✅ vibrasi
- ✅ gate_pass
- ✅ akun
- ✅ rkap
- ✅ perta
- ✅ trouble_record

### 4. Updated Refresh Operations

Replaced `fetchData()` dengan `fetchDataForPlant()` di delete refresh operations (line ~4204-4276)

### 5. Updated Approval Handler

Updated `handleApprovalAction` (line ~3609-3618) untuk menggunakan plant-aware wrappers

## 🧪 Testing Checklist

### NPK1 User Testing

- [ ] Buat user baru dengan `plant: "NPK1"`
- [ ] Login sebagai NPK1 user
- [ ] Dashboard menunjukkan "Plant NPK 1 (Retail)" ✅
- [ ] **SIDEBAR MENU - CRITICAL CHECK:**
  - [ ] Klik "Produksi" di sidebar
  - [ ] **Harus HANYA tampil: "Produksi Retail"** ✅ (FIX TERBARU Dec 5)
  - [ ] ❌ **TIDAK boleh ada** "Produksi Granul"
  - [ ] ❌ **TIDAK boleh ada** "Produksi Blending"
  - [ ] ❌ **TIDAK boleh ada** "Produksi NPK Mini"
- [ ] Klik "Produksi Retail" → Header title "Produksi Retail" (bukan "Produksi Blending") ✅
- [ ] Tambah data Produksi Retail → verify disimpan ke `produksi_retail_NPK1` sheet
- [ ] Edit data → verify diupdate di sheet yang benar
- [ ] Delete data → verify dihapus dari sheet yang benar
- [ ] Dashboard metrics menunjukkan data NPK1 saja
- [ ] **Access Protection Test**: Coba akses manual dengan URL tab=npk → Harus error "Akses Ditolak" ✅

### NPK2 User Testing

- [ ] Buat user baru dengan `plant: "NPK2"`
- [ ] Login sebagai NPK2 user
- [ ] Dashboard menunjukkan "Plant NPK 2 (Blending + NPK Mini)" ✅
- [ ] Menu menampilkan: Dashboard, Produksi Granul, Produksi Blending, Produksi NPK Mini, dll ✅
- [ ] Tambah data Produksi Blending → verify disimpan ke `produksi_blending` sheet
- [ ] Dashboard metrics menunjukkan data NPK2 saja

### ALL User Testing (Management)

- [ ] Login sebagai user dengan `plant: "ALL"`
- [ ] Dashboard menunjukkan plant filter selector ✅
- [ ] Toggle filter: ALL → NPK1 → NPK2 → verify data berubah sesuai pilihan
- [ ] Metrics calculated correctly untuk masing-masing plant

### Cross-Plant Verification

- [ ] NPK1 user tidak bisa melihat data NPK2
- [ ] NPK2 user tidak bisa melihat data NPK1
- [ ] ALL user bisa melihat data kedua plant dengan filter

## 📊 Impact Summary

**Files Modified**: 1 file

- `src/App.tsx` - 50+ replacements across 40+ functions

**Functions Added**: 3 wrappers

- `saveDataForPlant()`
- `updateDataForPlant()`
- `deleteDataFromSheetForPlant()`

**Functions Modified**: 20+ handlers

- All submit handlers for production data
- Delete handler with 14 cases
- Approval handler
- Dashboard metrics calculation
- Data fetch operations

**Compilation Status**: ✅ No errors

## 🚀 Deployment Notes

1. **Google Sheets Setup Required**:
   - Ensure all NPK1 sheets exist with `_NPK1` suffix:
     - `produksi_retail_NPK1`
     - `produksi_npk_NPK1` (if applicable)
     - `timesheet_forklift_NPK1`
     - `timesheet_loader_NPK1`
     - `downtime_NPK1`
     - `work_request_NPK1`
     - `bahan_baku_NPK1`
     - `vibrasi_NPK1`
     - `gate_pass_NPK1`
     - `akun_NPK1`
     - `rkap_NPK1`
     - `perta_NPK1`
     - `trouble_record_NPK1`
2. **User Management**:

   - Assign existing users to correct plant (NPK1/NPK2/ALL)
   - Update user table in Google Sheets dengan kolom `plant`

3. **RKAP Data**:
   - Ensure RKAP targets exist for both NPK1 and NPK2
   - Add `plant` field to existing RKAP records

## 🎯 Expected Behavior After Fix

### NPK1 User

- Dashboard shows: "🏭 Anda sedang melihat data: Plant NPK 1 (Retail)"
- Menu: Retail production only (no Blending, no Mini)
- All data saved to `*_NPK1` sheets
- Dashboard metrics calculated from NPK1 data only

### NPK2 User

- Dashboard shows: "🏭 Anda sedang melihat data: Plant NPK 2 (Blending + NPK Mini)"
- Menu: Granul, Blending, and NPK Mini production
- All data saved to original sheets (no suffix)
- Dashboard metrics calculated from NPK2 data only

### ALL User (Management)

- Dashboard shows plant filter: [ALL] [NPK1] [NPK2]
- Can toggle between plants to view combined or filtered data
- Useful for management reporting and comparison

## 📝 Debug Logs Added

Added console logs untuk tracking (line 2173-2261):

```typescript
console.log("👤 User Plant:", userPlant);
console.log("📦 Loading data for plant:", userPlant);
console.log("📊 NPK Data loaded:", npk?.length, "items");
console.log("📊 Blending Data loaded:", blending?.length, "items");
console.log("📊 First NPK item plant:", npk?.[0]?._plant);
```

These logs will help verify data loading and plant tagging during testing.
