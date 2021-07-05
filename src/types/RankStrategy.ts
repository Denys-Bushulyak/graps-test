import { DataProvider } from "./DataProvider";
import { RankedItem } from "./RankedItem";

export interface RankStrategy {
  score(dataProvider: DataProvider): Promise<Array<RankedItem>>;
}
