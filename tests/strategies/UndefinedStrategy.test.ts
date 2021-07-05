import { UndefinedStrategy } from "../../src/services/strategies/UndefinedStrategy";
import { DataItem } from "../../src/types/DataItem";

describe("UndefinedStrategy", () => {
  test("instantiating", () => {
    const strategy = new UndefinedStrategy();
    expect(strategy).toBeInstanceOf(UndefinedStrategy);
  });

  test("score", async () => {
    const strategy = new UndefinedStrategy();
    const result = await strategy.score({} as DataItem);
    expect(result).toBe(0);
  });
});
