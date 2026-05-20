import * as fs from "fs";
import * as path from "path";
import Workspace from "./Workspace";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "Workspace.tsx"),
  "utf-8"
);

describe("Workspace Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof Workspace).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should define a WorkspaceProps interface", () => {
      expect(sourceFile).toContain("interface WorkspaceProps");
    });
  });

  describe("imports", () => {
    it("should import styles from Workspace.module.css", () => {
      expect(sourceFile).toContain('from "@/styles/Workspace.module.css"');
      expect(sourceFile).toContain("styles");
    });

    it("should import Image from next/image", () => {
      expect(sourceFile).toContain('from "next/image"');
      expect(sourceFile).toContain("Image");
    });

    it("should import useEffect, useRef, and useState from react", () => {
      expect(sourceFile).toContain("useEffect");
      expect(sourceFile).toContain("useRef");
      expect(sourceFile).toContain("useState");
    });

    it("should import useDispatch and useSelector from react-redux", () => {
      expect(sourceFile).toContain("useDispatch");
      expect(sourceFile).toContain("useSelector");
    });

    it("should import removeItem from redux store", () => {
      expect(sourceFile).toContain("removeItem");
      expect(sourceFile).toContain('from "@/redux/store"');
    });

    it("should import types from redux state", () => {
      expect(sourceFile).toContain("BackgroundType");
      expect(sourceFile).toContain("Position");
      expect(sourceFile).toContain("State");
    });
  });

  describe("Props interface", () => {
    it("should have a draggingItem prop", () => {
      expect(sourceFile).toContain("draggingItem");
    });

    it("should have a hoverItem prop of type number", () => {
      expect(sourceFile).toMatch(/hoverItem\s*:\s*number/);
    });

    it("should have a hasData prop that is a function", () => {
      expect(sourceFile).toContain("hasData");
    });

    it("should have an onDrop prop that is a function", () => {
      expect(sourceFile).toContain("onDrop");
    });

    it("should have a setHoverItem prop that is a function", () => {
      expect(sourceFile).toContain("setHoverItem");
    });

    it("should have a setDraggingItem prop that is a function", () => {
      expect(sourceFile).toContain("setDraggingItem");
    });

    it("should have a resetDrag prop that is a function", () => {
      expect(sourceFile).toContain("resetDrag");
    });
  });

  describe("Redux state selectors", () => {
    it("should use useDispatch hook", () => {
      expect(sourceFile).toContain("useDispatch()");
    });

    it("should select title from redux state", () => {
      expect(sourceFile).toContain("state.title");
    });

    it("should select showTitles from redux state", () => {
      expect(sourceFile).toContain("state.showTitles");
    });

    it("should select rows and columns from redux state", () => {
      expect(sourceFile).toContain("state.rows");
      expect(sourceFile).toContain("state.columns");
    });

    it("should select background-related state", () => {
      expect(sourceFile).toContain("state.backgroundType");
      expect(sourceFile).toContain("state.backgroundColor1");
      expect(sourceFile).toContain("state.backgroundColor2");
      expect(sourceFile).toContain("state.backgroundOpacity");
      expect(sourceFile).toContain("state.gradientDirection");
    });

    it("should select gap from redux state", () => {
      expect(sourceFile).toContain("state.gap");
    });

    it("should select border-related state", () => {
      expect(sourceFile).toContain("state.borderColor");
      expect(sourceFile).toContain("state.borderSize");
      expect(sourceFile).toContain("state.borderRadius");
    });

    it("should select isCircle from redux state", () => {
      expect(sourceFile).toContain("state.isCircle");
    });

    it("should select showNumbers and showShadows from redux state", () => {
      expect(sourceFile).toContain("state.showNumbers");
      expect(sourceFile).toContain("state.showShadows");
    });

    it("should select font and textColor from redux state", () => {
      expect(sourceFile).toContain("state.font");
      expect(sourceFile).toContain("state.textColor");
    });

    it("should select titlesPosition from redux state", () => {
      expect(sourceFile).toContain("state.titlesPosition");
    });

    it("should select items from redux state", () => {
      expect(sourceFile).toContain("state.items");
    });
  });

  describe("local state and refs", () => {
    it("should define a scale state with useState", () => {
      expect(sourceFile).toContain("useState(1)");
      expect(sourceFile).toContain("scale");
      expect(sourceFile).toContain("setScale");
    });

    it("should define containerRef with useRef", () => {
      expect(sourceFile).toContain("containerRef");
      expect(sourceFile).toContain("useRef<HTMLDivElement>");
    });

    it("should define contentRef with useRef", () => {
      expect(sourceFile).toContain("contentRef");
    });
  });

  describe("calculateScale function", () => {
    it("should define a calculateScale function", () => {
      expect(sourceFile).toContain("const calculateScale");
    });

    it("should guard against missing refs", () => {
      expect(sourceFile).toContain("if (!containerRef.current || !contentRef.current)");
    });

    it("should calculate width and height ratios", () => {
      expect(sourceFile).toContain("widthRatio");
      expect(sourceFile).toContain("heightRatio");
    });

    it("should use Math.min to determine scale", () => {
      expect(sourceFile).toContain("Math.min(1, widthRatio, heightRatio)");
    });

    it("should update scale state via setScale", () => {
      expect(sourceFile).toContain("setScale(newScale)");
    });
  });

  describe("useEffect hook", () => {
    it("should call calculateScale on mount", () => {
      expect(sourceFile).toContain("calculateScale()");
    });

    it("should add resize event listener", () => {
      expect(sourceFile).toContain('addEventListener("resize", calculateScale)');
    });

    it("should clean up resize event listener", () => {
      expect(sourceFile).toContain('removeEventListener("resize", calculateScale)');
    });

    it("should depend on relevant state values", () => {
      expect(sourceFile).toMatch(/\[.*rows.*columns.*gap.*items.*\]/s);
    });
  });

  describe("rendering - container structure", () => {
    it("should render a root div with flex centering styles", () => {
      expect(sourceFile).toContain('"100%"');
      expect(sourceFile).toContain('"flex"');
      expect(sourceFile).toContain('"center"');
    });

    it("should attach containerRef to the root div", () => {
      expect(sourceFile).toContain("ref={containerRef}");
    });

    it("should render a checkerboard div with id", () => {
      expect(sourceFile).toContain('id="checkerboard"');
      expect(sourceFile).toContain("styles.checkerboard");
    });

    it("should apply scale transform to checkerboard", () => {
      expect(sourceFile).toContain("transform: `scale(${scale})`");
      expect(sourceFile).toContain("transformOrigin");
    });

    it("should render a content div with contentRef", () => {
      expect(sourceFile).toContain("ref={contentRef}");
      expect(sourceFile).toContain("styles.content");
    });
  });

  describe("background rendering", () => {
    it("should conditionally set backgroundColor for BackgroundType.color", () => {
      expect(sourceFile).toContain("BackgroundType.color");
    });

    it("should conditionally set backgroundImage for BackgroundType.gradient", () => {
      expect(sourceFile).toContain("BackgroundType.gradient");
      expect(sourceFile).toContain("linear-gradient");
    });

    it("should conditionally set backgroundImage for BackgroundType.radialGradient", () => {
      expect(sourceFile).toContain("BackgroundType.radialGradient");
      expect(sourceFile).toContain("radial-gradient");
    });

    it("should compute opacity using backgroundOpacity", () => {
      expect(sourceFile).toContain("backgroundOpacity * 16 - 1");
      expect(sourceFile).toContain("Math.max");
      expect(sourceFile).toContain("padStart(2, \"0\")");
    });

    it("should use gradientDirection for gradient direction", () => {
      expect(sourceFile).toContain("gradientDirection");
    });
  });

  describe("title rendering", () => {
    it("should conditionally render title when title is truthy", () => {
      expect(sourceFile).toContain("{title &&");
    });

    it("should apply styles.title class", () => {
      expect(sourceFile).toContain("styles.title");
    });

    it("should apply textShadow based on showShadows", () => {
      expect(sourceFile).toContain("showShadows");
      expect(sourceFile).toContain("black 1px 1px 1px");
    });

    it("should apply font and textColor from state", () => {
      expect(sourceFile).toContain("fontFamily: font");
      expect(sourceFile).toContain("color: textColor");
    });
  });

  describe("workspace covers grid", () => {
    it("should render workspace-covers-container div", () => {
      expect(sourceFile).toContain("styles[\"workspace-covers-container\"]");
    });

    it("should render workspace-covers with gridTemplateColumns", () => {
      expect(sourceFile).toContain("styles[\"workspace-covers\"]");
      expect(sourceFile).toContain("gridTemplateColumns");
      expect(sourceFile).toContain("repeat(${columns}, 1fr)");
    });

    it("should filter items to rows * columns limit", () => {
      expect(sourceFile).toContain("filter((_item, i) => i < rows * columns)");
    });

    it("should use gap for padding and grid gap", () => {
      expect(sourceFile).toContain("gap: gap");
    });
  });

  describe("cover item rendering", () => {
    it("should apply dragging class conditionally", () => {
      expect(sourceFile).toContain("styles.dragging");
      expect(sourceFile).toContain("draggingItem.index");
      expect(sourceFile).toContain("hoverItem");
    });

    it("should set borderRadius on cover items", () => {
      expect(sourceFile).toContain("borderRadius: borderRadius");
    });

    it("should handle onDrop event", () => {
      expect(sourceFile).toContain("onDrop(i)");
    });

    it("should handle onDragOver event with preventDefault", () => {
      expect(sourceFile).toContain("onDragOver");
      expect(sourceFile).toContain("e.preventDefault()");
      expect(sourceFile).toContain("setHoverItem(i)");
    });

    it("should handle onDragEnd event", () => {
      expect(sourceFile).toContain("onDragEnd");
      expect(sourceFile).toContain("resetDrag()");
    });
  });

  describe("empty item placeholder", () => {
    it("should render placeholder when hasData(item) is false", () => {
      expect(sourceFile).toContain("!hasData(item)");
    });

    it("should render item number in placeholder", () => {
      expect(sourceFile).toContain("i + 1");
    });

    it("should apply no-items class to placeholder", () => {
      expect(sourceFile).toContain("styles[\"no-items\"]");
    });

    it("should use isCircle for borderRadius when empty", () => {
      expect(sourceFile).toContain("isCircle ? \"100%\" : borderRadius");
    });

    it("should conditionally apply boxShadow based on showShadows", () => {
      expect(sourceFile).toContain("showShadows");
      expect(sourceFile).toContain("black 3px 3px 10px 0px");
    });
  });

  describe("item with data rendering", () => {
    it("should render delete button when hasData and draggingItem.index === -1", () => {
      expect(sourceFile).toContain("hasData(item) && draggingItem.index === -1");
      expect(sourceFile).toContain("id=\"remove\"");
    });

    it("should dispatch removeItem when delete is clicked", () => {
      expect(sourceFile).toContain("dispatch(removeItem(i))");
    });

    it("should render drag handle (move) when hasData and not dragging", () => {
      expect(sourceFile).toContain("styles.move");
      expect(sourceFile).toContain("/icons/drag.svg");
    });

    it("should render cover image when hasData", () => {
      expect(sourceFile).toContain("styles.cover");
      expect(sourceFile).toContain("item.cover");
      expect(sourceFile).toContain("alt=\"Cover\"");
    });

    it("should apply isCircle styling to cover image", () => {
      expect(sourceFile).toContain("isCircle ? \"100%\" : borderRadius");
      expect(sourceFile).toContain("isCircle ? 100 : \"unset\"");
    });

    it("should conditionally render cover-titles based on showTitles and Position.cover", () => {
      expect(sourceFile).toContain("showTitles && titlesPosition === Position.cover");
      expect(sourceFile).toContain("styles[\"cover-titles\"]");
    });

    it("should conditionally prepend number based on showNumbers", () => {
      expect(sourceFile).toContain("showNumbers");
      expect(sourceFile).toContain("item.title");
    });
  });

  describe("side titles rendering", () => {
    it("should conditionally render side-titles when titlesPosition === Position.side", () => {
      expect(sourceFile).toContain("showTitles && titlesPosition === Position.side");
      expect(sourceFile).toContain("styles[\"side-titles\"]");
    });

    it("should render 'Nothing here... yet!' when no items have data", () => {
      expect(sourceFile).toContain("Nothing here... yet!");
      expect(sourceFile).toContain("/icons/picture.svg");
    });

    it("should use chunk helper to group items into rows", () => {
      expect(sourceFile).toContain("chunk");
    });

    it("should render rows with columns in side titles", () => {
      expect(sourceFile).toContain("rowsArr");
      expect(sourceFile).toContain("rowItems");
    });
  });

  describe("drag and drop functionality", () => {
    it("should set draggable attribute based on hasData", () => {
      expect(sourceFile).toContain("draggable={hasData(item)}");
    });

    it("should call setDraggingItem on drag start", () => {
      expect(sourceFile).toContain("onDragStart");
      expect(sourceFile).toContain("origin: \"collection\"");
    });

    it("should handle click for drag selection when draggingItem.index === -1", () => {
      expect(sourceFile).toContain("draggingItem.index === -1");
    });

    it("should call onDrop on click when already dragging", () => {
      expect(sourceFile).toContain("onDrop(i)");
    });

    it("should guard click against remove button id", () => {
      expect(sourceFile).toContain('e?.target?.id !== "remove"');
    });
  });

  describe("CSS module usage", () => {
    it("should use styles.checkerboard", () => {
      expect(sourceFile).toContain("styles.checkerboard");
    });

    it("should use styles.content", () => {
      expect(sourceFile).toContain("styles.content");
    });

    it("should use styles.title", () => {
      expect(sourceFile).toContain("styles.title");
    });

    it("should use styles.cover", () => {
      expect(sourceFile).toContain("styles.cover");
    });

    it("should use styles.delete", () => {
      expect(sourceFile).toContain("styles.delete");
    });

    it("should use styles.icon", () => {
      expect(sourceFile).toContain("styles.icon");
    });

    it("should use styles.move", () => {
      expect(sourceFile).toContain("styles.move");
    });

    it("should use styles.dragging", () => {
      expect(sourceFile).toContain("styles.dragging");
    });

    it("should use styles[\"no-items\"]", () => {
      expect(sourceFile).toContain("styles[\"no-items\"]");
    });

    it("should use styles[\"cover-titles\"]", () => {
      expect(sourceFile).toContain("styles[\"cover-titles\"]");
    });

    it("should use styles[\"side-titles\"]", () => {
      expect(sourceFile).toContain("styles[\"side-titles\"]");
    });

    it("should use styles[\"big-icon\"]", () => {
      expect(sourceFile).toContain("styles[\"big-icon\"]");
    });
  });

  describe("image elements", () => {
    it("should render remove icon from /icons/remove.svg", () => {
      expect(sourceFile).toContain("/icons/remove.svg");
    });

    it("should render drag icon from /icons/drag.svg", () => {
      expect(sourceFile).toContain("/icons/drag.svg");
    });

    it("should render picture icon from /icons/picture.svg", () => {
      expect(sourceFile).toContain("/icons/picture.svg");
    });

    it("should use Image component for picture icon", () => {
      expect(sourceFile).toContain("<Image");
    });
  });
});
