import handler from "./endpoints";
import axios from "axios";
import { Category } from "@/redux/state";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createMockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

describe("endpoints API handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.IGDB_ID = "test_igdb_id";
    process.env.IGDB_TOKEN = "test_igdb_token";
    process.env.LASTFM_KEY = "test_lastfm_key";
    process.env.TMDB_TOKEN = "test_tmdb_token";
  });

  describe("games category", () => {
    it("should return sorted games with cover URLs on success", async () => {
      const mockGames = [
        {
          id: 1,
          name: "Game B",
          rating: 80,
          cover: { id: 1, url: "t_thumb/game_b.jpg" },
        },
        {
          id: 2,
          name: "Game A",
          rating: 90,
          cover: { id: 2, url: "t_thumb/game_a.jpg" },
        },
        {
          id: 3,
          name: "Game C",
          rating: null,
          cover: { id: 3, url: "t_thumb/game_c.jpg" },
        },
      ];

      mockedAxios.mockResolvedValue({ data: mockGames });

      const req = { query: { category: Category.games, name: "zelda" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "https://api.igdb.com/v4/games/",
          method: "POST",
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(3);
      expect(responseData[0].title).toBe("Game A");
      expect(responseData[1].title).toBe("Game B");
      expect(responseData[2].title).toBe("Game C");
      expect(responseData[0].cover).toBe("t_cover_big/game_a.jpg");
    });

    it("should return 500 on error", async () => {
      mockedAxios.mockRejectedValue(new Error("API error"));

      const req = { query: { category: Category.games, name: "zelda" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("music category", () => {
    it("should return albums with cover URLs on success", async () => {
      const mockResponse = {
        data: {
          results: {
            albummatches: {
              album: [
                {
                  artist: "Artist A",
                  name: "Album A",
                  image: [
                    { size: "large", "#text": "https://example.com/cover.jpg" },
                  ],
                },
              ],
            },
          },
        },
      };

      mockedAxios.mockResolvedValue(mockResponse);

      const req = { query: { category: Category.music, name: "rock" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("album.search"),
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(1);
      expect(responseData[0].title).toBe("Artist A - Album A");
      expect(responseData[0].cover).toBe("//example.com/cover.jpg");
    });

    it("should return 500 on error", async () => {
      mockedAxios.mockRejectedValue(new Error("API error"));

      const req = { query: { category: Category.music, name: "rock" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("lastfm category", () => {
    it("should return albums with cover URLs on success", async () => {
      const mockResponse = {
        data: {
          results: {
            albummatches: {
              album: [
                {
                  artist: "Artist B",
                  name: "Album B",
                  image: [
                    { size: "large", "#text": "https://example.com/cover2.jpg" },
                  ],
                },
              ],
            },
          },
        },
      };

      mockedAxios.mockResolvedValue(mockResponse);

      const req = { query: { category: Category.lastfm, name: "jazz" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("album.search"),
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(1);
      expect(responseData[0].title).toBe("Artist B - Album B");
      expect(responseData[0].cover).toBe("//example.com/cover2.jpg");
    });

    it("should return 500 on error", async () => {
      mockedAxios.mockRejectedValue(new Error("API error"));

      const req = { query: { category: Category.lastfm, name: "jazz" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("movies category", () => {
    it("should return movies with poster URLs on success", async () => {
      const mockResponse = {
        data: {
          results: [
            { title: "Movie A", poster_path: "/abc123.jpg" },
            { title: "Movie B", poster_path: "/def456.jpg" },
            { title: "Movie C", poster_path: null },
          ],
        },
      };

      mockedAxios.mockResolvedValue(mockResponse);

      const req = { query: { category: Category.movies, name: "action" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("search/movie"),
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(2);
      expect(responseData[0].title).toBe("Movie A");
      expect(responseData[0].cover).toBe("//image.tmdb.org/t/p/w185/abc123.jpg");
    });

    it("should return 500 on error", async () => {
      mockedAxios.mockRejectedValue(new Error("API error"));

      const req = { query: { category: Category.movies, name: "action" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("tvshows category", () => {
    it("should return TV shows with poster URLs on success", async () => {
      const mockResponse = {
        data: {
          results: [
            { name: "Show A", poster_path: "/show1.jpg" },
            { name: "Show B", poster_path: "/show2.jpg" },
            { name: "", poster_path: "/show3.jpg" },
          ],
        },
      };

      mockedAxios.mockResolvedValue(mockResponse);

      const req = { query: { category: Category.tvshows, name: "drama" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("search/tv"),
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(2);
      expect(responseData[0].title).toBe("Show A");
      expect(responseData[0].cover).toBe("//image.tmdb.org/t/p/w185/show1.jpg");
    });

    it("should return 500 on error", async () => {
      mockedAxios.mockRejectedValue(new Error("API error"));

      const req = { query: { category: Category.tvshows, name: "drama" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("books category", () => {
    it("should return books with cover URLs on success", async () => {
      const mockResponse = {
        data: {
          docs: [
            { title: "Book A", cover_edition_key: "OL123M" },
            { title: "Book B", cover_edition_key: "OL456M" },
            { title: "Book C", cover_edition_key: null },
          ],
        },
      };

      mockedAxios.mockResolvedValue(mockResponse);

      const req = { query: { category: Category.books, name: "fiction" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("search.json"),
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(2);
      expect(responseData[0].title).toBe("Book A");
      expect(responseData[0].cover).toBe(
        "//covers.openlibrary.org/b/olid/OL123M-L.jpg"
      );
    });

    it("should return 500 on error", async () => {
      mockedAxios.mockRejectedValue(new Error("API error"));

      const req = { query: { category: Category.books, name: "fiction" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("default/unknown category", () => {
    it("should return 500 for unknown categories", async () => {
      const req = { query: { category: "unknown", name: "test" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Error");
    });

    it("should return 500 for pictures category (no handler)", async () => {
      const req = { query: { category: Category.pictures, name: "test" } };
      const res = createMockRes();

      await handler(req as any, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Error");
    });
  });
});
