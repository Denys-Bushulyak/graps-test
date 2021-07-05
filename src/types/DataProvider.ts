import { DataItem } from "./DataItem";

/**
 * Interface for Data provider services
 */
export interface DataProvider<T extends DataItem> {
  getData(): Promise<Array<T>>;
}
