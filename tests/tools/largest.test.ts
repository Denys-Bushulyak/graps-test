import { largest } from "../../src/tools/largest";

test.each([
  [1, 2, 2],
  [-1, 0, 0],
  [2, 1, 2],
  [0, 0, 0],
  [-2, -1, -1],
])("largest between %s and %s is %s", (a, b, expected) => {
  expect(largest(a, b)).toBe(expected);
});
