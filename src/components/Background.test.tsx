import * as fs from "fs";
import * as path from "path";
import Background from "./Background";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "Background.tsx"),
  "utf-8"
);

describe("Background Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof Background).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should not accept any props", () => {
      expect(sourceFile).toMatch(/function\s+Background\s*\(\s*\)/);
    });
  });

  describe("imports", () => {
    it("should import styles from Background.module.css", () => {
      expect(sourceFile).toContain('from "@/styles/Background.module.css"');
      expect(sourceFile).toContain("styles");
    });
  });

  describe("rendered structure", () => {
    it("should render a root div with container style", () => {
      expect(sourceFile).toContain("styles.container");
    });

    it("should render a div for the dark layer", () => {
      expect(sourceFile).toContain("styles.dark");
    });

    it("should render a div for the light layer", () => {
      expect(sourceFile).toContain("styles.light");
    });

    it("should render exactly three div elements", () => {
      const divMatches = sourceFile.match(/<div/g);
      expect(divMatches).not.toBeNull();
      expect(divMatches!.length).toBe(3);
    });
  });

  describe("nesting", () => {
    it("should have dark and light divs nested inside the container div", () => {
      const containerIndex = sourceFile.indexOf("styles.container");
      const darkIndex = sourceFile.indexOf("styles.dark");
      const lightIndex = sourceFile.indexOf("styles.light");
      expect(darkIndex).toBeGreaterThan(containerIndex);
      expect(lightIndex).toBeGreaterThan(containerIndex);
    });
  });

  describe("styling", () => {
    it("should use CSS module styles for all three divs", () => {
      const styleMatches = sourceFile.match(/styles\./g);
      expect(styleMatches).not.toBeNull();
      expect(styleMatches!.length).toBe(3);
    });

    it("should apply className to each div", () => {
      const classNameMatches = sourceFile.match(/className=/g);
      expect(classNameMatches).not.toBeNull();
      expect(classNameMatches!.length).toBe(3);
    });
  });

  describe("no props or state", () => {
    it("should not use useState or any hooks", () => {
      expect(sourceFile).not.toContain("useState");
      expect(sourceFile).not.toContain("useEffect");
      expect(sourceFile).not.toContain("useContext");
    });

    it("should not accept or destructure any props", () => {
      expect(sourceFile).not.toMatch(/function\s+Background\s*\([^)]+\)/);
    });
  });

  describe("no children or content", () => {
    it("should not render any text content inside the divs", () => {
      const returnBlock = sourceFile.match(/return\s*\(([\s\S]*)\)/);
      expect(returnBlock).not.toBeNull();
      const innerContent = returnBlock![1]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, "")
        .trim();
      expect(innerContent).toBe("");
    });

    it("should have self-closing or empty inner divs", () => {
      expect(sourceFile).toMatch(/<div\s+className={styles\.dark}\s*\/>/);
      expect(sourceFile).toMatch(/<div\s+className={styles\.light}\s*\/>/);
    });
  });
});
