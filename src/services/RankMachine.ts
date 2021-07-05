import { DataProvider } from "../types/DataProvider";
import { RankStrategy } from "../types/RankStrategy";

export class RankMachine {
  constructor(private rankStrategies: RankStrategy) {}

  score(dataProvider: DataProvider) {
    return this.rankStrategies.score(dataProvider);
  }
}
