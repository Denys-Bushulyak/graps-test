import { DataProvider } from "../types/DataProvider";
import { DataFetcher } from "./DataFetcher";

export interface RedditData {
  name: string;
  commentsPerHour: number;
  subscribers: ReadonlyArray<number>;
  messages: ReadonlyArray<number>;
  topKeywords: ReadonlyArray<[string, number]>;
}

export class RedditDataProvider implements DataProvider<RedditData> {
  constructor(
    private readonly fetcher: DataFetcher<
      Array<{
        name: string;
        commentsPerHour: number;
        subscriberCountTimeSeries: ReadonlyArray<number>;
        commentsPerHourTimeSeries: ReadonlyArray<number>;
        topKeywords: ReadonlyArray<[string, number]>;
      }>
    >
  ) {}

  public async getData() {
    const items = await this.fetcher.getData();

    return items.map((item) => ({
      ...item,
      subscribers: item.subscriberCountTimeSeries,
      messages: item.commentsPerHourTimeSeries,
    }));
  }
}
