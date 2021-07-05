import { RankMachine } from "../src/services/RankMachine";
import { DataProvider } from "../src/types/DataProvider";
import { RankStrategy } from "../src/types/RankStrategy";

describe("RankMachine", () => {
  test("instantiating", () => {
    const machine = new RankMachine({} as RankStrategy);
    expect(machine).toBeInstanceOf(RankMachine);
  });

  test("Ranking", async () => {
    const strategy = {
      score: jest.fn().mockResolvedValue(100),
    } as unknown as RankStrategy;

    const machine = new RankMachine(strategy);
    const rank = await machine.score({} as DataProvider);

    expect(rank).toBe(100);
    expect(strategy.score).toBeCalled();
  });
});
