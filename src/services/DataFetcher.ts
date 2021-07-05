import fetch from "node-fetch";

export class DataFetcher<T = any> {
  constructor(public readonly url: string) {}

  async getData() {
    try {
      const resp = await fetch(this.url);
      return (await resp.json()) as unknown as T;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
