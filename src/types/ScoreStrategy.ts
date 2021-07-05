import { DataItem } from "./DataItem";

/**
 * Strategy implementation interface
 */
export interface ScoreStrategy {
  score(item: DataItem): Promise<number>;
}
