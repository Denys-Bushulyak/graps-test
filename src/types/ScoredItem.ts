import { DataItem } from "./DataItem";

/**
 * Final interface which contain result with score number.
 */
export interface ScoredItem extends DataItem {
  finalScore: number;
}
