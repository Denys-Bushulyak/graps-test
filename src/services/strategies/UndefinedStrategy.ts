import { DataItem } from "../../types/DataItem";
import { ScoreStrategy } from "../../types/ScoreStrategy";

/**
 * Strategy provide backdrop if strategy does not provided
 */
export class UndefinedStrategy implements ScoreStrategy {
  public score(item: DataItem): Promise<number> {
    return Promise.resolve(0);
  }
}
