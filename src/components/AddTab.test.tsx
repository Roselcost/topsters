import * as fs from "fs";
import * as path from "path";
import AddTab from "./AddTab";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "AddTab.tsx"),
  "utf-8"
);

describe("AddTab Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof AddTab).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should accept setDraggingItem, resetDrag, and hasData props", () => {
      expect(sourceFile).toContain("setDraggingItem");
      expect(sourceFile).toContain("resetDrag");
      expect(sourceFile).toContain("hasData");
    });

    it("should define a DraggingItem interface", () => {
      expect(sourceFile).toContain("interface DraggingItem");
    });

    it("should define an AddTabProps interface", () => {
      expect(sourceFile).toContain("interface AddTabProps");
    });
  });

  describe("imports", () => {
    it("should import React and useState from react", () => {
      expect(sourceFile).toContain('from "react"');
      expect(sourceFile).toContain("useState");
    });

    it("should import Image from next/image", () => {
      expect(sourceFile).toContain('from "next/image"');
      expect(sourceFile).toContain("Image");
    });

    it("should import Button component", () => {
      expect(sourceFile).toContain('from "./Button"');
    });

    it("should import Selector component", () => {
      expect(sourceFile).toContain('from "./Selector"');
    });

    it("should import styles from AddTab.module.css", () => {
      expect(sourceFile).toContain('from "../styles/AddTab.module.css"');
      expect(sourceFile).toContain("styles");
    });

    it("should import Category and Item from redux state", () => {
      expect(sourceFile).toContain('from "../redux/state"');
      expect(sourceFile).toContain("Category");
      expect(sourceFile).toContain("Item");
    });

    it("should import addItem from redux store", () => {
      expect(sourceFile).toContain('from "@/redux/store"');
      expect(sourceFile).toContain("addItem");
    });

    it("should import useDispatch from react-redux", () => {
      expect(sourceFile).toContain('from "react-redux"');
      expect(sourceFile).toContain("useDispatch");
    });

    it("should import axios", () => {
      expect(sourceFile).toContain('from "axios"');
    });
  });

  describe("state management", () => {
    it("should use dispatch hook", () => {
      expect(sourceFile).toContain("useDispatch()");
    });

    it("should have itemForm state with title and url", () => {
      expect(sourceFile).toContain("itemForm");
      expect(sourceFile).toContain('title: ""');
      expect(sourceFile).toContain('url: ""');
    });

    it("should have isSearching state", () => {
      expect(sourceFile).toContain("isSearching");
      expect(sourceFile).toContain("setIsSearching");
    });

    it("should have category state defaulting to Category.games", () => {
      expect(sourceFile).toContain("setCategory");
      expect(sourceFile).toContain("Category.games");
    });

    it("should have search state", () => {
      expect(sourceFile).toContain('useState("")');
      expect(sourceFile).toContain("setSearch");
    });

    it("should have searchedItems state as an array", () => {
      expect(sourceFile).toContain("searchedItems");
      expect(sourceFile).toContain("setSearchedItems");
    });
  });

  describe("generateItem function", () => {
    it("should define a generateItem function", () => {
      expect(sourceFile).toContain("const generateItem");
    });

    it("should check for both title and url before generating", () => {
      expect(sourceFile).toContain("itemForm.title");
      expect(sourceFile).toContain("itemForm.url");
    });

    it("should set searchedItems with generated item", () => {
      expect(sourceFile).toContain("setSearchedItems");
    });

    it("should strip protocol from URL for cover", () => {
      expect(sourceFile).toContain("itemForm.url.replace");
      expect(sourceFile).toContain("\\w+:");
    });
  });

  describe("searchItems function", () => {
    it("should define a searchItems function", () => {
      expect(sourceFile).toContain("const searchItems");
    });

    it("should check for search value before making request", () => {
      expect(sourceFile).toContain("!!search");
    });

    it("should set isSearching to true before API call", () => {
      expect(sourceFile).toContain("setIsSearching(true)");
    });

    it("should make GET request to the API endpoint", () => {
      expect(sourceFile).toContain("axios");
      expect(sourceFile).toContain(".get(");
      expect(sourceFile).toContain(
        "https://topsters4.vercel.app/api/endpoints"
      );
    });

    it("should include category and name in API query", () => {
      expect(sourceFile).toContain("category=${category}");
      expect(sourceFile).toContain("name=${search}");
    });

    it("should handle response and set searchedItems", () => {
      expect(sourceFile).toContain(".then(");
      expect(sourceFile).toContain("setSearchedItems(response.data)");
    });

    it("should handle errors with console.error", () => {
      expect(sourceFile).toContain(".catch(");
      expect(sourceFile).toContain("console.error");
    });

    it("should set isSearching to false in finally block", () => {
      expect(sourceFile).toContain(".finally(");
      expect(sourceFile).toContain("setIsSearching(false)");
    });
  });

  describe("category selector", () => {
    it("should render Selector component for categories", () => {
      expect(sourceFile).toContain("<Selector");
    });

    it("should include games category option", () => {
      expect(sourceFile).toContain("Category.games");
      expect(sourceFile).toContain('"/icons/controller.svg"');
    });

    it("should include music category option", () => {
      expect(sourceFile).toContain("Category.music");
      expect(sourceFile).toContain('"/icons/music.svg"');
    });

    it("should include movies category option", () => {
      expect(sourceFile).toContain("Category.movies");
      expect(sourceFile).toContain('"/icons/movie.svg"');
    });

    it("should include tvshows category option", () => {
      expect(sourceFile).toContain("Category.tvshows");
      expect(sourceFile).toContain('"/icons/tv.svg"');
    });

    it("should include books category option", () => {
      expect(sourceFile).toContain("Category.books");
      expect(sourceFile).toContain('"/icons/book.svg"');
    });

    it("should have commented out lastfm and pictures categories in selector", () => {
      expect(sourceFile).toContain("Category.lastfm");
      expect(sourceFile).toContain("Category.pictures");
    });

    it("should pass onChange handler to Selector that calls setCategory", () => {
      expect(sourceFile).toContain("onChange={(value) => setCategory(value)}");
    });
  });

  describe("search input for standard categories", () => {
    it("should conditionally render search input for non-pictures and non-lastfm", () => {
      expect(sourceFile).toContain("category !== Category.pictures");
      expect(sourceFile).toContain("category !== Category.lastfm");
    });

    it("should have a search input with onChange handler", () => {
      expect(sourceFile).toContain("setSearch(e.target.value)");
    });

    it("should have placeholder text based on category", () => {
      expect(sourceFile).toContain("placeholder={`Search ${category}...`}");
    });

    it("should trigger searchItems on Enter key", () => {
      expect(sourceFile).toContain('e.key === "Enter"');
      expect(sourceFile).toContain("searchItems()");
    });

    it("should have a search button that calls searchItems", () => {
      expect(sourceFile).toContain("onClick={() => searchItems()}");
    });

    it("should render search icon in button", () => {
      expect(sourceFile).toContain('src="/icons/search.svg"');
      expect(sourceFile).toContain('alt="Search"');
    });
  });

  describe("pictures category form", () => {
    it("should conditionally render pictures form when category is pictures", () => {
      expect(sourceFile).toContain("category === Category.pictures");
    });

    it("should have a Generate new item heading", () => {
      expect(sourceFile).toContain("<h3>Generate new item</h3>");
    });

    it("should have a Link input field", () => {
      expect(sourceFile).toContain("placeholder={\"Image link\"}");
    });

    it("should have a Title input field", () => {
      expect(sourceFile).toContain("placeholder={`Title`}");
    });

    it("should update itemForm.url on Link input change", () => {
      expect(sourceFile).toContain("url: e.target.value");
    });

    it("should update itemForm.title on Title input change", () => {
      expect(sourceFile).toContain("title: e.target.value");
    });

    it("should trigger generateItem on Enter key in pictures inputs", () => {
      const generateItemOnEnter = sourceFile.match(/generateItem\(\)/g);
      expect(generateItemOnEnter).not.toBeNull();
      expect(generateItemOnEnter!.length).toBeGreaterThanOrEqual(2);
    });

    it("should have a Generate button that calls generateItem", () => {
      expect(sourceFile).toContain("onClick={() => generateItem()}");
    });
  });

  describe("lastfm category form", () => {
    it("should conditionally render lastfm form when category is lastfm", () => {
      expect(sourceFile).toContain("category === Category.lastfm");
    });

    it("should have an Import from Last.fm heading", () => {
      expect(sourceFile).toContain("<h3>Import from Last.fm</h3>");
    });

    it("should have a Username input field", () => {
      expect(sourceFile).toContain("placeholder={`Username`}");
    });

    it("should have a Period selector with Selector component", () => {
      expect(sourceFile).toContain("Period");
    });

    it("should have period options including Overall, Week, Month", () => {
      expect(sourceFile).toContain('"overall"');
      expect(sourceFile).toContain('"week"');
      expect(sourceFile).toContain('"month"');
    });

    it("should have period options for 3 months, 6 months, Year", () => {
      expect(sourceFile).toContain('"three"');
      expect(sourceFile).toContain('"six"');
      expect(sourceFile).toContain('"year"');
    });

    it("should have an Import button that calls importItems", () => {
      expect(sourceFile).toContain("onClick={() => importItems()}");
    });

    it("should define an empty importItems function", () => {
      expect(sourceFile).toMatch(/const importItems\s*=\s*\(\)\s*=>\s*\{\s*\}/);
    });
  });

  describe("search results display", () => {
    it("should show no items message when searchedItems is empty", () => {
      expect(sourceFile).toContain("!searchedItems.length");
      expect(sourceFile).toContain("Nothing here... yet!");
    });

    it("should render covers when searchedItems has items", () => {
      expect(sourceFile).toContain("!!searchedItems.length");
      expect(sourceFile).toContain("styles.covers");
    });

    it("should filter items using hasData prop", () => {
      expect(sourceFile).toContain(".filter((item) => hasData(item))");
    });

    it("should map over searchedItems to render cover images", () => {
      expect(sourceFile).toContain(".map((item, i)");
    });

    it("should use item title and index for key", () => {
      expect(sourceFile).toContain("key={i + item.title}");
    });
  });

  describe("drag and drop functionality", () => {
    it("should set draggable attribute on images", () => {
      expect(sourceFile).toContain("draggable={true}");
    });

    it("should call setDraggingItem on drag start with correct origin", () => {
      expect(sourceFile).toContain("onDragStart");
      expect(sourceFile).toContain('origin: "add"');
    });

    it("should set index to -1 for new items in drag state", () => {
      expect(sourceFile).toContain("index: -1");
    });

    it("should call resetDrag on drag end", () => {
      expect(sourceFile).toContain("onDragEnd");
      expect(sourceFile).toContain("resetDrag()");
    });
  });

  describe("click to add functionality", () => {
    it("should dispatch addItem on image click", () => {
      expect(sourceFile).toContain("onClick");
      expect(sourceFile).toContain("dispatch(");
      expect(sourceFile).toContain("addItem({");
    });

    it("should pass item and destinationIndex -1 to addItem", () => {
      expect(sourceFile).toContain("item,");
      expect(sourceFile).toContain("destinationIndex: -1");
    });

    it("should add and remove 'added' class for animation", () => {
      expect(sourceFile).toContain('classList.add("added")');
      expect(sourceFile).toContain('classList.remove("added")');
    });

    it("should use setTimeout for animation cleanup", () => {
      expect(sourceFile).toContain("setTimeout");
      expect(sourceFile).toContain("500");
    });
  });

  describe("image URL transformation", () => {
    it("should replace cover size for display", () => {
      expect(sourceFile).toContain(
        'replace("t_cover_big", "t_cover_small_2x")'
      );
    });

    it("should prepend https: to image URL", () => {
      expect(sourceFile).toContain('"https:" +');
    });

    it("should set image width to 80", () => {
      expect(sourceFile).toContain("width={80}");
    });

    it("should set image height to 0", () => {
      expect(sourceFile).toContain("height={0}");
    });

    it("should set priority on images", () => {
      expect(sourceFile).toContain("priority");
    });
  });

  describe("conditional styling", () => {
    it("should apply animate-opacity class to root div", () => {
      expect(sourceFile).toContain("animate-opacity");
    });

    it("should apply styles.search to root div", () => {
      expect(sourceFile).toContain("styles.search");
    });

    it("should use styles.input-group class", () => {
      expect(sourceFile).toContain('styles["input-group"]');
    });

    it("should use styles.input class", () => {
      expect(sourceFile).toContain("styles.input");
    });

    it("should hide lastfm section display conditionally", () => {
      expect(sourceFile).toContain("display: \"none\"");
    });

    it("should adjust pictures section height", () => {
      expect(sourceFile).toContain('height: "unset"');
    });
  });

  describe("CSS module usage", () => {
    it("should use styles.categories", () => {
      expect(sourceFile).toContain("styles.categories");
    });

    it("should use styles.value for input fields", () => {
      expect(sourceFile).toContain("styles.value");
    });

    it("should use styles.icon for icons", () => {
      expect(sourceFile).toContain("styles.icon");
    });

    it("should use styles.covers for results container", () => {
      expect(sourceFile).toContain("styles.covers");
    });

    it("should use styles.cover for individual items", () => {
      expect(sourceFile).toContain("styles.cover");
    });

    it("should use styles.no-items for empty state", () => {
      expect(sourceFile).toContain('styles["no-items"]');
    });

    it("should use styles.big-icon for large icons", () => {
      expect(sourceFile).toContain("styles[\"big-icon\"]");
    });
  });

  describe("Image components", () => {
    it("should render multiple Image components", () => {
      const imageMatches = sourceFile.match(/<Image/g);
      expect(imageMatches).not.toBeNull();
      expect(imageMatches!.length).toBeGreaterThanOrEqual(2);
    });

    it("should provide alt text for search icon", () => {
      expect(sourceFile).toContain('alt="Search"');
    });

    it("should provide alt text for no items icon", () => {
      expect(sourceFile).toContain('alt={"No items"}');
    });

    it("should provide alt text for cover images", () => {
      expect(sourceFile).toContain('alt="Cover"');
    });
  });

  describe("no items state", () => {
    it("should display a picture icon when no items", () => {
      expect(sourceFile).toContain('src={"/icons/picture.svg"}');
    });

    it("should set dimensions for big icon", () => {
      expect(sourceFile).toContain("width={100}");
      expect(sourceFile).toContain("height={100}");
    });
  });
});
