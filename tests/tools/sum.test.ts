import { sum } from "../../src/tools/sum";

test.each([
  [1, 2, 3],
  [-1, 0, -1],
  [-1, -1, -2],
  [-1, 1, 0],
])("sum %s + %s", (a, b, expected) => {
  expect(sum(a, b)).toBe(expected);
});
