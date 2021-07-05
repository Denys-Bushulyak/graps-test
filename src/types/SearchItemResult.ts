export interface SearchItemResult {
  name: string;
  commentsPerHour: number;
  subscribers: ReadonlyArray<number>;
  messages: ReadonlyArray<number>;
  topKeywords: ReadonlyArray<[string, number]>;
}
