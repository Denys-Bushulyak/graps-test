import { GoogleFindResultData } from "../services/GoogleSearchCounterService";

export interface SearchRateService {
  find(keyword: string): Promise<GoogleFindResultData | null>;
}
