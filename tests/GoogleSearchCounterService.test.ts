import { DataFetcher } from "../src/services/DataFetcher";
import { GoogleSearchCounterService } from "../src/services/GoogleSearchCounterService";

const json = require("./data/google-data.json");

describe("GoogleSearchCounterService", () => {
  test("instantiating", () => {
    const instance = new GoogleSearchCounterService({} as DataFetcher);
    expect(instance).toBeInstanceOf(GoogleSearchCounterService);
  });

  test("find existed value", async () => {
    const instance = new GoogleSearchCounterService({
      async getData(): Promise<[] | any> {
        return json;
      },
    } as DataFetcher);

    const actual = await instance.find("toys");
    expect(actual).toEqual({
      keyword: "crochet toys",
      searches: [
        6600, 5400, 5400, 5400, 5400, 5400, 6600, 6600, 6600, 8100, 6600, 6600,
      ],
    });
  });

  test("find absent value", async () => {
    const instance = new GoogleSearchCounterService({
      async getData(): Promise<[] | any> {
        return json;
      },
    } as DataFetcher);

    const actual = await instance.find("not exists");
    expect(actual).toBeNull();
  });
});
