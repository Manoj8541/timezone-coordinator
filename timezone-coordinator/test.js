// Import your real logic if needed later
// For now simple testable logic

function calculatePain(hour) {
  if (hour >= 9 && hour <= 16) return 0;
  if (hour === 8 || (hour >= 17 && hour <= 19)) return 10;
  return 50;
}

// Test runner
function runTests() {
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log("✅ " + name);
      passed++;
    } catch (e) {
      console.error("❌ " + name, e.message);
      failed++;
    }
  }

  // Tests
  test("Work hour should be 0", () => {
    if (calculatePain(10) !== 0) throw new Error("Expected 0");
  });

  test("Night hour should be 50", () => {
    if (calculatePain(22) !== 50) throw new Error("Expected 50");
  });

  test("Edge hour should be 10", () => {
    if (calculatePain(8) !== 10) throw new Error("Expected 10");
  });

  console.log("\nResult:");
  console.log("Passed:", passed);
  console.log("Failed:", failed);

  if (failed > 0) {
    throw new Error("Some tests failed");
  }
}

// Run automatically
runTests();