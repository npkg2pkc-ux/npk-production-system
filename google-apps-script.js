/**
 * Google Apps Script untuk NPK Production Management System (Multi-Plant)
 *
 * CARA SETUP:
 * 1. Buka Google Sheets baru
 * 2. Buat sheet dengan nama berikut:
 *
 *    NPK 2 (Original Sheets):
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
 *    - perta
 *    - trouble_record
 *
 *    NPK 1 (New Sheets with _NPK1 suffix):
 *    - produksi_npk_NPK1
 *    - produksi_retail_NPK1 (replaces blending)
 *    - timesheet_forklift_NPK1
 *    - timesheet_loader_NPK1
 *    - downtime_NPK1
 *    - work_request_NPK1
 *    - bahan_baku_NPK1
 *    - vibrasi_NPK1
 *    - gate_pass_NPK1
 *    - akun_NPK1
 *    - rkap_NPK1
 *    - perta_NPK1
 *    - trouble_record_NPK1
 *
 *    Shared Sheets (No suffix):
 *    - users (untuk user management) - add 'plant' column (NPK1/NPK2/ALL)
 *    - approval_requests (untuk approval system)
 *    - sessions (untuk multi-login detection)
 *    - monthly_notes (untuk catatan bulanan per plant) - add '_plant' column
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
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Chat messages endpoint
    if (action === "getChatMessages") {
      const result = getChatMessages();
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "read" && sheet) {
      // Gunakan fungsi spesifik untuk trouble_record
      let data;
      if (sheet === "trouble_record") {
        const result = getTroubleRecordData();
        data = result.success ? result.data : [];
      } else {
        data = readData(sheet);
      }
      return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
        ContentService.MimeType.JSON
      );
    }

    return ContentService.createTextOutput(
      JSON.stringify({ error: "Invalid request" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi utama untuk handle POST request (create, update, delete)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const sheet = data.sheet || data.dataType; // Support both sheet and dataType
    const rowData = data.data;

    // Log session-related actions
    if (action === "createSession" || action === "updateSession") {
      console.log("[GAS] Received " + action + " with data:", {
        username: data.username,
        browser: data.browser,
        ipAddress: data.ipAddress,
      });
    }

    let result;

    switch (action) {
      case "add":
      case "create":
        // Gunakan fungsi spesifik untuk trouble_record
        if (sheet === "trouble_record") {
          result = saveTroubleRecordData(rowData);
        } else {
          result = createData(sheet, rowData);
        }
        break;
      case "update":
        // Gunakan fungsi spesifik untuk trouble_record
        if (sheet === "trouble_record") {
          result = updateTroubleRecordData(rowData);
        } else {
          result = updateData(sheet, rowData);
        }
        break;
      case "delete":
        // Gunakan fungsi spesifik untuk trouble_record
        if (sheet === "trouble_record") {
          result = deleteTroubleRecordData(rowData);
        } else {
          result = deleteData(sheet, rowData);
        }
        break;
      case "createSession":
        result = createSession(
          data.username,
          data.sessionId,
          data.browser,
          data.ipAddress
        );
        break;
      case "updateSession":
        result = updateSession(
          data.username,
          data.sessionId,
          data.browser,
          data.ipAddress
        );
        break;
      case "deleteSession":
        result = deleteSession(data.username);
        break;
      case "addChatMessage":
        result = addChatMessage(rowData);
        break;
      case "login":
        result = loginUser(
          data.username,
          data.password,
          data.browser,
          data.ipAddress
        );
        break;
      default:
        result = { error: "Invalid action" };
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== AUTH / USERS FUNCTIONS ====================

/**
 * Ensure users sheet exists with proper headers
 */
function ensureUsersSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("users");
  if (!sheet) {
    sheet = ss.insertSheet("users");
    sheet.appendRow([
      "id",
      "username",
      "password",
      "role",
      "namaLengkap",
      "status",
      "plant",
      "createdAt",
      "lastLogin",
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#9CAF88");
    headerRange.setFontColor("#FFFFFF");
  }
  return sheet;
}

/**
 * Find user by username. Returns object with headers mapping or null
 */
function getUserByUsername(username) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("users");
  if (!sheet) return null;

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return null;

  const headers = data[0];
  const usernameIdx = headers.indexOf("username");
  if (usernameIdx === -1) return null;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const dbUsername = String(row[usernameIdx] || "").trim();
    if (dbUsername === String(username || "").trim()) {
      const obj = {};
      headers.forEach((h, idx) => (obj[h] = row[idx]));
      return obj; // includes id, username, password, role, namaLengkap, status, createdAt, lastLogin
    }
  }
  return null;
}

/**
 * Login user: validate credentials against users sheet
 * Optionally create session and update lastLogin
 */
function loginUser(username, password, browser, ipAddress) {
  try {
    ensureUsersSheet();

    // Basic validation
    if (!username || !password) {
      return { success: false, message: "Username atau password kosong" };
    }

    const user = getUserByUsername(username);
    if (!user) {
      return { success: false, message: "User tidak ditemukan" };
    }

    const status = String(user.status || "").toLowerCase();
    if (status !== "active") {
      return { success: false, message: "Akun tidak aktif" };
    }

    const dbPassword = String(user.password || "").trim();
    const inputPassword = String(password || "").trim();
    if (dbPassword !== inputPassword) {
      return { success: false, message: "Password salah" };
    }

    // Update lastLogin
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName("users");
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const idIdx = headers.indexOf("id");
      const lastLoginIdx = headers.indexOf("lastLogin");
      const usernameIdx = headers.indexOf("username");
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][usernameIdx]).trim() === String(username).trim()) {
          if (idIdx === -1 || !data[i][idIdx]) {
            // Assign id for legacy row
            const newId =
              new Date().getTime() +
              "_" +
              Math.random().toString(36).substr(2, 9);
            sheet.getRange(i + 1, headers.indexOf("id") + 1).setValue(newId);
            user.id = newId;
          }
          if (lastLoginIdx !== -1) {
            sheet.getRange(i + 1, lastLoginIdx + 1).setValue(new Date());
          }
          break;
        }
      }
    } catch (e) {
      // Non-fatal
      Logger.log("Failed to update lastLogin: " + e);
    }

    // Create server-side session ID and save via sessions sheet
    const sessionId = Utilities.getUuid();
    try {
      createSession(username, sessionId, browser || "", ipAddress || "");
    } catch (e) {
      Logger.log("Failed to create session: " + e);
    }

    // Build safe user payload (no password)
    const safeUser = {
      username: user.username,
      role: user.role || "user",
      namaLengkap: user.namaLengkap || user.username,
      status: user.status || "active",
      plant: user.plant || "ALL",
    };

    return { success: true, user: safeUser, sessionId: sessionId };
  } catch (error) {
    return { success: false, message: error.toString() };
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

      // Khusus untuk perta: parse items jika dalam format JSON string
      if (sheetName === "perta" && headers[j] === "items") {
        Logger.log("🔍 Perta items raw value: " + cellValue);
        Logger.log("🔍 Type: " + typeof cellValue);
        if (typeof cellValue === "string" && cellValue.trim() !== "") {
          try {
            cellValue = JSON.parse(cellValue);
            Logger.log(
              "✅ Parsed perta items successfully, length: " + cellValue.length
            );
          } catch (e) {
            Logger.log("❌ Error parsing perta items: " + e);
            cellValue = [{ item: "", deskripsi: "" }];
          }
        } else if (typeof cellValue !== "object") {
          cellValue = [{ item: "", deskripsi: "" }];
        }
      }

      // Khusus untuk trouble_record: parse arrays JSON
      if (
        sheetName === "trouble_record" &&
        (headers[j] === "dataKronologis" ||
          headers[j] === "pembahasan" ||
          headers[j] === "tindakanPerbaikan")
      ) {
        if (typeof cellValue === "string" && cellValue.startsWith("[")) {
          try {
            cellValue = JSON.parse(cellValue);
          } catch (e) {
            cellValue = [{ text: "" }];
          }
        } else if (typeof cellValue === "string" && cellValue) {
          cellValue = [{ text: cellValue }];
        } else if (!cellValue) {
          cellValue = [{ text: "" }];
        }
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
  let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Filter internal properties yang tidak perlu disimpan ke sheet
  // Exception: monthly_notes perlu menyimpan _plant karena shared sheet
  const internalProps = sheetName === "monthly_notes" ? ["__original"] : ["_plant", "__original"];
  const cleanedData = {};
  Object.keys(rowData || {}).forEach((key) => {
    if (!internalProps.includes(key)) {
      cleanedData[key] = rowData[key];
    }
  });

  // Pastikan header memuat semua field pada cleanedData (auto-extend kolom baru jika perlu)
  const keys = Object.keys(cleanedData);
  const missing = keys.filter((k) => headers.indexOf(k) === -1);
  if (missing.length > 0) {
    sheet
      .getRange(1, headers.length + 1, 1, missing.length)
      .setValues([missing]);
    headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  }

  // Generate ID unik berdasarkan timestamp dan random
  const uniqueId =
    new Date().getTime() + "_" + Math.random().toString(36).substr(2, 9);
  cleanedData.id = uniqueId;

  // Buat array values sesuai urutan header
  // PENTING: Gunakan hasOwnProperty untuk menangani nilai 0 dan false
  const values = headers.map((header) => {
    if (cleanedData.hasOwnProperty(header)) {
      const value =
        cleanedData[header] !== undefined && cleanedData[header] !== null
          ? cleanedData[header]
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
    Logger.log("[UPDATE ERROR] Sheet not found: " + sheetName);
    return { error: "Sheet not found: " + sheetName };
  }

  Logger.log(
    "[UPDATE] Sheet: " + sheetName + ", ID: " + (rowData.id || "no-id")
  );

  // Filter internal properties yang tidak perlu disimpan ke sheet
  // Exception: monthly_notes perlu menyimpan _plant karena shared sheet
  const internalProps = sheetName === "monthly_notes" ? ["__original"] : ["_plant", "__original"];
  const cleanedData = {};
  Object.keys(rowData || {}).forEach((key) => {
    if (!internalProps.includes(key)) {
      cleanedData[key] = rowData[key];
    }
  });

  let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  // Pastikan header memuat semua field pada cleanedData (auto-extend kolom baru jika perlu)
  const keys = Object.keys(cleanedData);
  const missing = keys.filter((k) => headers.indexOf(k) === -1);
  if (missing.length > 0) {
    sheet
      .getRange(1, headers.length + 1, 1, missing.length)
      .setValues([missing]);
    headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  }
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  // Cari row yang cocok berdasarkan ID unik
  let rowIndex = -1;
  const idColIndex = headers.indexOf("id");

  // Jika ada ID, gunakan ID untuk pencarian (lebih akurat)
  if (idColIndex !== -1 && cleanedData.id) {
    Logger.log("[UPDATE] Searching by ID: " + cleanedData.id);
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][idColIndex]) === String(cleanedData.id)) {
        rowIndex = i;
        Logger.log("[UPDATE] Found by ID at row: " + (i + 1));
        break;
      }
    }
  }

  // Fallback: jika tidak ada ID atau tidak ditemukan, cari dengan multi-field matching
  if (rowIndex === -1) {
    Logger.log("[UPDATE] ID not found, trying multi-field matching");

    // Gunakan __original dari rowData asli untuk matching jika ada
    const originalData = rowData.__original || cleanedData;
    Logger.log(
      "[UPDATE] Using original data for matching: " +
        JSON.stringify(originalData)
    );

    for (let i = 1; i < values.length; i++) {
      let isMatch = true;
      let matchedFields = [];

      // Cek beberapa field penting untuk matching
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const cellValue = values[i][j];
        // Gunakan originalData untuk pencarian
        let compareValue = originalData[header];

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
  if (idColIndex !== -1 && (!cleanedData.id || cleanedData.id === "")) {
    cleanedData.id =
      new Date().getTime() + "_" + Math.random().toString(36).substr(2, 9);
    Logger.log(
      "[UPDATE] Assigned new legacy id: " +
        cleanedData.id +
        " at row " +
        (rowIndex + 1)
    );
  }

  // Update row - gunakan hasOwnProperty untuk check, bukan just ||
  const updateValues = headers.map((header) => {
    // Jika cleanedData memiliki property ini (bahkan jika nilainya 0 atau false), gunakan nilai baru
    if (cleanedData.hasOwnProperty(header)) {
      const value =
        cleanedData[header] !== undefined && cleanedData[header] !== null
          ? cleanedData[header]
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
    "[UPDATE] Updating row " + (rowIndex + 1) + " in sheet: " + sheetName
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

  Logger.log(
    "[UPDATE SUCCESS] Row " + (rowIndex + 1) + " updated in " + sheetName
  );
  return {
    success: true,
    message: "Data berhasil diupdate",
    rowUpdated: rowIndex + 1,
    updatedData: cleanedData,
  };
}

// Fungsi untuk delete data
function deleteData(sheetName, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("[DELETE ERROR] Sheet not found: " + sheetName);
    return { error: "Sheet not found: " + sheetName };
  }

  Logger.log(
    "[DELETE] Sheet: " + sheetName + ", ID: " + (rowData.id || "no-id")
  );

  // Filter internal properties
  const internalProps = ["_plant", "__original"];
  const cleanedData = {};
  Object.keys(rowData || {}).forEach((key) => {
    if (!internalProps.includes(key)) {
      cleanedData[key] = rowData[key];
    }
  });

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  // Cari row yang cocok berdasarkan ID unik
  let rowIndex = -1;
  const idColIndex = headers.indexOf("id");

  // Jika ada ID, gunakan ID untuk pencarian (lebih akurat)
  if (idColIndex !== -1 && cleanedData.id) {
    Logger.log("[DELETE] Searching for ID: " + cleanedData.id);
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][idColIndex]) === String(cleanedData.id)) {
        rowIndex = i;
        Logger.log("[DELETE] Found row by ID at: " + (i + 1));
        break;
      }
    }
  }

  // Fallback: jika tidak ada ID atau tidak ditemukan, cari dengan multi-field matching
  if (rowIndex === -1) {
    Logger.log("[DELETE] ID not found, trying multi-field matching");

    // Gunakan __original dari rowData asli untuk matching jika ada
    const originalData = rowData.__original || cleanedData;
    Logger.log(
      "[DELETE] Using data for matching: " + JSON.stringify(originalData)
    );

    for (let i = 1; i < values.length; i++) {
      let isMatch = true;
      let matchedFields = [];

      // Cek beberapa field penting untuk matching
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const cellValue = values[i][j];
        // Gunakan originalData untuk pencarian
        let compareValue = originalData[header];

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
  Logger.log(
    "[DELETE] Deleting row " + (rowIndex + 1) + " from sheet: " + sheetName
  );
  sheet.deleteRow(rowIndex + 1);
  Logger.log(
    "[DELETE SUCCESS] Row " + (rowIndex + 1) + " deleted from " + sheetName
  );

  return {
    success: true,
    message: "Data berhasil dihapus",
    rowDeleted: rowIndex + 1,
    deletedData: cleanedData,
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
    rkap: ["id", "tahun", "bulan", "targetRKAP"],
    perta: ["id", "tanggalMulai", "tanggalSelesai", "items"],
    trouble_record: [
      "id",
      "nomorBerkas",
      "tanggalKejadian",
      "kodePeralatan",
      "deskripsiMasalah",
      "dataKronologis",
      "pembahasan",
      "tindakanPerbaikan",
      "catatan",
      "status",
      "tanggalSelesai",
      "catatanPenyelesaian",
    ],
    users: [
      "id",
      "username",
      "password",
      "role",
      "namaLengkap",
      "status",
      "createdAt",
      "lastLogin",
    ],
    approval_requests: [
      "id",
      "requestBy",
      "requestByName",
      "sheetType",
      "action",
      "dataId",
      "dataPreview",
      "reason",
      "status",
      "requestDate",
      "reviewBy",
      "reviewDate",
      "reviewNotes",
      "oldData",
      "newData",
    ],
    monthly_notes: ["id", "bulan", "tahun", "catatan", "_plant"],
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
    perta: "id",
    trouble_record: "nomorBerkas",
    users: "username",
    approval_requests: "id",
    monthly_notes: "id",
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
function createSession(username, sessionId, browser, ipAddress) {
  console.log("[GAS] createSession called with:", {
    username: username,
    sessionId: sessionId,
    browser: browser,
    ipAddress: ipAddress,
  });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("sessions");

  if (!sheet) {
    sheet = ss.insertSheet("sessions");
    sheet.appendRow(["Username", "Session ID", "Timestamp", "Browser", "IP"]);
  }

  // Delete any existing session for this user
  deleteSession(username);

  // Create new session with received data
  const timestamp = new Date();
  const browserInfo = browser || "Not Detected";
  const ipInfo = ipAddress || "Not Detected";

  console.log("[GAS] Saving session data:", {
    browserInfo: browserInfo,
    ipInfo: ipInfo,
  });

  sheet.appendRow([username, sessionId, timestamp, browserInfo, ipInfo]);

  return {
    success: true,
    message: "Session created",
    sessionId: sessionId,
  };
}

/**
 * Update existing session timestamp (keep-alive)
 */
function updateSession(username, sessionId, browser, ipAddress) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("sessions");

  if (!sheet) {
    return { success: false, message: "Sessions sheet not found" };
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === sessionId) {
      // Update timestamp, browser, and IP
      sheet.getRange(i + 1, 3).setValue(new Date());
      if (browser) sheet.getRange(i + 1, 4).setValue(browser);
      if (ipAddress) sheet.getRange(i + 1, 5).setValue(ipAddress);
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

/**
 * Get all chat messages
 */
function getChatMessages() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("chat_messages");

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("chat_messages");
    sheet.appendRow(["ID", "Sender", "Role", "Message", "Timestamp"]);
    // Format header
    const headerRange = sheet.getRange("A1:E1");
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a5568");
    headerRange.setFontColor("#ffffff");
    return { success: true, data: [] };
  }

  // Check if sheet has header
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    sheet.appendRow(["ID", "Sender", "Role", "Message", "Timestamp"]);
    const headerRange = sheet.getRange("A1:E1");
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a5568");
    headerRange.setFontColor("#ffffff");
    return { success: true, data: [] };
  }

  const data = sheet.getDataRange().getValues();
  const messages = [];

  // Start from row 2 (skip header)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) {
      // Only add if ID exists
      messages.push({
        id: data[i][0].toString(),
        sender: data[i][1],
        role: data[i][2],
        message: data[i][3],
        timestamp: data[i][4],
      });
    }
  }

  return { success: true, data: messages };
}

/**
 * Add new chat message
 */
function addChatMessage(messageData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("chat_messages");

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("chat_messages");
    sheet.appendRow(["ID", "Sender", "Role", "Message", "Timestamp"]);
    // Format header
    const headerRange = sheet.getRange("A1:E1");
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a5568");
    headerRange.setFontColor("#ffffff");
  }

  // Check if row 1 has proper header
  const firstRow = sheet.getRange("A1:E1").getValues()[0];
  if (firstRow[0] !== "ID" || firstRow[1] !== "Sender") {
    // No proper header, insert one at the top
    sheet.insertRowBefore(1);
    sheet
      .getRange("A1:E1")
      .setValues([["ID", "Sender", "Role", "Message", "Timestamp"]]);
    const headerRange = sheet.getRange("A1:E1");
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a5568");
    headerRange.setFontColor("#ffffff");
  }

  const id = new Date().getTime().toString();
  const timestamp = new Date();

  sheet.appendRow([
    id,
    messageData.sender,
    messageData.role,
    messageData.message,
    timestamp,
  ]);

  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, 5);

  return { success: true, message: "Chat message added", id: id };
}

/**
 * Fix chat_messages sheet - Add header if missing
 * Run this once manually if your sheet doesn't have header
 */
function fixChatMessagesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("chat_messages");

  if (!sheet) {
    Logger.log("Sheet chat_messages not found");
    return;
  }

  // Check if row 1 has proper header
  const firstRow = sheet.getRange("A1:E1").getValues()[0];
  if (firstRow[0] !== "ID" || firstRow[1] !== "Sender") {
    // Insert header at the top
    sheet.insertRowBefore(1);
    sheet
      .getRange("A1:E1")
      .setValues([["ID", "Sender", "Role", "Message", "Timestamp"]]);
    const headerRange = sheet.getRange("A1:E1");
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a5568");
    headerRange.setFontColor("#ffffff");
    sheet.autoResizeColumns(1, 5);
    Logger.log("Header added successfully!");
  } else {
    Logger.log("Header already exists");
  }
}

// ===== TROUBLE RECORD FUNCTIONS =====

/**
 * Create or get trouble_record sheet with proper structure
 */
function getTroubleRecordSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("trouble_record");

  if (!sheet) {
    sheet = ss.insertSheet("trouble_record");

    // Set header
    sheet
      .getRange("A1:L1")
      .setValues([
        [
          "ID",
          "Nomor Berkas",
          "Tanggal Kejadian",
          "Kode Peralatan",
          "Deskripsi Masalah",
          "Data Kronologis",
          "Pembahasan",
          "Tindakan Perbaikan",
          "Catatan",
          "Status",
          "Tanggal Selesai",
          "Catatan Penyelesaian",
        ],
      ]);

    // Format header
    sheet
      .getRange("A1:L1")
      .setBackground("#00B4D8")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 12);
  }

  return sheet;
}

/**
 * Get all trouble records from sheet
 */
function getTroubleRecordData() {
  try {
    const sheet = getTroubleRecordSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return { success: true, data: [] };
    }

    const headers = data[0];
    const rows = data.slice(1);

    const result = rows
      .filter((row) => row[0]) // Filter rows yang ada ID-nya
      .map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          let value = row[index];

          // Handle tanggal
          if (
            (header === "Tanggal Kejadian" || header === "Tanggal Selesai") &&
            value
          ) {
            if (value instanceof Date) {
              value = Utilities.formatDate(
                value,
                Session.getScriptTimeZone(),
                "yyyy-MM-dd"
              );
            }
          }

          // Parse JSON strings untuk arrays
          if (
            (header === "Data Kronologis" ||
              header === "Pembahasan" ||
              header === "Tindakan Perbaikan") &&
            value
          ) {
            if (typeof value === "string" && value.startsWith("[")) {
              try {
                value = JSON.parse(value);
              } catch (e) {
                value = [{ text: value }];
              }
            } else if (typeof value === "string") {
              value = [{ text: value }];
            }
          }

          const key =
            header === "ID"
              ? "id"
              : header === "Nomor Berkas"
              ? "nomorBerkas"
              : header === "Tanggal Kejadian"
              ? "tanggalKejadian"
              : header === "Kode Peralatan"
              ? "kodePeralatan"
              : header === "Deskripsi Masalah"
              ? "deskripsiMasalah"
              : header === "Data Kronologis"
              ? "dataKronologis"
              : header === "Pembahasan"
              ? "pembahasan"
              : header === "Tindakan Perbaikan"
              ? "tindakanPerbaikan"
              : header === "Catatan"
              ? "catatan"
              : header === "Status"
              ? "status"
              : header === "Tanggal Selesai"
              ? "tanggalSelesai"
              : header === "Catatan Penyelesaian"
              ? "catatanPenyelesaian"
              : header;

          obj[key] = value;
        });
        return obj;
      });

    return { success: true, data: result };
  } catch (error) {
    Logger.log("Error getting trouble_record data: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Save new trouble record
 */
function saveTroubleRecordData(data) {
  try {
    const sheet = getTroubleRecordSheet();
    const id = Utilities.getUuid();
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;

    // Format tanggal
    let tanggalKejadian = data.tanggalKejadian;
    if (tanggalKejadian && typeof tanggalKejadian === "string") {
      tanggalKejadian = new Date(tanggalKejadian);
    }

    let tanggalSelesai = data.tanggalSelesai || "";
    if (tanggalSelesai && typeof tanggalSelesai === "string") {
      tanggalSelesai = new Date(tanggalSelesai);
    }

    // Set values
    sheet
      .getRange(newRow, 1, 1, 12)
      .setValues([
        [
          id,
          data.nomorBerkas || "",
          tanggalKejadian,
          data.kodePeralatan || "",
          data.deskripsiMasalah || "",
          data.dataKronologis || "[]",
          data.pembahasan || "[]",
          data.tindakanPerbaikan || "[]",
          data.catatan || "",
          data.status || "Open",
          tanggalSelesai,
          data.catatanPenyelesaian || "",
        ],
      ]);

    // Format tanggal columns
    sheet.getRange(newRow, 3).setNumberFormat("dd/MM/yyyy");
    if (tanggalSelesai) {
      sheet.getRange(newRow, 11).setNumberFormat("dd/MM/yyyy");
    }

    // Auto resize columns
    sheet.autoResizeColumns(1, 12);

    return { success: true, id: id };
  } catch (error) {
    Logger.log("Error saving trouble_record data: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Update existing trouble record
 */
function updateTroubleRecordData(data) {
  try {
    const sheet = getTroubleRecordSheet();
    const allData = sheet.getDataRange().getValues();
    const headers = allData[0];
    const idIndex = headers.indexOf("ID");

    let rowIndex = -1;
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][idIndex] === data.id) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex === -1) {
      return { success: false, error: "Data tidak ditemukan" };
    }

    // Format tanggal
    let tanggalKejadian = data.tanggalKejadian;
    if (tanggalKejadian && typeof tanggalKejadian === "string") {
      tanggalKejadian = new Date(tanggalKejadian);
    }

    let tanggalSelesai = data.tanggalSelesai || "";
    if (tanggalSelesai && typeof tanggalSelesai === "string") {
      tanggalSelesai = new Date(tanggalSelesai);
    }

    // Update row
    sheet
      .getRange(rowIndex, 1, 1, 12)
      .setValues([
        [
          data.id,
          data.nomorBerkas || "",
          tanggalKejadian,
          data.kodePeralatan || "",
          data.deskripsiMasalah || "",
          data.dataKronologis || "[]",
          data.pembahasan || "[]",
          data.tindakanPerbaikan || "[]",
          data.catatan || "",
          data.status || "Open",
          tanggalSelesai,
          data.catatanPenyelesaian || "",
        ],
      ]);

    // Format tanggal columns
    sheet.getRange(rowIndex, 3).setNumberFormat("dd/MM/yyyy");
    if (tanggalSelesai) {
      sheet.getRange(rowIndex, 11).setNumberFormat("dd/MM/yyyy");
    }

    return { success: true };
  } catch (error) {
    Logger.log("Error updating trouble_record data: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Delete trouble record
 */
function deleteTroubleRecordData(data) {
  try {
    const sheet = getTroubleRecordSheet();
    const allData = sheet.getDataRange().getValues();
    const headers = allData[0];
    const idIndex = headers.indexOf("ID");

    let rowIndex = -1;
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][idIndex] === data.id) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex === -1) {
      return { success: false, error: "Data tidak ditemukan" };
    }

    sheet.deleteRow(rowIndex);

    return { success: true };
  } catch (error) {
    Logger.log("Error deleting trouble_record data: " + error.toString());
    return { success: false, error: error.toString() };
  }
}
