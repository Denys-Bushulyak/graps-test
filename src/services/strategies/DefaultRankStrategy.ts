import { largest } from "../../tools/largest";
import { sum } from "../../tools/sum";
import { DataItem } from "../../types/DataItem";
import { ScoreStrategy } from "../../types/ScoreStrategy";
import { SearchRateService } from "../../types/SearchRateService";
import { GoogleFindResultData } from "../GoogleSearchCounterService";

/**
 * Default score counting strategy.
 */
export class DefaultRankStrategy implements ScoreStrategy {
  constructor(private service: SearchRateService) {}

  public async score(item: DataItem) {
    const finalScore = [];

    finalScore.push(this.getSubscribersScore(item));
    finalScore.push(this.getMessagesScore(item));
    finalScore.push(
      (
        await Promise.all(
          item.topKeywords.map(async ([word]) => {
            const googleFindResultData = await this.service.find(word);
            return googleFindResultData
              ? this.getSearchesScore(googleFindResultData)
              : 0;
          })
        )
      ).reduce(largest, 0)
    );
    finalScore.push(
      (
        await Promise.all(
          item.topKeywords.map(async ([word]) => {
            const googleFindResultData = await this.service.find(word);
            return googleFindResultData
              ? this.getSearchesAvgScore(googleFindResultData)
              : 0;
          })
        )
      ).reduce(largest, 0)
    );

    return finalScore.reduce(sum, 0);
  }

  private getMessagesScore(item: DataItem) {
    const lastMessagesValue: number = item.messages[item.messages.length - 1];
    if (0 <= lastMessagesValue && lastMessagesValue <= 1000) {
      return 1;
    }
    if (1001 <= lastMessagesValue && lastMessagesValue <= 50000) {
      return 2;
    }
    if (50001 <= lastMessagesValue) {
      return 3;
    }

    return 0;
  }

  private getSubscribersScore(item: DataItem) {
    const lastSubscribersValue: number =
      item.subscribers[item.subscribers.length - 1];
    if (0 <= lastSubscribersValue && lastSubscribersValue <= 1000000) {
      return 1;
    }
    if (1000001 <= lastSubscribersValue && lastSubscribersValue <= 5000000) {
      return 2;
    }
    if (5000001 <= lastSubscribersValue) {
      return 3;
    }

    return 0;
  }

  private getSearchesAvgScore(item: GoogleFindResultData) {
    const totalItems: number = item.searches.length;
    const searchesAvgValue = item.searches.reduce(sum, 0) / totalItems;

    return this.getScoreByValue(searchesAvgValue);
  }

  private getSearchesScore(item: GoogleFindResultData) {
    const lastIndex: number = item.searches.length - 1;
    const lastSearchesValue = item.searches[lastIndex];

    return this.getScoreByValue(lastSearchesValue);
  }

  private getScoreByValue(searchesAvgValue: number) {
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
}
