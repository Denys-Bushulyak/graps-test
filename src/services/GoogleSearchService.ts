import { SearchRateService } from "../types/SearchRateService";
import { DataFetcher } from "./DataFetcher";

export class GoogleSearchService implements SearchRateService {
  constructor(
    private readonly fetcher: DataFetcher<
      Array<{
        keyword: string;
        searchesCountTime: ReadonlyArray<number>;
      }>
    >
  ) {}

  private static getScoreByValue(searchesAvgValue: number) {
    if (0 <= searchesAvgValue && searchesAvgValue <= 10000) {
      return 2;
    }
    if (10001 <= searchesAvgValue && searchesAvgValue <= 50000) {
      return 4;
    }
    if (50001 <= searchesAvgValue) {
      return 6;
    }

    return 0;
  }

  public async getSearchesAvgScore(name: string) {
    const searchResult = await this.find(name);

    if (!searchResult) {
      return 0;
    }

    const totalItems: number = searchResult.searchesCountTime.length;
    const searchesAvgValue =
      searchResult.searchesCountTime.reduce((last, curr) => last + curr, 0) /
      totalItems;

    return GoogleSearchService.getScoreByValue(searchesAvgValue);
  }

  public async getSearchesScore(name: string) {
    const searchResult = await this.find(name);

    if (!searchResult) {
      return 0;
    }

    const lastIndex: number = searchResult.searchesCountTime.length - 1;
    const lastSearchesValue = searchResult.searchesCountTime[lastIndex];

    return GoogleSearchService.getScoreByValue(lastSearchesValue);
  }

  private async find(name: string) {
    const data = await this.fetcher.getData();
    return data
      .filter((item) => item.keyword.includes(name))
      .sort((a, b) => b.keyword.length - a.keyword.length)[0];
  }
}
