function applyMembershipDiscount(listPrice, discountPercent) {
  if (listPrice <= 0 || discountPercent <= 0) return listPrice;
  const discounted = listPrice * (1 - discountPercent / 100);
  return Math.round(discounted * 100) / 100;
}

const cases = [
  { list: 10, pct: 0, expected: 10 },
  { list: 10, pct: 5, expected: 9.5 },
  { list: 10, pct: 10, expected: 9 },
  { list: 19.99, pct: 5, expected: 18.99 },
];

let passed = 0;

for (const testCase of cases) {
  const result = applyMembershipDiscount(testCase.list, testCase.pct);
  if (result !== testCase.expected) {
    console.error(
      `FAIL ${testCase.list} @ ${testCase.pct}% => ${result}, expected ${testCase.expected}`,
    );
    process.exit(1);
  }
  passed += 1;
}

console.log(`${passed}/${passed} shop pricing checks passed`);
