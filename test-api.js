// Test API Endpoints untuk NPK Production App
// Gunakan di browser console atau Postman

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwURvYXyBD0-SrqomO4eNbE16-KtdD1g6e8G0LLIZA0_nb_jkz9FHDp_SPA1r57vkVE/exec";

// ========================================
// TEST 1: READ DATA (GET)
// ========================================
async function testReadData(sheetName) {
  try {
    const response = await fetch(
      `${WEBHOOK_URL}?action=read&sheet=${sheetName}`
    );
    const data = await response.json();
    console.log(`✅ Data dari ${sheetName}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error reading ${sheetName}:`, error);
  }
}

// Test read semua sheet
async function testReadAllSheets() {
  const sheets = [
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
  ];

  for (const sheet of sheets) {
    await testReadData(sheet);
  }
}

// ========================================
// TEST LOGIN (POST)
// ========================================
async function testLogin(username, password) {
  try {
    const payload = {
      action: "login",
      username,
      password,
      browser: "Automated-Test",
      ipAddress: "0.0.0.0",
    };
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log("✅ Login response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error login:", error);
  }
}

// ========================================
// TEST 2: CREATE DATA (POST)
// ========================================

// Test create Produksi NPK
async function testCreateProduksiNPK() {
  const data = {
    action: "create",
    sheet: "produksi_npk",
    data: {
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
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("✅ Create Produksi NPK:", result);
    return result;
  } catch (error) {
    console.error("❌ Error create Produksi NPK:", error);
  }
}

// Test create Produksi Blending
async function testCreateProduksiBlending() {
  const data = {
    action: "create",
    sheet: "produksi_blending",
    data: {
      tanggal: "2025-11-15",
      kategori: "Fresh",
      formula: "NPK 15-15-15",
      tonase: 50.5,
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("✅ Create Produksi Blending:", result);
    return result;
  } catch (error) {
    console.error("❌ Error create Produksi Blending:", error);
  }
}

// Test create Timesheet Forklift
async function testCreateTimesheetForklift() {
  const data = {
    action: "create",
    sheet: "timesheet_forklift",
    data: {
      tanggal: "2025-11-15",
      forklift: "F19",
      deskripsiTemuan: "Ban bocor",
      jamOff: "8.5",
      jamStart: "10.5",
      jamGrounded: 2,
      jamOperasi: 18,
      keterangan: "OK",
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("✅ Create Timesheet Forklift:", result);
    return result;
  } catch (error) {
    console.error("❌ Error create Timesheet Forklift:", error);
  }
}

// Test create RKAP
async function testCreateRKAP() {
  const data = {
    action: "create",
    sheet: "rkap",
    data: {
      bulan: "November",
      targetRKAP: 10000,
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("✅ Create RKAP:", result);
    return result;
  } catch (error) {
    console.error("❌ Error create RKAP:", error);
  }
}

// ========================================
// TEST 3: UPDATE DATA (POST)
// ========================================
async function testUpdateProduksiNPK() {
  const data = {
    action: "update",
    sheet: "produksi_npk",
    data: {
      tanggal: "2025-11-15",
      shiftMalamOnspek: 120, // Updated value
      shiftMalamOffspek: 8,
      shiftPagiOnspek: 115,
      shiftPagiOffspek: 10,
      shiftSoreOnspek: 110,
      shiftSoreOffspek: 9,
      totalOnspek: 345,
      totalOffspek: 27,
      total: 372,
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("✅ Update Produksi NPK:", result);
    return result;
  } catch (error) {
    console.error("❌ Error update Produksi NPK:", error);
  }
}

// ========================================
// TEST 4: DELETE DATA (POST)
// ========================================
async function testDeleteProduksiNPK() {
  const data = {
    action: "delete",
    sheet: "produksi_npk",
    data: {
      tanggal: "2025-11-15",
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("✅ Delete Produksi NPK:", result);
    return result;
  } catch (error) {
    console.error("❌ Error delete Produksi NPK:", error);
  }
}

// ========================================
// RUN ALL TESTS
// ========================================
async function runAllTests() {
  console.log("🚀 Starting API Tests...\n");

  // Test 1: Create data
  console.log("📝 TEST 1: CREATE DATA");
  await testCreateProduksiNPK();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s

  await testCreateProduksiBlending();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await testCreateTimesheetForklift();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await testCreateRKAP();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Test 2: Read data
  console.log("\n📖 TEST 2: READ DATA");
  await testReadData("produksi_npk");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await testReadData("produksi_blending");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await testReadData("rkap");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Test 3: Update data
  console.log("\n✏️ TEST 3: UPDATE DATA");
  await testUpdateProduksiNPK();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Test 4: Read after update
  console.log("\n📖 TEST 4: READ AFTER UPDATE");
  await testReadData("produksi_npk");

  console.log("\n✅ All tests completed!");
}

// ========================================
// QUICK TEST FUNCTIONS
// ========================================

// Copy paste di browser console untuk test cepat:

/*
// Test READ
testReadData('produksi_npk');

// Test CREATE
testCreateProduksiNPK();

// Test READ ALL
testReadAllSheets();

// Test UPDATE
testUpdateProduksiNPK();

// Test DELETE
testDeleteProduksiNPK();

// Run all tests
runAllTests();
*/

// Export functions untuk digunakan
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    testReadData,
    testReadAllSheets,
    testLogin,
    testCreateProduksiNPK,
    testCreateProduksiBlending,
    testCreateTimesheetForklift,
    testCreateRKAP,
    testUpdateProduksiNPK,
    testDeleteProduksiNPK,
    runAllTests,
  };
}
