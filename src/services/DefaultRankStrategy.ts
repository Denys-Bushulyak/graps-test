import { RankedItem } from "../types/RankedItem";
import { RankStrategy } from "../types/RankStrategy";
import { SearchRateService } from "../types/SearchRateService";
import { RedditData, RedditDataProvider } from "./RedditDataProvider";

export class DefaultRankStrategy implements RankStrategy {
  constructor(private service: SearchRateService) {}

  private static getMessagesScore(item: RedditData) {
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

  private static getSubscribersScore(item: RedditData) {
    const lastSubscribersValue: number =
      item.subscribers[item.subscribers.length - 1];
    if (0 <= lastSubscribersValue && lastSubscribersValue <= 1000000) {
      return 1;
    }
    if (1000001 <= lastSubscribersValue && lastSubscribersValue <= 5000000) {
      return 2;
    }
    if (5000001 <= lastSubscribersValue && lastSubscribersValue) {
      return 3;
    }

    return 0;
  }

  public async score(dataProvider: RedditDataProvider) {
    const items = await dataProvider.getData();

    return Promise.all(
      items.map(async (item) => {
        let score = DefaultRankStrategy.getSubscribersScore(item);
        score += DefaultRankStrategy.getMessagesScore(item);

        score += await this.service.getSearchesScore(item.name);
        score += await this.service.getSearchesAvgScore(item.name);

        return Promise.resolve<RankedItem>({
          name: item.name,
          commentsPerHour: item.commentsPerHour,
          subscribers: item.subscribers,
          messages: item.messages,
          topKeywords: item.topKeywords,
          finalScore: score,
        });
      })
    );
  }
}
