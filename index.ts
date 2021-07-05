import { DataFetcher } from "./src/services/DataFetcher";
import { DefaultRankStrategy } from "./src/services/DefaultRankStrategy";
import { GoogleSearchService } from "./src/services/GoogleSearchService";
import { RankMachine } from "./src/services/RankMachine";
import { RedditDataProvider } from "./src/services/RedditDataProvider";
import { RankedItem } from "./src/types/RankedItem";

function main(): Promise<Array<RankedItem>> {
  const source = new RedditDataProvider(
    new DataFetcher("https://grasp-assets.s3.amazonaws.com/reddit_data.json")
  );
  const googleSearchService = new GoogleSearchService(
    new DataFetcher("https://grasp-assets.s3.amazonaws.com/google_data.json")
  );

  const machine = new RankMachine(new DefaultRankStrategy(googleSearchService));
  return machine.score(source);
}

main().then(console.dir).catch(console.dir);
