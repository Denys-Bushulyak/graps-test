import { SearchRateService } from "../types/SearchRateService";
import { DataFetcher } from "./DataFetcher";

export type GoogleIncomingData = {
  keyword: string;
  searchesCountTime: ReadonlyArray<number>;
};

export interface GoogleFindResultData {
  keyword: string;
  searches: ReadonlyArray<number>;
}

/**
 * Service return searches count time
 */
export class GoogleSearchCounterService implements SearchRateService {
  constructor(
    private readonly fetcher: DataFetcher<Array<GoogleIncomingData>>
  ) {}

  async find(keyword: string): Promise<GoogleFindResultData | null> {
    const data = await this.fetcher.getData();

    let result = data
      .filter((item) => item.keyword.includes(keyword))
      .sort((a, b) => b.keyword.length - a.keyword.length)?.[0];

    if (result) {
      return {
        keyword: result.keyword,
        searches: result.searchesCountTime,
      };
    }

    return null;
  }
}
