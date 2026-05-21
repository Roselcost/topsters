import * as fs from "fs";
import * as path from "path";
import Button from "./Button";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "Button.tsx"),
  "utf-8"
);

describe("Button Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof Button).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });
  });

  describe("imports", () => {
    it("should import styles from Button.module.css", () => {
      expect(sourceFile).toContain('from "@/styles/Button.module.css"');
      expect(sourceFile).toContain("styles");
    });
  });

  describe("props", () => {
    it("should have an onClick prop", () => {
      expect(sourceFile).toContain("onClick");
    });

    it("should have an optional selected prop", () => {
      expect(sourceFile).toMatch(/selected\?\s*:/);
    });

    it("should have a children prop", () => {
      expect(sourceFile).toContain("children");
    });
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      expect(sourceFile).toContain("<button");
    });

    it("should call onClick when the button is clicked", () => {
      expect(sourceFile).toContain("onClick={() => props.onClick()}");
    });

    it("should apply the base button class from styles", () => {
      expect(sourceFile).toContain("styles.button");
    });

    it("should conditionally apply the selected class", () => {
      expect(sourceFile).toContain("styles.selected");
    });

    it("should render children inside the button", () => {
      expect(sourceFile).toContain("{props.children}");
    });
  });

  describe("CSS module usage", () => {
    it("should use styles.button for the base class", () => {
      expect(sourceFile).toContain("styles.button");
    });

    it("should use styles.selected conditionally based on selected prop", () => {
      expect(sourceFile).toContain("props.selected && styles.selected");
    });
  });
});
