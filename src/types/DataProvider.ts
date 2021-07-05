export interface DataProvider<T = any> {
  getData(): Promise<Array<T>>;
}
