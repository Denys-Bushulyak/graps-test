import { ScoreAppendService } from "../src/services/ScoreAppendService";
import { DefaultRankStrategy } from "../src/services/strategies/DefaultRankStrategy";
import { UndefinedStrategy } from "../src/services/strategies/UndefinedStrategy";
import { DataItem } from "../src/types/DataItem";
import { ScoreStrategy } from "../src/types/ScoreStrategy";
import { SearchRateService } from "../src/types/SearchRateService";

const json = require("./data/google-data.json");

describe("ScoreAppendService", () => {
  test("instantiating", () => {
    const service = new ScoreAppendService({} as ScoreStrategy);
    expect(service).toBeInstanceOf(ScoreAppendService);
  });

  test("score", async () => {
    const strategy = {
      score: jest.fn().mockReturnValueOnce(100).mockReturnValueOnce(200),
    } as unknown as ScoreStrategy;

    const service = new ScoreAppendService(strategy);
    const rank = await service.score({
      getData(): Promise<Array<DataItem>> {
        return json;
      },
    });

    expect(rank).toEqual([
      {
        finalScore: 100,
      },
      {
        finalScore: 200,
      },
    ]);
    expect(strategy.score).toBeCalled();
  });

  test("scoring empty items", async () => {
    const strategy = {
      score: jest.fn(),
    } as unknown as ScoreStrategy;

    const service = new ScoreAppendService(strategy);
    const rank = await service.score({
      getData(): Promise<Array<DataItem>> {
        return Promise.resolve([]);
      },
    });

    expect(rank).toHaveLength(0);
    expect(strategy.score).not.toBeCalled();
  });

  test("change strategy", () => {
    const service = new ScoreAppendService(
      new DefaultRankStrategy({} as SearchRateService)
    );
    expect(service.strategy).toBeInstanceOf(DefaultRankStrategy);

    service.strategy = new UndefinedStrategy();
    expect(service.strategy).toBeInstanceOf(UndefinedStrategy);
  });
});
