export interface SearchRateService {
  getSearchesScore(name: string): Promise<number>;

  getSearchesAvgScore(name: string): Promise<number>;
}
