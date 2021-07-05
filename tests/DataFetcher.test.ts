import { DataFetcher } from "../src/services/DataFetcher";

describe("DataFetcher", () => {
  test("instantiating", () => {
    const instance = new DataFetcher("http://example.com");
    expect(instance).toBeInstanceOf(DataFetcher);
  });

  test("fetch data", async () => {
    const mockFetcher: jest.Mock<any, any> = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([{ hello: "world" }]),
    });

    const instance = new DataFetcher("http://example.com", mockFetcher);

    const result = await instance.getData();
    expect(result).toEqual([{ hello: "world" }]);
  });

  it("expect then fetcher will be called once and cache will be used", async () => {
    const mockFetcher: jest.Mock<any, any> = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([{ hello: "world" }]),
    });

    const instance = new DataFetcher("http://example.com", mockFetcher);

    await instance.getData();
    const result = await instance.getData();
    expect(mockFetcher).toBeCalledTimes(1);
    expect(result).toEqual([{ hello: "world" }]);
  });

  it("should return empty array and call logger function", async () => {
    const mockFetcher: jest.Mock<any, any> = jest.fn().mockResolvedValue({
      json: () => Promise.reject("Controlled rejection"),
    });
    const mockConsole = {
      error: jest.fn(),
    };

    const instance = new DataFetcher(
      "http://example.com",
      mockFetcher,
      mockConsole as unknown as Console
    );

    const result = await instance.getData();
    expect(result).toEqual([]);
    expect(mockConsole.error).toBeCalledWith("Controlled rejection");
  });
});
