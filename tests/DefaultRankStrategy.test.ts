import { DataFetcher } from "../src/services/DataFetcher";
import { DefaultRankStrategy } from "../src/services/DefaultRankStrategy";
import { RedditDataProvider } from "../src/services/RedditDataProvider";
import { SearchRateService } from "../src/types/SearchRateService";

const redditJSON = require("./data/reddit-data.json");

describe("DefaultRankStrategy", () => {
  test("instantiating", () => {
    const strategy = new DefaultRankStrategy({} as SearchRateService);
    expect(strategy).toBeInstanceOf(DefaultRankStrategy);
  });

  test("", async () => {
    const mockDataFetcher: DataFetcher = {
      url: "http://example.com",
      async getData() {
        return Promise.resolve(redditJSON);
      },
    };

    const strategy = new DefaultRankStrategy({
      getSearchesAvgScore: () => Promise.resolve(1),
      getSearchesScore: () => Promise.resolve(2),
    });
    const result = await strategy.score(
      new RedditDataProvider(mockDataFetcher)
    );

    expect(result[0].finalScore).toBe(6);
    expect(result[1].finalScore).toBe(7);
  });
});
