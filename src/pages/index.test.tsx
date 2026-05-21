import * as fs from "fs";
import * as path from "path";
import Home from "./index";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "index.tsx"),
  "utf-8"
);

describe("Home Page Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof Home).toBe("function");
    });

    it("should have a displayName or name", () => {
      expect(Home.name).toBe("Home");
    });
  });

  describe("component source code analysis", () => {
    describe("state management", () => {
      it("should use useState for draggingItem", () => {
        expect(sourceFile).toContain("useState");
        expect(sourceFile).toContain("draggingItem");
      });

      it("should use useState for hoverItem", () => {
        expect(sourceFile).toContain("hoverItem");
        expect(sourceFile).toContain("setHoverItem");
      });

      it("should use useState for darkTheme", () => {
        expect(sourceFile).toContain("darkTheme");
        expect(sourceFile).toContain("setDarkTheme");
      });

      it("should use useState for isDownloading", () => {
        expect(sourceFile).toContain("isDownloading");
        expect(sourceFile).toContain("setIsDownloading");
      });

      it("should use useState for tab", () => {
        expect(sourceFile).toContain("tab");
        expect(sourceFile).toContain("setTab");
      });

      it("should initialize tab to 'add'", () => {
        expect(sourceFile).toContain('useState("add")');
      });

      it("should initialize darkTheme to true", () => {
        expect(sourceFile).toContain("useState(true)");
      });

      it("should initialize hoverItem to -1", () => {
        expect(sourceFile).toContain("useState(-1)");
      });
    });

    describe("redux integration", () => {
      it("should use useDispatch", () => {
        expect(sourceFile).toContain("useDispatch");
        expect(sourceFile).toContain("dispatch");
      });

      it("should use useSelector to get title", () => {
        expect(sourceFile).toContain("useSelector");
        expect(sourceFile).toContain("state.title");
      });
    });

    describe("helper functions", () => {
      it("should define hasData function", () => {
        expect(sourceFile).toContain("hasData");
        expect(sourceFile).toContain("item?.title");
        expect(sourceFile).toContain("item?.cover");
      });

      it("should define resetDrag function", () => {
        expect(sourceFile).toContain("resetDrag");
        expect(sourceFile).toContain("setHoverItem(-1)");
      });

      it("should define onDrop function", () => {
        expect(sourceFile).toContain("onDrop");
        expect(sourceFile).toContain("destinationIndex");
      });

      it("should define toggleTheme function", () => {
        expect(sourceFile).toContain("toggleTheme");
        expect(sourceFile).toContain("setDarkTheme(!darkTheme)");
      });

      it("should define prefersDarkTheme function", () => {
        expect(sourceFile).toContain("prefersDarkTheme");
        expect(sourceFile).toContain("prefers-color-scheme");
      });
    });

    describe("effects", () => {
      it("should use useEffect for theme initialization", () => {
        expect(sourceFile).toContain("useEffect");
        expect(sourceFile).toContain("prefersDarkTheme");
      });
    });

    describe("drag and drop logic", () => {
      it("should dispatch addItem when origin is 'add'", () => {
        expect(sourceFile).toContain('origin === "add"');
        expect(sourceFile).toContain("addItem");
      });

      it("should dispatch swapItem when origin is not 'add'", () => {
        expect(sourceFile).toContain("swapItem");
        expect(sourceFile).toContain("sourceIndex");
        expect(sourceFile).toContain("destinationIndex");
      });

      it("should call resetDrag after drop", () => {
        expect(sourceFile).toContain("resetDrag()");
      });

      it("should check hasData before dispatching", () => {
        expect(sourceFile).toContain("hasData(dragitem)");
      });
    });

    describe("theme logic", () => {
      it("should set dark attribute on html element when enabling dark theme", () => {
        expect(sourceFile).toContain('setAttribute("dark", "true")');
      });

      it("should remove dark attribute when disabling dark theme", () => {
        expect(sourceFile).toContain('removeAttribute("dark")');
      });
    });

    describe("download functionality", () => {
      it("should import downloadImage utility", () => {
        expect(sourceFile).toContain("downloadImage");
      });

      it("should set isDownloading to true before download", () => {
        expect(sourceFile).toContain("setIsDownloading(true)");
      });

      it("should set isDownloading to false after download", () => {
        expect(sourceFile).toContain("setIsDownloading(false)");
      });

      it("should pass title to downloadImage", () => {
        expect(sourceFile).toContain("downloadImage(title)");
      });
    });

    describe("tab rendering", () => {
      it("should render AddTab when tab is 'add'", () => {
        expect(sourceFile).toContain('tab === "add"');
        expect(sourceFile).toContain("AddTab");
      });

      it("should render OptionsTab when tab is 'options'", () => {
        expect(sourceFile).toContain('tab === "options"');
        expect(sourceFile).toContain("OptionsTab");
      });

      it("should render AboutTab when tab is 'about'", () => {
        expect(sourceFile).toContain('tab === "about"');
        expect(sourceFile).toContain("AboutTab");
      });
    });

    describe("tab selection", () => {
      it("should set tab to 'add' when Add tab is clicked", () => {
        expect(sourceFile).toContain('setTab("add")');
      });

      it("should set tab to 'options' when Options tab is clicked", () => {
        expect(sourceFile).toContain('setTab("options")');
      });

      it("should set tab to 'about' when About tab is clicked", () => {
        expect(sourceFile).toContain('setTab("about")');
      });
    });

    describe("selected tab styling", () => {
      it("should apply selected-tab class based on current tab", () => {
        expect(sourceFile).toContain("selected-tab");
        expect(sourceFile).toContain("tab ===");
      });
    });

    describe("workspace integration", () => {
      it("should pass draggingItem to Workspace", () => {
        expect(sourceFile).toContain("draggingItem={draggingItem}");
      });

      it("should pass hoverItem to Workspace", () => {
        expect(sourceFile).toContain("hoverItem={hoverItem}");
      });

      it("should pass hasData to Workspace", () => {
        expect(sourceFile).toContain("hasData={hasData}");
      });

      it("should pass onDrop to Workspace", () => {
        expect(sourceFile).toContain("onDrop={onDrop}");
      });

      it("should pass setHoverItem to Workspace", () => {
        expect(sourceFile).toContain("setHoverItem={setHoverItem}");
      });

      it("should pass setDraggingItem to Workspace", () => {
        expect(sourceFile).toContain("setDraggingItem={setDraggingItem}");
      });

      it("should pass resetDrag to Workspace", () => {
        expect(sourceFile).toContain("resetDrag={resetDrag}");
      });
    });

    describe("AddTab integration", () => {
      it("should pass setDraggingItem to AddTab", () => {
        expect(sourceFile).toContain("setDraggingItem={setDraggingItem}");
      });

      it("should pass resetDrag to AddTab", () => {
        expect(sourceFile).toContain("resetDrag={resetDrag}");
      });

      it("should pass hasData to AddTab", () => {
        expect(sourceFile).toContain("hasData={hasData}");
      });
    });

    describe("OptionsTab integration", () => {
      it("should pass darkTheme to OptionsTab", () => {
        expect(sourceFile).toContain("darkTheme={darkTheme}");
      });

      it("should pass toggleTheme to OptionsTab", () => {
        expect(sourceFile).toContain("toggleTheme={toggleTheme}");
      });
    });

    describe("page metadata (Head)", () => {
      it("should set page title to 'Topsters 4'", () => {
        expect(sourceFile).toContain("<title>Topsters 4</title>");
      });

      it("should set meta description", () => {
        expect(sourceFile).toContain('content="Topsters 4"');
      });

      it("should set viewport meta tag", () => {
        expect(sourceFile).toContain(
          'content="width=device-width, initial-scale=1"'
        );
      });

      it("should set favicon", () => {
        expect(sourceFile).toContain('href="/favicon.png"');
      });
    });

    describe("collection title display", () => {
      it("should display title when available", () => {
        expect(sourceFile).toContain("!!title ? title");
      });

      it("should display 'Untitled' when title is empty", () => {
        expect(sourceFile).toContain('"Untitled"');
      });
    });

    describe("imports", () => {
      it("should import from react-redux", () => {
        expect(sourceFile).toContain("react-redux");
        expect(sourceFile).toContain("useDispatch");
        expect(sourceFile).toContain("useSelector");
      });

      it("should import from react", () => {
        expect(sourceFile).toContain("useEffect");
        expect(sourceFile).toContain("useState");
      });

      it("should import from next/head", () => {
        expect(sourceFile).toContain("next/head");
        expect(sourceFile).toContain("Head");
      });

      it("should import from next/image", () => {
        expect(sourceFile).toContain("next/image");
        expect(sourceFile).toContain("Image");
      });

      it("should import Workspace component", () => {
        expect(sourceFile).toContain("Workspace");
      });

      it("should import AddTab component", () => {
        expect(sourceFile).toContain("AddTab");
      });

      it("should import OptionsTab component", () => {
        expect(sourceFile).toContain("OptionsTab");
      });

      it("should import AboutTab component", () => {
        expect(sourceFile).toContain("AboutTab");
      });

      it("should import Background component", () => {
        expect(sourceFile).toContain("Background");
      });

      it("should import redux actions", () => {
        expect(sourceFile).toContain("addItem");
        expect(sourceFile).toContain("swapItem");
      });

      it("should import downloadImage utility", () => {
        expect(sourceFile).toContain("downloadImage");
      });
    });

    describe("draggingItem state shape", () => {
      it("should have item, index, and origin properties", () => {
        expect(sourceFile).toContain("item:");
        expect(sourceFile).toContain("index:");
        expect(sourceFile).toContain("origin:");
      });

      it("should have origin typed as union of 'add', 'collection', or empty string", () => {
        expect(sourceFile).toContain('"add" | "collection" | ""');
      });

      it("should initialize item with empty title and cover", () => {
        expect(sourceFile).toContain('title: ""');
        expect(sourceFile).toContain('cover: ""');
      });

      it("should initialize index to -1", () => {
        expect(sourceFile).toContain("index: -1");
      });

      it("should initialize origin to empty string", () => {
        expect(sourceFile).toContain('origin: ""');
      });
    });

    describe("resetDrag function behavior", () => {
      it("should set hoverItem to -1", () => {
        expect(sourceFile).toContain("setHoverItem(-1)");
      });

      it("should reset draggingItem to default values", () => {
        const resetDragMatch = sourceFile.match(
          /const resetDrag[\s\S]*?setDraggingItem\(\{[\s\S]*?\}\)/
        );
        expect(resetDragMatch).toBeTruthy();
      });
    });

    describe("onDrop function behavior", () => {
      it("should extract dragitem from draggingItem", () => {
        expect(sourceFile).toContain("draggingItem.item");
      });

      it("should use hasData to validate drag item", () => {
        expect(sourceFile).toContain("hasData(dragitem)");
      });

      it("should handle 'add' origin with addItem dispatch", () => {
        expect(sourceFile).toContain('draggingItem.origin === "add"');
        expect(sourceFile).toContain("addItem({");
      });

      it("should handle 'collection' origin with swapItem dispatch", () => {
        expect(sourceFile).toContain("swapItem({");
        expect(sourceFile).toContain("sourceIndex:");
      });
    });

    describe("toggleTheme function behavior", () => {
      it("should toggle darkTheme state", () => {
        expect(sourceFile).toContain("setDarkTheme(!darkTheme)");
      });

      it("should manipulate DOM html element", () => {
        expect(sourceFile).toContain(
          'document.getElementsByTagName("html")[0]'
        );
      });
    });

    describe("prefersDarkTheme function behavior", () => {
      it("should use window.matchMedia", () => {
        expect(sourceFile).toContain("window.matchMedia");
        expect(sourceFile).toContain("window &&");
      });

      it("should check for prefers-color-scheme: dark", () => {
        expect(sourceFile).toContain("prefers-color-scheme: dark");
      });
    });

    describe("useEffect for theme", () => {
      it("should call prefersDarkTheme on mount", () => {
        expect(sourceFile).toContain("prefersDarkTheme()");
      });

      it("should have empty dependency array", () => {
        expect(sourceFile).toMatch(/useEffect\(\s*\(\)\s*=>\s*\{[\s\S]*\},\s*\[\]\s*\)/);
      });
    });

    describe("download button behavior", () => {
      it("should use isDownloading state for loading indicator", () => {
        expect(sourceFile).toContain("isDownloading");
        expect(sourceFile).toContain("loading");
      });
    });

    describe("conditional rendering", () => {
      it("should use logical AND for conditional tab rendering", () => {
        expect(sourceFile).toContain("&&");
      });

      it("should use ternary for title display", () => {
        expect(sourceFile).toContain("!!title ? title :");
      });
    });

    describe("CSS classes", () => {
      it("should use Home module styles", () => {
        expect(sourceFile).toContain("styles.");
      });

      it("should use main class", () => {
        expect(sourceFile).toContain("styles.main");
      });

      it("should use container class", () => {
        expect(sourceFile).toContain("styles.container");
      });

      it("should use workspace class", () => {
        expect(sourceFile).toContain("styles.workspace");
      });

      it("should use left-panel class", () => {
        expect(sourceFile).toContain("left-panel");
      });

      it("should use toolbar class", () => {
        expect(sourceFile).toContain("styles.toolbar");
      });
    });

    describe("icon rendering", () => {
      it("should render add icon for Add tab", () => {
        expect(sourceFile).toContain("/icons/add.svg");
      });

      it("should render settings icon for Options tab", () => {
        expect(sourceFile).toContain("/icons/settings.svg");
      });

      it("should render about icon for About tab", () => {
        expect(sourceFile).toContain("/icons/about.svg");
      });

      it("should render download icon for download button", () => {
        expect(sourceFile).toContain("/icons/download.svg");
      });

      it("should set icon dimensions to 10x10", () => {
        expect(sourceFile).toContain("width={10}");
        expect(sourceFile).toContain("height={10}");
      });
    });
  });
});
