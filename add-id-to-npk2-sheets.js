/**
 * Script untuk menambahkan kolom ID ke semua sheet NPK2 yang belum punya ID
 *
 * CARA PAKAI:
 * 1. Buka Google Apps Script Editor (Extensions > Apps Script)
 * 2. Buat file baru, copy paste script ini
 * 3. Klik tombol Run (▶) dan pilih fungsi: addIdToAllNPK2Sheets
 * 4. Tunggu sampai selesai (cek log dengan View > Logs)
 * 5. Refresh Google Sheets untuk lihat hasilnya
 */

function addIdToAllNPK2Sheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Daftar semua sheet NPK2 (tanpa suffix _NPK1)
  const npk2Sheets = [
    "produksi_npk",
    "produksi_blending",
    "produksi_npk_mini",
    "timesheet_forklift",
    "timesheet_loader",
    "downtime",
    "work_request",
    "bahan_baku",
    "vibrasi",
    "gate_pass",
    "akun",
    "rkap",
    "perta",
    "trouble_record",
  ];

  Logger.log("=== MULAI MENAMBAHKAN ID KE SHEET NPK2 ===");

  npk2Sheets.forEach(function (sheetName) {
    try {
      const sheet = ss.getSheetByName(sheetName);

      if (!sheet) {
        Logger.log("⚠️ Sheet tidak ditemukan: " + sheetName);
        return;
      }

      addIdColumnToSheet(sheet);
      Logger.log("✅ Selesai: " + sheetName);
    } catch (error) {
      Logger.log("❌ Error pada sheet " + sheetName + ": " + error.toString());
    }
  });

  Logger.log("=== SELESAI ===");
  Logger.log("Silakan refresh Google Sheets untuk melihat hasilnya.");
}

function addIdColumnToSheet(sheet) {
  const sheetName = sheet.getName();
  Logger.log("\n📋 Processing: " + sheetName);

  // Ambil semua data
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 1) {
    Logger.log("   Sheet kosong, skip");
    return;
  }

  // Ambil header (baris 1)
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  Logger.log("   Headers: " + headers.join(", "));

  // Cek apakah sudah ada kolom 'id'
  const idColumnIndex = headers.indexOf("id");

  if (idColumnIndex !== -1) {
    Logger.log("   ✓ Kolom ID sudah ada di kolom " + (idColumnIndex + 1));

    // Cek apakah ada row yang belum punya ID
    if (lastRow > 1) {
      const idColumn = sheet
        .getRange(2, idColumnIndex + 1, lastRow - 1, 1)
        .getValues();
      let emptyCount = 0;

      for (let i = 0; i < idColumn.length; i++) {
        if (!idColumn[i][0] || idColumn[i][0] === "") {
          emptyCount++;
          // Generate ID untuk row kosong
          const newId =
            new Date().getTime() +
            "_" +
            Math.random().toString(36).substr(2, 9);
          sheet.getRange(i + 2, idColumnIndex + 1).setValue(newId);
        }
      }

      if (emptyCount > 0) {
        Logger.log("   ✓ Mengisi " + emptyCount + " row yang belum punya ID");
      } else {
        Logger.log("   ✓ Semua row sudah punya ID");
      }
    }
    return;
  }

  // Jika belum ada kolom ID, tambahkan di kolom A (paling kiri)
  Logger.log("   → Menambahkan kolom ID di kolom A...");

  // Insert kolom baru di posisi A
  sheet.insertColumnBefore(1);

  // Set header 'id' di A1
  sheet.getRange(1, 1).setValue("id");

  // Generate ID untuk setiap row data
  if (lastRow > 1) {
    const rowCount = lastRow - 1;
    Logger.log("   → Generating ID untuk " + rowCount + " row...");

    const ids = [];
    for (let i = 0; i < rowCount; i++) {
      // Generate unique ID: timestamp_random
      const id =
        new Date().getTime() + "_" + Math.random().toString(36).substr(2, 9);
      ids.push([id]);

      // Delay sedikit agar timestamp berbeda
      if (i % 10 === 0) {
        Utilities.sleep(10); // 10ms delay setiap 10 row
      }
    }

    // Tulis semua ID sekaligus
    sheet.getRange(2, 1, rowCount, 1).setValues(ids);
    Logger.log("   ✅ " + rowCount + " ID berhasil ditambahkan");
  }

  // Format kolom ID
  sheet.getRange(1, 1).setBackground("#9CAF88").setFontWeight("bold");
  sheet.setColumnWidth(1, 200);

  Logger.log("   ✅ Kolom ID berhasil ditambahkan dan diformat");
}

/**
 * Fungsi untuk verifikasi - cek sheet mana saja yang sudah/belum punya ID
 */
function checkWhichSheetsHaveId() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();

  Logger.log("=== CEK STATUS KOLOM ID ===\n");

  allSheets.forEach(function (sheet) {
    const sheetName = sheet.getName();
    const lastCol = sheet.getLastColumn();

    if (lastCol < 1) {
      Logger.log(sheetName + ": Sheet kosong");
      return;
    }

    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const idColumnIndex = headers.indexOf("id");

    if (idColumnIndex !== -1) {
      const lastRow = sheet.getLastRow();
      let emptyIdCount = 0;

      if (lastRow > 1) {
        const idColumn = sheet
          .getRange(2, idColumnIndex + 1, lastRow - 1, 1)
          .getValues();
        emptyIdCount = idColumn.filter(
          (row) => !row[0] || row[0] === ""
        ).length;
      }

      if (emptyIdCount > 0) {
        Logger.log(
          "⚠️ " +
            sheetName +
            ": Ada kolom ID di kolom " +
            (idColumnIndex + 1) +
            ", tapi " +
            emptyIdCount +
            " row kosong"
        );
      } else {
        Logger.log(
          "✅ " +
            sheetName +
            ": Ada kolom ID di kolom " +
            (idColumnIndex + 1) +
            ", semua row terisi"
        );
      }
    } else {
      Logger.log("❌ " + sheetName + ": BELUM ADA kolom ID");
    }
  });

  Logger.log("\n=== SELESAI ===");
}

/**
 * Fungsi untuk menambahkan ID ke satu sheet tertentu saja
 * Gunakan ini jika hanya ingin menambahkan ID ke sheet tertentu
 */
function addIdToSpecificSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // GANTI NAMA SHEET DI SINI
  const sheetName = "produksi_npk"; // <-- Ganti sesuai kebutuhan

  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("❌ Sheet tidak ditemukan: " + sheetName);
    return;
  }

  addIdColumnToSheet(sheet);
  Logger.log("✅ Selesai menambahkan ID ke: " + sheetName);
}
