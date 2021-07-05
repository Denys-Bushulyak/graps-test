import { DataItem } from "../types/DataItem";
import { DataProvider } from "../types/DataProvider";
import { ScoredItem } from "../types/ScoredItem";
import { ScoreStrategy } from "../types/ScoreStrategy";
import { UndefinedStrategy } from "./strategies/UndefinedStrategy";

/**
 * Score append service to add score number value
 */
export class ScoreAppendService {
  constructor(private _strategy?: ScoreStrategy) {
    this._strategy = _strategy ?? new UndefinedStrategy();
  }

  get strategy(): ScoreStrategy {
    return this._strategy ?? new UndefinedStrategy();
  }

  set strategy(value: ScoreStrategy) {
    this._strategy = value;
  }

  async score(
    dataProvider: DataProvider<DataItem>
  ): Promise<Array<ScoredItem>> {
    const data = await dataProvider.getData();

    return Promise.all(
      data.map(
        async (item) =>
          ({
            name: item.name,
            commentsPerHour: item.commentsPerHour,
            messages: item.messages,
            subscribers: item.subscribers,
            topKeywords: item.topKeywords,
            finalScore: await this.strategy.score(item),
          } as ScoredItem)
      )
    );
  }
}
