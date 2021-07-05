import { DataItem } from "../types/DataItem";
import { DataProvider } from "../types/DataProvider";
import { DataFetcher } from "./DataFetcher";

export type RedditIncomingData = {
  name: string;
  commentsPerHour: number;
  subscriberCountTimeSeries: ReadonlyArray<number>;
  commentsPerHourTimeSeries: ReadonlyArray<number>;
  topKeywords: ReadonlyArray<[string, number]>;
};

export class RedditDataProvider implements DataProvider<DataItem> {
  constructor(
    private readonly fetcher: DataFetcher<Array<RedditIncomingData>>
  ) {}

  public async getData() {
    const items = await this.fetcher.getData();

    return items.map<DataItem>((item) => ({
      name: item.name,
      commentsPerHour: item.commentsPerHour,
      topKeywords: item.topKeywords,
      subscribers: item.subscriberCountTimeSeries,
      messages: item.commentsPerHourTimeSeries,
    }));
  }
}
