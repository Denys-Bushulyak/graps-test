import { DataFetcher } from "./src/services/DataFetcher";
import { GoogleSearchCounterService } from "./src/services/GoogleSearchCounterService";
import { RedditDataProvider } from "./src/services/RedditDataProvider";
import { ScoreAppendService } from "./src/services/ScoreAppendService";
import { DefaultRankStrategy } from "./src/services/strategies/DefaultRankStrategy";
import { ScoredItem } from "./src/types/ScoredItem";

function main(): Promise<Array<ScoredItem>> {
  const service = new GoogleSearchCounterService(
    new DataFetcher("https://grasp-assets.s3.amazonaws.com/google_data.json")
  );
  const scoreAppendService = new ScoreAppendService();
  scoreAppendService.strategy = new DefaultRankStrategy(service);

  const source = new RedditDataProvider(
    new DataFetcher("https://grasp-assets.s3.amazonaws.com/reddit_data.json")
  );

  return scoreAppendService.score(source);
}

main().then(console.dir).catch(console.dir);
