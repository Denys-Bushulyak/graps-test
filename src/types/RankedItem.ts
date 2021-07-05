import { SearchItemResult } from "./SearchItemResult";

export interface RankedItem extends SearchItemResult {
  finalScore: number;
}
