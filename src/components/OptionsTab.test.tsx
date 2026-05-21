import * as fs from "fs";
import * as path from "path";
import OptionsTab from "./OptionsTab";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "OptionsTab.tsx"),
  "utf-8"
);

describe("OptionsTab Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof OptionsTab).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should accept darkTheme and toggleTheme props", () => {
      expect(sourceFile).toContain("darkTheme");
      expect(sourceFile).toContain("toggleTheme");
    });

    it("should define an OptionsTabProps interface", () => {
      expect(sourceFile).toContain("interface OptionsTabProps");
    });
  });

  describe("imports", () => {
    it("should import React from react", () => {
      expect(sourceFile).toContain('from "react"');
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

    it("should import styles from OptionsTab.module.css", () => {
      expect(sourceFile).toContain('from "../styles/OptionsTab.module.css"');
      expect(sourceFile).toContain("styles");
    });

    it("should import types from redux state", () => {
      expect(sourceFile).toContain('from "../redux/state"');
      expect(sourceFile).toContain("BackgroundType");
      expect(sourceFile).toContain("Direction");
      expect(sourceFile).toContain("Font");
      expect(sourceFile).toContain("Position");
      expect(sourceFile).toContain("State");
    });

    it("should import useDispatch and useSelector from react-redux", () => {
      expect(sourceFile).toContain('from "react-redux"');
      expect(sourceFile).toContain("useDispatch");
      expect(sourceFile).toContain("useSelector");
    });

    it("should import all required actions from redux store", () => {
      expect(sourceFile).toContain('from "@/redux/store"');
      expect(sourceFile).toContain("setBackgroundColor1");
      expect(sourceFile).toContain("setBackgroundColor2");
      expect(sourceFile).toContain("setBackgroundOpacity");
      expect(sourceFile).toContain("setBackgroundType");
      expect(sourceFile).toContain("setBorderColor");
      expect(sourceFile).toContain("setBorderRadius");
      expect(sourceFile).toContain("setBorderSize");
      expect(sourceFile).toContain("setColumns");
      expect(sourceFile).toContain("setFont");
      expect(sourceFile).toContain("setGap");
      expect(sourceFile).toContain("setGradientDirection");
      expect(sourceFile).toContain("setIsCircle");
      expect(sourceFile).toContain("setRows");
      expect(sourceFile).toContain("setShowNumbers");
      expect(sourceFile).toContain("setShowShadows");
      expect(sourceFile).toContain("setShowTitles");
      expect(sourceFile).toContain("setTextColor");
      expect(sourceFile).toContain("setTitle");
      expect(sourceFile).toContain("setTitlesPosition");
      expect(sourceFile).toContain("exportState");
      expect(sourceFile).toContain("importState");
      expect(sourceFile).toContain("restart");
      expect(sourceFile).toContain("setPreset");
    });
  });

  describe("state management", () => {
    it("should use dispatch hook", () => {
      expect(sourceFile).toContain("useDispatch()");
    });

    it("should use useSelector for title", () => {
      expect(sourceFile).toContain("useSelector((state: State) => state.title)");
    });

    it("should use useSelector for showTitles", () => {
      expect(sourceFile).toContain("useSelector((state: State) => state.showTitles)");
    });

    it("should use useSelector for rows", () => {
      expect(sourceFile).toContain("useSelector((state: State) => state.rows)");
    });

    it("should use useSelector for columns", () => {
      expect(sourceFile).toContain("useSelector((state: State) => state.columns)");
    });

    it("should use useSelector for backgroundType", () => {
      expect(sourceFile).toContain("useSelector((state: State) => state.backgroundType)");
    });

    it("should use useSelector for backgroundColor1", () => {
      expect(sourceFile).toContain("useSelector(");
      expect(sourceFile).toContain("state.backgroundColor1");
    });

    it("should use useSelector for backgroundColor2", () => {
      expect(sourceFile).toContain("state.backgroundColor2");
    });

    it("should use useSelector for backgroundOpacity", () => {
      expect(sourceFile).toContain("state.backgroundOpacity");
    });

    it("should use useSelector for gradientDirection", () => {
      expect(sourceFile).toContain("state.gradientDirection");
    });

    it("should use useSelector for gap", () => {
      expect(sourceFile).toContain("state.gap");
    });

    it("should use useSelector for borderColor", () => {
      expect(sourceFile).toContain("state.borderColor");
    });

    it("should use useSelector for isCircle", () => {
      expect(sourceFile).toContain("state.isCircle");
    });

    it("should use useSelector for borderSize", () => {
      expect(sourceFile).toContain("state.borderSize");
    });

    it("should use useSelector for borderRadius", () => {
      expect(sourceFile).toContain("state.borderRadius");
    });

    it("should use useSelector for showNumbers", () => {
      expect(sourceFile).toContain("state.showNumbers");
    });

    it("should use useSelector for showShadows", () => {
      expect(sourceFile).toContain("state.showShadows");
    });

    it("should use useSelector for font", () => {
      expect(sourceFile).toContain("state.font");
    });

    it("should use useSelector for textColor", () => {
      expect(sourceFile).toContain("state.textColor");
    });

    it("should use useSelector for titlesPosition", () => {
      expect(sourceFile).toContain("state.titlesPosition");
    });
  });

  describe("theme section", () => {
    it("should render a Theme label", () => {
      expect(sourceFile).toContain(">Theme<");
    });

    it("should render Selector with dark and light options", () => {
      expect(sourceFile).toContain('id: "dark"');
      expect(sourceFile).toContain('id: "light"');
      expect(sourceFile).toContain('name: "Dark"');
      expect(sourceFile).toContain('name: "Light"');
    });

    it("should include moon icon for dark theme", () => {
      expect(sourceFile).toContain('"/icons/moon.svg"');
    });

    it("should include sun icon for light theme", () => {
      expect(sourceFile).toContain('"/icons/sun.svg"');
    });

    it("should call toggleTheme when selection changes", () => {
      expect(sourceFile).toContain("toggleTheme()");
    });
  });

  describe("data section", () => {
    it("should render a Data label", () => {
      expect(sourceFile).toContain(">Data<");
    });

    it("should have a file input for import", () => {
      expect(sourceFile).toContain('type="file"');
      expect(sourceFile).toContain('id="file"');
    });

    it("should have an Import label styled as file upload", () => {
      expect(sourceFile).toContain('styles["file-upload"]');
      expect(sourceFile).toMatch(/>[\s\n]*Import[\s\n]*</);
    });

    it("should use FileReader to read imported file", () => {
      expect(sourceFile).toContain("new FileReader()");
      expect(sourceFile).toContain("reader.readAsText");
    });

    it("should dispatch importState action on file load", () => {
      expect(sourceFile).toContain("dispatch(importState");
    });

    it("should clear file input after import", () => {
      expect(sourceFile).toContain("e.target.value =");
    });

    it("should have an Export button that dispatches exportState", () => {
      expect(sourceFile).toContain("exportState()");
    });

    it("should have a Restart button that dispatches restart", () => {
      expect(sourceFile).toContain("dispatch(restart())");
    });

    it("should show confirmation dialog before restart", () => {
      expect(sourceFile).toContain("confirm(");
      expect(sourceFile).toContain("start over");
    });
  });

  describe("presets section", () => {
    it("should render a Presets label", () => {
      expect(sourceFile).toContain(">Presets<");
    });

    it("should have Topsters preset option", () => {
      expect(sourceFile).toContain('id: "Topsters"');
      expect(sourceFile).toContain('name: "Topsters"');
    });

    it("should have Museum preset option", () => {
      expect(sourceFile).toContain('id: "Museum"');
      expect(sourceFile).toContain('name: "Museum"');
    });

    it("should dispatch setPreset on preset change", () => {
      expect(sourceFile).toContain("dispatch(setPreset(value))");
    });
  });

  describe("rows and columns section", () => {
    it("should render a Rows label", () => {
      expect(sourceFile).toContain(">Rows<");
    });

    it("should render a Columns label", () => {
      expect(sourceFile).toContain(">Columns<");
    });

    it("should have a range input for rows with min 1 and max 10", () => {
      expect(sourceFile).toContain('type="range"');
      expect(sourceFile).toContain("min={1}");
      expect(sourceFile).toContain("max={10}");
    });

    it("should have a range input for columns with min 1 and max 10", () => {
      expect(sourceFile).toContain("min={1}");
      expect(sourceFile).toContain("max={10}");
    });

    it("should dispatch setRows on rows change", () => {
      expect(sourceFile).toContain("dispatch(setRows(");
    });

    it("should dispatch setColumns on columns change", () => {
      expect(sourceFile).toContain("dispatch(setColumns(");
    });

    it("should display current rows value", () => {
      expect(sourceFile).toContain("value={rows}");
    });

    it("should display current columns value", () => {
      expect(sourceFile).toContain("value={columns}");
    });

    it("should display rows value in range-value span", () => {
      expect(sourceFile).toContain("styles[\"range-value\"]");
    });

    it("should display columns value in range-value span", () => {
      const rangeValueMatches = sourceFile.match(/styles\["range-value"\]/g);
      expect(rangeValueMatches).not.toBeNull();
      expect(rangeValueMatches!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("title section", () => {
    it("should render a Title label", () => {
      expect(sourceFile).toContain(">Title<");
    });

    it("should have a text input for title", () => {
      expect(sourceFile).toContain('type="text"');
      expect(sourceFile).toContain('placeholder="Set a title..."');
    });

    it("should dispatch setTitle on title change", () => {
      expect(sourceFile).toContain("dispatch(setTitle(e.target.value))");
    });

    it("should bind title value to input", () => {
      expect(sourceFile).toContain("value={title}");
    });
  });

  describe("titles toggle section", () => {
    it("should render a Titles label", () => {
      expect(sourceFile).toContain(">Titles<");
    });

    it("should dispatch setShowTitles on button click", () => {
      expect(sourceFile).toContain("dispatch(setShowTitles(!showTitles))");
    });

    it("should show check icon when showTitles is true", () => {
      expect(sourceFile).toContain('src="/icons/check.svg"');
    });

    it("should show cancel icon when showTitles is false", () => {
      expect(sourceFile).toContain('src="/icons/cancel.svg"');
    });

    it("should pass selected prop to Button based on showTitles", () => {
      expect(sourceFile).toContain("selected={showTitles}");
    });
  });

  describe("numbers toggle section", () => {
    it("should render a Numbers label", () => {
      expect(sourceFile).toContain(">Numbers<");
    });

    it("should dispatch setShowNumbers on button click", () => {
      expect(sourceFile).toContain("dispatch(setShowNumbers(!showNumbers))");
    });

    it("should pass selected prop to Button based on showNumbers", () => {
      expect(sourceFile).toContain("selected={showNumbers}");
    });
  });

  describe("font section", () => {
    it("should render a Font label", () => {
      expect(sourceFile).toContain(">Font<");
    });

    it("should have Selector with monospace and lato options", () => {
      expect(sourceFile).toContain("Font.monospace");
      expect(sourceFile).toContain("Font.lato");
    });

    it("should dispatch setFont on selector change", () => {
      expect(sourceFile).toContain("dispatch(setFont(value))");
    });

    it("should have a text input for custom font", () => {
      expect(sourceFile).toContain('placeholder="Set a font..."');
    });

    it("should dispatch setFont on text input change", () => {
      expect(sourceFile).toContain("dispatch(setFont(e.target.value))");
    });

    it("should bind font value to text input", () => {
      expect(sourceFile).toContain("value={font}");
    });
  });

  describe("text color section", () => {
    it("should render a Color label for text color", () => {
      const colorLabelMatches = sourceFile.match(/>Color</g);
      expect(colorLabelMatches).not.toBeNull();
      expect(colorLabelMatches!.length).toBeGreaterThanOrEqual(3);
    });

    it("should have a color input for text color", () => {
      expect(sourceFile).toContain("type=\"color\"");
    });

    it("should dispatch setTextColor on color change", () => {
      expect(sourceFile).toContain("dispatch(setTextColor(value.target.value))");
    });

    it("should bind textColor value to input", () => {
      expect(sourceFile).toContain("value={textColor}");
    });
  });

  describe("titles position section", () => {
    it("should render a Position label", () => {
      expect(sourceFile).toContain(">Position<");
    });

    it("should have Selector with side and cover options", () => {
      expect(sourceFile).toContain("Position.side");
      expect(sourceFile).toContain("Position.cover");
    });

    it("should dispatch setTitlesPosition on change", () => {
      expect(sourceFile).toContain("dispatch(setTitlesPosition(value))");
    });
  });

  describe("background section", () => {
    it("should render a Background label", () => {
      expect(sourceFile).toContain(">Background<");
    });

    it("should have Selector with color, gradient, and radialGradient options", () => {
      expect(sourceFile).toContain("BackgroundType.color");
      expect(sourceFile).toContain("BackgroundType.gradient");
      expect(sourceFile).toContain("BackgroundType.radialGradient");
    });

    it("should display Radial as name for radialGradient", () => {
      expect(sourceFile).toContain('name: "Radial"');
    });

    it("should dispatch setBackgroundType on change", () => {
      expect(sourceFile).toContain("dispatch(setBackgroundType(value))");
    });
  });

  describe("gradient direction section", () => {
    it("should conditionally render direction selector when backgroundType is not color", () => {
      expect(sourceFile).toContain("backgroundType !== BackgroundType.color");
    });

    it("should render a Direction label", () => {
      expect(sourceFile).toContain(">Direction<");
    });

    it("should have all 9 direction options", () => {
      expect(sourceFile).toContain("Direction.topLeft");
      expect(sourceFile).toContain("Direction.top");
      expect(sourceFile).toContain("Direction.topRight");
      expect(sourceFile).toContain("Direction.left");
      expect(sourceFile).toContain("Direction.center");
      expect(sourceFile).toContain("Direction.right");
      expect(sourceFile).toContain("Direction.bottomLeft");
      expect(sourceFile).toContain("Direction.bottom");
      expect(sourceFile).toContain("Direction.bottomRight");
    });

    it("should include direction icons", () => {
      expect(sourceFile).toContain('"/icons/upleft.svg"');
      expect(sourceFile).toContain('"/icons/up.svg"');
      expect(sourceFile).toContain('"/icons/upright.svg"');
      expect(sourceFile).toContain('"/icons/left.svg"');
      expect(sourceFile).toContain('"/icons/center.svg"');
      expect(sourceFile).toContain('"/icons/right.svg"');
      expect(sourceFile).toContain('"/icons/downleft.svg"');
      expect(sourceFile).toContain('"/icons/down.svg"');
      expect(sourceFile).toContain('"/icons/downright.svg"');
    });

    it("should dispatch setGradientDirection on change", () => {
      expect(sourceFile).toContain("dispatch(setGradientDirection(value))");
    });

    it("should set hideLabel to true for direction options", () => {
      expect(sourceFile).toContain("hideLabel: true");
    });
  });

  describe("background opacity section", () => {
    it("should render an Opacity label", () => {
      expect(sourceFile).toContain(">Opacity<");
    });

    it("should have a range input with min 0 and max 16", () => {
      expect(sourceFile).toContain("min={0}");
      expect(sourceFile).toContain("max={16}");
    });

    it("should dispatch setBackgroundOpacity on change", () => {
      expect(sourceFile).toContain("dispatch(setBackgroundOpacity(");
    });

    it("should display current backgroundOpacity value", () => {
      expect(sourceFile).toContain("value={backgroundOpacity}");
    });
  });

  describe("background color section", () => {
    it("should have a color input for backgroundColor1", () => {
      expect(sourceFile).toContain("dispatch(setBackgroundColor1(value.target.value))");
    });

    it("should conditionally render backgroundColor2 input when not color type", () => {
      expect(sourceFile).toContain("backgroundType !== BackgroundType.color");
    });

    it("should dispatch setBackgroundColor2 on change", () => {
      expect(sourceFile).toContain("dispatch(setBackgroundColor2(value.target.value))");
    });

    it("should bind backgroundColor1 value to input", () => {
      expect(sourceFile).toContain("value={backgroundColor1}");
    });

    it("should bind backgroundColor2 value to input", () => {
      expect(sourceFile).toContain("value={backgroundColor2}");
    });
  });

  describe("border section", () => {
    it("should render a Border label", () => {
      expect(sourceFile).toContain(">Border<");
    });

    it("should have a range input for borderSize with min 0 and max 20", () => {
      expect(sourceFile).toContain("min={0}");
      expect(sourceFile).toContain("max={20}");
    });

    it("should dispatch setBorderSize on change", () => {
      expect(sourceFile).toContain("dispatch(setBorderSize(");
    });

    it("should display current borderSize value", () => {
      expect(sourceFile).toContain("value={borderSize}");
    });
  });

  describe("border radius section", () => {
    it("should render a Radius label", () => {
      expect(sourceFile).toContain(">Radius<");
    });

    it("should have a range input for borderRadius with min 0 and max 20", () => {
      expect(sourceFile).toContain("min={0}");
      expect(sourceFile).toContain("max={20}");
    });

    it("should dispatch setBorderRadius on change", () => {
      expect(sourceFile).toContain("dispatch(setBorderRadius(");
    });

    it("should display current borderRadius value", () => {
      expect(sourceFile).toContain("value={borderRadius}");
    });
  });

  describe("circle toggle section", () => {
    it("should render a Circle label", () => {
      expect(sourceFile).toContain(">Circle<");
    });

    it("should dispatch setIsCircle on button click", () => {
      expect(sourceFile).toContain("dispatch(setIsCircle(!isCircle))");
    });

    it("should pass selected prop to Button based on isCircle", () => {
      expect(sourceFile).toContain("selected={isCircle}");
    });
  });

  describe("border color section", () => {
    it("should have a color input for borderColor", () => {
      expect(sourceFile).toContain("dispatch(setBorderColor(value.target.value))");
    });

    it("should bind borderColor value to input", () => {
      expect(sourceFile).toContain("value={borderColor}");
    });
  });

  describe("gap section", () => {
    it("should render a Gap label", () => {
      expect(sourceFile).toContain(">Gap<");
    });

    it("should have a range input for gap with min 0 and max 50", () => {
      expect(sourceFile).toContain("min={0}");
      expect(sourceFile).toContain("max={50}");
    });

    it("should dispatch setGap on change", () => {
      expect(sourceFile).toContain("dispatch(setGap(");
    });

    it("should display current gap value", () => {
      expect(sourceFile).toContain("value={gap}");
    });
  });

  describe("shadows toggle section", () => {
    it("should render a Shadows label", () => {
      expect(sourceFile).toContain(">Shadows<");
    });

    it("should dispatch setShowShadows on button click", () => {
      expect(sourceFile).toContain("dispatch(setShowShadows(!showShadows))");
    });

    it("should pass selected prop to Button based on showShadows", () => {
      expect(sourceFile).toContain("selected={showShadows}");
    });
  });

  describe("CSS module usage", () => {
    it("should use styles[\"input-group\"] class", () => {
      expect(sourceFile).toContain('styles["input-group"]');
    });

    it("should use styles.input class", () => {
      expect(sourceFile).toContain("styles.input");
    });

    it("should use styles[\"input-label\"] class", () => {
      expect(sourceFile).toContain('styles["input-label"]');
    });

    it("should use styles.values class", () => {
      expect(sourceFile).toContain("styles.values");
    });

    it("should use styles.value class for inputs", () => {
      expect(sourceFile).toContain("styles.value");
    });

    it("should use styles[\"range-value\"] class", () => {
      expect(sourceFile).toContain('styles["range-value"]');
    });

    it("should use styles.icon class", () => {
      expect(sourceFile).toContain("styles.icon");
    });
  });

  describe("conditional styling", () => {
    it("should apply animate-opacity class to root div", () => {
      expect(sourceFile).toContain("animate-opacity");
    });

    it("should use inline style for font section height", () => {
      expect(sourceFile).toContain('height: "88px"');
    });

    it("should use inline style for direction section height", () => {
      expect(sourceFile).toContain('height: "136px"');
    });

    it("should use inline style for flex gap in data section", () => {
      expect(sourceFile).toContain("display: \"flex\"");
      expect(sourceFile).toContain("gap: \"8px\"");
    });

    it("should use inline style for centering direction values", () => {
      expect(sourceFile).toContain('justifyContent: "center"');
    });
  });

  describe("Image components", () => {
    it("should render multiple Image components for toggle icons", () => {
      const imageMatches = sourceFile.match(/<Image/g);
      expect(imageMatches).not.toBeNull();
      expect(imageMatches!.length).toBeGreaterThanOrEqual(8);
    });

    it("should provide width and height of 10 for toggle icons", () => {
      expect(sourceFile).toContain("width={10}");
      expect(sourceFile).toContain("height={10}");
    });

    it("should provide alt text for check icon", () => {
      expect(sourceFile).toContain('alt="Check"');
    });

    it("should provide alt text for cancel icon", () => {
      expect(sourceFile).toContain('alt="Cancel"');
    });
  });

  describe("root structure", () => {
    it("should render a root div wrapping all content", () => {
      expect(sourceFile).toMatch(/<div[^>]*animate-opacity[^>]*>/);
    });

    it("should have multiple input-group sections", () => {
      const inputGroupMatches = sourceFile.match(/styles\["input-group"\]/g);
      expect(inputGroupMatches).not.toBeNull();
      expect(inputGroupMatches!.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe("parseInt usage for numeric inputs", () => {
    it("should use parseInt for rows input", () => {
      expect(sourceFile).toContain("parseInt(value.target.value)");
    });

    it("should use parseInt for columns input", () => {
      const parseIntMatches = sourceFile.match(/parseInt\(value\.target\.value\)/g);
      expect(parseIntMatches).not.toBeNull();
      expect(parseIntMatches!.length).toBeGreaterThanOrEqual(5);
    });
  });
});
