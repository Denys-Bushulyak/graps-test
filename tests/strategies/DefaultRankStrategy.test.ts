import { DefaultRankStrategy } from "../../src/services/strategies/DefaultRankStrategy";
import { SearchRateService } from "../../src/types/SearchRateService";

describe("DefaultRankStrategy", () => {
  test("instantiating", () => {
    const strategy = new DefaultRankStrategy({} as SearchRateService);
    expect(strategy).toBeInstanceOf(DefaultRankStrategy);
  });

  describe("subscribers", () => {
    test.each([
      [-100, 0],
      [500000, 1],
      [1500000, 2],
      [5000001, 3],
    ])("%s", async (subscribers, expected) => {
      const strategy = new DefaultRankStrategy({
        find: () => {
          return Promise.resolve({
            keyword: "crochet toys",
            searches: [-1],
          });
        },
      });
      const result = await strategy.score({
        name: "Amigurumi",
        commentsPerHour: 1.375,
        subscribers: [subscribers - subscribers / 2, subscribers],
        messages: [400, -200],
        topKeywords: [
          ["crocheting", 5260.019425520162],
          ["crochet", 3255.281629764316],
          ["ravelry", 2165.8903516847727],
          ["snowman", 928.2387221506169],
          ["pica", 773.5322684588473],
          ["yarn", 700.5575261514089],
          ["keychains", 515.6881789725649],
          ["jellyfish", 455.0189814463808],
          ["canisters", 442.01843911934134],
          ["pau", 412.5505431780519],
        ],
      });
      expect(result).toBe(expected);
    });
  });

  describe("messages", () => {
    test.each([
      [-100, 0],
      [1000, 1],
      [50000, 2],
      [50002, 3],
    ])("%s", async (messages, expected) => {
      const strategy = new DefaultRankStrategy({
        find: () => {
          return Promise.resolve({
            keyword: "crochet toys",
            searches: [-1],
          });
        },
      });
      const result = await strategy.score({
        name: "Amigurumi",
        commentsPerHour: 1.375,
        subscribers: [-1],
        messages: [messages],
        topKeywords: [
          ["crocheting", 5260.019425520162],
          ["crochet", 3255.281629764316],
          ["ravelry", 2165.8903516847727],
          ["snowman", 928.2387221506169],
          ["pica", 773.5322684588473],
          ["yarn", 700.5575261514089],
          ["keychains", 515.6881789725649],
          ["jellyfish", 455.0189814463808],
          ["canisters", 442.01843911934134],
          ["pau", 412.5505431780519],
        ],
      });
      expect(result).toBe(expected);
    });
  });

  describe("searches & avarage", () => {
    test.each([
      [-100, 0],
      [10000, 4],
      [20000, 8],
      [60000, 12],
    ])("%s", async (searches, expected) => {
      const strategy = new DefaultRankStrategy({
        find: () => {
          return Promise.resolve({
            keyword: "crochet toys",
            searches: [searches, searches],
          });
        },
      });
      const result = await strategy.score({
        name: "Amigurumi",
        commentsPerHour: 1.375,
        subscribers: [-1],
        messages: [-1],
        topKeywords: [
          ["crocheting", 5260.019425520162],
          ["crochet", 3255.281629764316],
          ["ravelry", 2165.8903516847727],
          ["snowman", 928.2387221506169],
          ["pica", 773.5322684588473],
          ["yarn", 700.5575261514089],
          ["keychains", 515.6881789725649],
          ["jellyfish", 455.0189814463808],
          ["canisters", 442.01843911934134],
          ["pau", 412.5505431780519],
        ],
      });
      expect(result).toBe(expected);
    });
  });
});
