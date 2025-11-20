/**
 * Google Apps Script untuk NPK Production Management System
 *
 * CARA SETUP:
 * 1. Buka Google Sheets baru
 * 2. Buat sheet dengan nama berikut:
 *    - produksi_npk
 *    - produksi_blending
 *    - produksi_npk_mini
 *    - timesheet_forklift
 *    - timesheet_loader
 *    - downtime
 *    - work_request
 *    - bahan_baku
 *    - vibrasi
 *    - gate_pass
 *    - akun
 *    - rkap
 *    - sessions (untuk multi-login detection)
 *
 * 3. Buka Extensions > Apps Script
 * 4. Copy paste script ini
 * 5. Deploy > New Deployment > Web App
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Copy URL yang dihasilkan ke aplikasi web
 */

// Fungsi utama untuk handle GET request (read data)
function doGet(e) {
  try {
    const sheet = e.parameter.sheet;
    const action = e.parameter.action || "read";

    // Session management endpoints
    if (action === "checkSession") {
      const username = e.parameter.username;
      const result = checkActiveSession(username);
      const output = ContentService.createTextOutput(JSON.stringify(result));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    if (action === "read" && sheet) {
      const data = readData(sheet);
      const output = ContentService.createTextOutput(JSON.stringify(data));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    const output = ContentService.createTextOutput(
      JSON.stringify({ error: "Invalid request" })
    );
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    const output = ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    );
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

// Fungsi utama untuk handle POST request (create, update, delete)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const sheet = data.sheet;
    const rowData = data.data;

    let result;

    switch (action) {
      case "create":
        result = createData(sheet, rowData);
        break;
      case "update":
        result = updateData(sheet, rowData);
        break;
      case "delete":
        result = deleteData(sheet, rowData);
        break;
      case "createSession":
        result = createSession(data.username, data.sessionId);
        break;
      case "updateSession":
        result = updateSession(data.username, data.sessionId);
        break;
      case "deleteSession":
        result = deleteSession(data.username);
        break;
      default:
        result = { error: "Invalid action" };
    }

    const output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    const output = ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    );
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

// Fungsi untuk membaca data dari sheet
function readData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  // Jika sheet belum ada, buat sheet baru
  if (!sheet) {
    sheet = createSheet(sheetName);
  }

  const range = sheet.getDataRange();
  const values = range.getValues();

  if (values.length === 0) {
    return [];
  }

  // Baris pertama adalah header
  const headers = values[0];
  const data = [];

  // Convert array ke object
  for (let i = 1; i < values.length; i++) {
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      let cellValue = values[i][j];

      // Khusus untuk downtime jamOff dan jamStart: ambil sebagai string waktu HH:MM
      if (
        sheetName === "downtime" &&
        (headers[j] === "jamOff" || headers[j] === "jamStart")
      ) {
        if (cellValue instanceof Date) {
          // Ambil jam dan menit saja, format HH:MM
          const hours = String(cellValue.getHours()).padStart(2, "0");
          const minutes = String(cellValue.getMinutes()).padStart(2, "0");
          cellValue = hours + ":" + minutes;
        } else if (typeof cellValue === "string") {
          // Bersihkan apostrof prefix kalau ada
          cellValue = cellValue.replace(/^'/, "");
        }
        row[headers[j]] = cellValue;
        continue;
      }

      // Konversi Date object ke string format YYYY-MM-DD untuk kolom tanggal
      if (cellValue instanceof Date) {
        const originalDate = cellValue;
        cellValue = Utilities.formatDate(
          cellValue,
          Session.getScriptTimeZone(),
          "yyyy-MM-dd"
        );
        Logger.log("📅 Converted Date: " + originalDate + " -> " + cellValue);
      }

      // Bersihkan format " Jam" untuk perhitungan di aplikasi
      if (
        (sheetName === "timesheet_forklift" ||
          sheetName === "timesheet_loader") &&
        (headers[j] === "jamGrounded" ||
          headers[j] === "jamOperasi" ||
          headers[j] === "jamReal") &&
        typeof cellValue === "string" &&
        cellValue.includes(" Jam")
      ) {
        cellValue = parseFloat(cellValue.replace(" Jam", ""));
      }

      row[headers[j]] = cellValue;
    }
    data.push(row);
  }

  return data;
}

// Fungsi untuk membuat data baru
function createData(sheetName, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  // Jika sheet belum ada, buat sheet baru
  if (!sheet) {
    sheet = createSheet(sheetName);
  }

  // Jika sheet kosong, tambahkan header dulu
  if (sheet.getLastRow() === 0) {
    const headers = ["id"].concat(Object.keys(rowData));
    sheet.appendRow(headers);
  }

  // Ambil header dari baris pertama
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Generate ID unik berdasarkan timestamp dan random
  const uniqueId =
    new Date().getTime() + "_" + Math.random().toString(36).substr(2, 9);
  rowData.id = uniqueId;

  // Buat array values sesuai urutan header
  // PENTING: Gunakan hasOwnProperty untuk menangani nilai 0 dan false
  const values = headers.map((header) => {
    if (rowData.hasOwnProperty(header)) {
      const value =
        rowData[header] !== undefined && rowData[header] !== null
          ? rowData[header]
          : "";

      // Format khusus untuk jamGrounded dan jamOperasi di timesheet
      if (
        (sheetName === "timesheet_forklift" ||
          sheetName === "timesheet_loader") &&
        (header === "jamGrounded" ||
          header === "jamOperasi" ||
          header === "jamReal")
      ) {
        return value !== "" && value !== null && value !== undefined
          ? value + " Jam"
          : "";
      }

      // Untuk downtime jamOff dan jamStart, tambahkan apostrof prefix agar disimpan sebagai text
      if (
        sheetName === "downtime" &&
        (header === "jamOff" || header === "jamStart")
      ) {
        return value !== "" ? "'" + value : "";
      }

      return value;
    }
    return "";
  });

  // Tambahkan timestamp
  const timestamp = new Date();

  // Append row baru
  const lastRow = sheet.getLastRow();
  sheet.appendRow(values);

  // Set format text untuk kolom jamOff dan jamStart di downtime
  if (sheetName === "downtime") {
    const jamOffIndex = headers.indexOf("jamOff");
    const jamStartIndex = headers.indexOf("jamStart");
    const newRow = lastRow + 1;

    if (jamOffIndex !== -1) {
      sheet.getRange(newRow, jamOffIndex + 1).setNumberFormat("@");
    }
    if (jamStartIndex !== -1) {
      sheet.getRange(newRow, jamStartIndex + 1).setNumberFormat("@");
    }
  }

  return {
    success: true,
    message: "Data berhasil disimpan",
    timestamp: timestamp,
    id: uniqueId,
  };
}

// Fungsi untuk update data
function updateData(sheetName, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { error: "Sheet not found" };
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  // Cari row yang cocok berdasarkan ID unik
  let rowIndex = -1;
  const idColIndex = headers.indexOf("id");

  // Jika ada ID, gunakan ID untuk pencarian (lebih akurat)
  if (idColIndex !== -1 && rowData.id) {
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][idColIndex]) === String(rowData.id)) {
        rowIndex = i;
        break;
      }
    }
  }

  // Fallback: jika tidak ada ID atau tidak ditemukan, cari dengan multi-field matching
  if (rowIndex === -1) {
    Logger.log(
      "ID not found in updateData, trying multi-field matching for: " +
        JSON.stringify(rowData)
    );
    for (let i = 1; i < values.length; i++) {
      let isMatch = true;
      let matchedFields = [];

      // Cek beberapa field penting untuk matching
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const cellValue = values[i][j];
        // Jika id tidak ada dan __original tersedia, gunakan nilai original untuk pencarian
        let compareValue = rowData[header];
        if ((!rowData.id || rowData.id === "") && rowData.__original) {
          if (rowData.__original.hasOwnProperty(header)) {
            compareValue = rowData.__original[header];
          }
        }

        // Skip field id, downtime (hasil kalkulasi), dan field kosong
        if (
          header === "id" ||
          header === "downtime" ||
          header === "total" ||
          header === "totalOnspek" ||
          header === "totalOffspek" ||
          compareValue === undefined ||
          compareValue === null ||
          compareValue === ""
        ) {
          continue;
        }

        // Normalisasi untuk comparison
        let normalizedCell = cellValue;
        let normalizedCompare = compareValue;

        // Jika tanggal, convert ke string format YYYY-MM-DD
        if (cellValue instanceof Date) {
          normalizedCell = Utilities.formatDate(
            cellValue,
            Session.getScriptTimeZone(),
            "yyyy-MM-dd"
          );
        }
        if (
          typeof compareValue === "string" &&
          compareValue.match(/^\d{4}-\d{2}-\d{2}/)
        ) {
          normalizedCompare = compareValue.split("T")[0];
        }

        // Untuk downtime, bersihkan apostrof dari jamOff dan jamStart
        if (
          sheetName === "downtime" &&
          (header === "jamOff" || header === "jamStart")
        ) {
          if (typeof normalizedCell === "string") {
            normalizedCell = normalizedCell.replace(/^'/, "");
          }
        }

        // Untuk timesheet, bersihkan " Jam" suffix
        if (
          (sheetName === "timesheet_forklift" ||
            sheetName === "timesheet_loader") &&
          (header === "jamGrounded" ||
            header === "jamOperasi" ||
            header === "jamReal")
        ) {
          if (typeof normalizedCell === "string") {
            normalizedCell = normalizedCell.replace(/ Jam$/, "");
          }
        }

        if (String(normalizedCell) !== String(normalizedCompare)) {
          isMatch = false;
          break;
        } else {
          matchedFields.push(header);
        }
      }

      if (isMatch && matchedFields.length > 0) {
        rowIndex = i;
        Logger.log(
          "Match found at row " +
            (i + 1) +
            " with fields: " +
            matchedFields.join(", ")
        );
        break;
      }
    }
  }

  if (rowIndex === -1) {
    Logger.log(
      "Update failed - Data not found for: " + JSON.stringify(rowData)
    );
    return {
      error: "Data not found",
      searchedId: rowData.id || "no id",
      searchedField: getIdField(sheetName),
      searchedValue: rowData[getIdField(sheetName)],
    };
  }

  // Jika baris belum punya id dan kita berhasil menemukan row lewat __original, assign id baru
  if (idColIndex !== -1 && (!rowData.id || rowData.id === "")) {
    rowData.id =
      new Date().getTime() + "_" + Math.random().toString(36).substr(2, 9);
    Logger.log(
      "Assigned new legacy id: " + rowData.id + " at row " + (rowIndex + 1)
    );
  }

  // Update row - gunakan hasOwnProperty untuk check, bukan just ||
  const updateValues = headers.map((header) => {
    // Jika rowData memiliki property ini (bahkan jika nilainya 0 atau false), gunakan nilai baru
    if (rowData.hasOwnProperty(header)) {
      const value =
        rowData[header] !== undefined && rowData[header] !== null
          ? rowData[header]
          : "";

      // Format khusus untuk jamGrounded dan jamOperasi di timesheet
      if (
        (sheetName === "timesheet_forklift" ||
          sheetName === "timesheet_loader") &&
        (header === "jamGrounded" ||
          header === "jamOperasi" ||
          header === "jamReal")
      ) {
        return value !== "" && value !== null && value !== undefined
          ? value + " Jam"
          : "";
      }

      // Untuk downtime jamOff dan jamStart, tambahkan apostrof prefix agar disimpan sebagai text
      if (
        sheetName === "downtime" &&
        (header === "jamOff" || header === "jamStart")
      ) {
        return value !== "" ? "'" + value : "";
      }

      return value;
    }
    // Jika tidak ada di rowData, pertahankan nilai lama
    return values[rowIndex][headers.indexOf(header)] || "";
  });

  Logger.log(
    "Updating row " +
      (rowIndex + 1) +
      " with values: " +
      JSON.stringify(updateValues)
  );
  sheet
    .getRange(rowIndex + 1, 1, 1, updateValues.length)
    .setValues([updateValues]);

  // Set format text untuk kolom jamOff dan jamStart di downtime saat update
  if (sheetName === "downtime") {
    const jamOffIndex = headers.indexOf("jamOff");
    const jamStartIndex = headers.indexOf("jamStart");

    if (jamOffIndex !== -1) {
      sheet.getRange(rowIndex + 1, jamOffIndex + 1).setNumberFormat("@");
    }
    if (jamStartIndex !== -1) {
      sheet.getRange(rowIndex + 1, jamStartIndex + 1).setNumberFormat("@");
    }
  }

  return {
    success: true,
    message: "Data berhasil diupdate",
    rowUpdated: rowIndex + 1,
    updatedData: rowData,
  };
}

// Fungsi untuk delete data
function deleteData(sheetName, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { error: "Sheet not found" };
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  // Cari row yang cocok berdasarkan ID unik
  let rowIndex = -1;
  const idColIndex = headers.indexOf("id");

  // Jika ada ID, gunakan ID untuk pencarian (lebih akurat)
  if (idColIndex !== -1 && rowData.id) {
    Logger.log("Searching for ID: " + rowData.id);
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][idColIndex]) === String(rowData.id)) {
        rowIndex = i;
        Logger.log("Found row by ID at: " + (i + 1));
        break;
      }
    }
  }

  // Fallback: jika tidak ada ID atau tidak ditemukan, cari dengan multi-field matching
  if (rowIndex === -1) {
    Logger.log(
      "ID not found, trying multi-field matching for: " +
        JSON.stringify(rowData)
    );

    for (let i = 1; i < values.length; i++) {
      let isMatch = true;
      let matchedFields = [];

      // Cek beberapa field penting untuk matching
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const cellValue = values[i][j];
        // Jika id tidak ada dan __original tersedia, gunakan nilai original untuk pencarian
        let compareValue = rowData[header];
        if ((!rowData.id || rowData.id === "") && rowData.__original) {
          if (rowData.__original.hasOwnProperty(header)) {
            compareValue = rowData.__original[header];
          }
        }

        // Skip field id, downtime (hasil kalkulasi), dan field kosong
        if (
          header === "id" ||
          header === "downtime" ||
          compareValue === undefined ||
          compareValue === null ||
          compareValue === ""
        ) {
          continue;
        }

        // Normalisasi untuk comparison
        let normalizedCell = cellValue;
        let normalizedCompare = compareValue;

        // Jika tanggal, convert ke string format YYYY-MM-DD
        if (cellValue instanceof Date) {
          normalizedCell = Utilities.formatDate(
            cellValue,
            Session.getScriptTimeZone(),
            "yyyy-MM-dd"
          );
        }
        if (
          typeof compareValue === "string" &&
          compareValue.match(/^\d{4}-\d{2}-\d{2}/)
        ) {
          normalizedCompare = compareValue.split("T")[0];
        }

        // Untuk downtime, bersihkan apostrof dari jamOff dan jamStart
        if (
          sheetName === "downtime" &&
          (header === "jamOff" || header === "jamStart")
        ) {
          if (typeof normalizedCell === "string") {
            normalizedCell = normalizedCell.replace(/^'/, "");
          }
        }

        if (String(normalizedCell) !== String(normalizedCompare)) {
          isMatch = false;
          break;
        } else {
          matchedFields.push(header);
        }
      }

      if (isMatch && matchedFields.length > 0) {
        rowIndex = i;
        Logger.log(
          "Match found at row " +
            (i + 1) +
            " with fields: " +
            matchedFields.join(", ")
        );
        break;
      }
    }
  }

  if (rowIndex === -1) {
    Logger.log(
      "Delete failed - Data not found for: " + JSON.stringify(rowData)
    );
    return {
      error: "Data not found",
      searchedId: rowData.id || "no id",
      searchedField: getIdField(sheetName),
      searchedValue: rowData[getIdField(sheetName)],
    };
  }

  // Delete row
  Logger.log("Deleting row " + (rowIndex + 1) + " from sheet: " + sheetName);
  sheet.deleteRow(rowIndex + 1);

  return {
    success: true,
    message: "Data berhasil dihapus",
    rowDeleted: rowIndex + 1,
    deletedData: rowData,
  };
}

// Helper function: Buat sheet baru dengan header yang sesuai
function createSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet(sheetName);

  // Tambahkan header sesuai dengan structure masing-masing sheet
  const headers = getHeadersForSheet(sheetName);
  if (headers.length > 0) {
    sheet.appendRow(headers);

    // Format header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#9CAF88");
    headerRange.setFontColor("#FFFFFF");
  }

  return sheet;
}

// Helper function: Get headers untuk setiap sheet
function getHeadersForSheet(sheetName) {
  const headersMap = {
    produksi_npk: [
      "id",
      "tanggal",
      "shiftMalamOnspek",
      "shiftMalamOffspek",
      "shiftPagiOnspek",
      "shiftPagiOffspek",
      "shiftSoreOnspek",
      "shiftSoreOffspek",
      "totalOnspek",
      "totalOffspek",
      "total",
    ],
    produksi_blending: ["id", "tanggal", "kategori", "formula", "tonase"],
    produksi_npk_mini: ["id", "tanggal", "formulasi", "tonase"],
    timesheet_forklift: [
      "id",
      "tanggal",
      "forklift",
      "deskripsiTemuan",
      "jamOff",
      "jamStart",
      "jamGrounded",
      "jamOperasi",
      "keterangan",
    ],
    timesheet_loader: [
      "id",
      "tanggal",
      "shift",
      "deskripsiTemuan",
      "jamOff",
      "jamStart",
      "jamGrounded",
      "jamOperasi",
      "keterangan",
    ],
    downtime: [
      "id",
      "tanggal",
      "item",
      "deskripsi",
      "jamOff",
      "jamStart",
      "downtime",
    ],
    work_request: [
      "id",
      "tanggal",
      "nomorWR",
      "item",
      "area",
      "eksekutor",
      "include",
      "deskripsiPekerjaan",
    ],
    bahan_baku: ["id", "tanggal", "jenisBahanBaku", "tonase", "keterangan"],
    vibrasi: [
      "id",
      "tanggal",
      "equipment",
      "position",
      "point",
      "nilai",
      "keterangan",
    ],
    gate_pass: [
      "id",
      "noFile",
      "noPol",
      "pemilikBarang",
      "namaPembawa",
      "namaBarang",
      "alasanMengeluarkan",
      "tanggal",
      "approver",
    ],
    akun: [
      "id",
      "noBadge",
      "nama",
      "jabatan",
      "passwordESS",
      "passwordPismart",
      "passwordDOF",
      "tanggalUpdate",
    ],
    rkap: ["id", "bulan", "targetRKAP"],
  };

  return headersMap[sheetName] || [];
}

// Helper function: Get ID field untuk setiap sheet
function getIdField(sheetName) {
  const idFieldMap = {
    produksi_npk: "tanggal",
    produksi_blending: "tanggal",
    produksi_npk_mini: "tanggal",
    timesheet_forklift: "tanggal",
    timesheet_loader: "tanggal",
    downtime: "tanggal",
    work_request: "nomorWR",
    bahan_baku: "tanggal",
    vibrasi: "tanggal",
    gate_pass: "noFile",
    akun: "noBadge",
    rkap: "bulan",
  };

  return idFieldMap[sheetName] || "tanggal";
}

// Test function untuk memastikan script berjalan dengan baik
function testScript() {
  const testData = {
    tanggal: "2025-11-15",
    shiftMalamOnspek: 100,
    shiftMalamOffspek: 10,
    shiftPagiOnspek: 110,
    shiftPagiOffspek: 15,
    shiftSoreOnspek: 105,
    shiftSoreOffspek: 12,
    totalOnspek: 315,
    totalOffspek: 37,
    total: 352,
  };

  const result = createData("produksi_npk", testData);
  Logger.log(result);
}

// ==================== SESSION MANAGEMENT FUNCTIONS ====================

/**
 * Check if user has active session
 * Returns { hasSession: boolean, sessionData: object }
 */
function checkActiveSession(username) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("sessions");

  // Create sessions sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("sessions");
    sheet.appendRow(["Username", "Session ID", "Timestamp", "Browser", "IP"]);
  }

  const data = sheet.getDataRange().getValues();
  const now = new Date().getTime();
  const TWO_MINUTES = 2 * 60 * 1000;

  // Find active session (within last 2 minutes)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username) {
      const sessionTime = new Date(data[i][2]).getTime();

      // Check if session is still active (< 2 minutes old)
      if (now - sessionTime < TWO_MINUTES) {
        return {
          hasSession: true,
          sessionData: {
            username: data[i][0],
            sessionId: data[i][1],
            timestamp: data[i][2],
            browser: data[i][3],
            ip: data[i][4],
          },
        };
      } else {
        // Session expired, delete it
        sheet.deleteRow(i + 1);
        return { hasSession: false };
      }
    }
  }

  return { hasSession: false };
}

/**
 * Create new session for user
 */
function createSession(username, sessionId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("sessions");

  if (!sheet) {
    sheet = ss.insertSheet("sessions");
    sheet.appendRow(["Username", "Session ID", "Timestamp", "Browser", "IP"]);
  }

  // Delete any existing session for this user
  deleteSession(username);

  // Create new session
  const timestamp = new Date();
  const browser = "Unknown"; // Will be sent from client
  const ip = Session.getActiveUser().getEmail() || "Unknown";

  sheet.appendRow([username, sessionId, timestamp, browser, ip]);

  return {
    success: true,
    message: "Session created",
    sessionId: sessionId,
  };
}

/**
 * Update existing session timestamp (keep-alive)
 */
function updateSession(username, sessionId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("sessions");

  if (!sheet) {
    return { success: false, message: "Sessions sheet not found" };
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === sessionId) {
      // Update timestamp
      sheet.getRange(i + 1, 3).setValue(new Date());
      return { success: true, message: "Session updated" };
    }
  }

  return { success: false, message: "Session not found" };
}

/**
 * Delete session for user (on logout)
 */
function deleteSession(username) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("sessions");

  if (!sheet) {
    return { success: false, message: "Sessions sheet not found" };
  }

  const data = sheet.getDataRange().getValues();

  // Delete from bottom to top to avoid index shifting
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === username) {
      sheet.deleteRow(i + 1);
    }
  }

  return { success: true, message: "Session deleted" };
}

/**
 * Clean up expired sessions (run periodically)
 * Can be set as time-based trigger: every 5 minutes
 */
function cleanupExpiredSessions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("sessions");

  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  const now = new Date().getTime();
  const TWO_MINUTES = 2 * 60 * 1000;

  // Delete from bottom to top
  for (let i = data.length - 1; i >= 1; i--) {
    const sessionTime = new Date(data[i][2]).getTime();

    if (now - sessionTime >= TWO_MINUTES) {
      sheet.deleteRow(i + 1);
    }
  }

  Logger.log("Expired sessions cleaned up");
}
