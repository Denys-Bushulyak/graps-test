import fetch from "node-fetch";

/**
 * Class to encapsulate fetching method.
 *
 * Provides cache
 *
 */
export class DataFetcher<T = any> {
  private cache: T | undefined;

  constructor(
    public readonly url: string,
    private fetcher?: any,
    private logger?: Console
  ) {
    this.fetcher = fetcher || fetch;
    this.logger = logger || console;
  }

  /**
   * Return data from source or empty array. To provide durability and stability
   * just return console.error if error happens.
   * @return {Promise<[] | T=any>}
   */
  async getData(): Promise<T | []> {
    try {
      if (!this.cache) {
        const resp = await this.fetcher(this.url);
        this.cache = (await resp.json()) as unknown as T;
      }

      return this.cache;
    } catch (e) {
      this.logger?.error(e);
      return [];
    }
  }
}
