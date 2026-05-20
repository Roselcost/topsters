import * as fs from "fs";
import * as path from "path";
import Document from "./_document";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "_document.tsx"),
  "utf-8"
);

describe("Document Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof Document).toBe("function");
    });

    it("should have a displayName or name", () => {
      expect(Document.name).toBe("Document");
    });
  });

  describe("imports", () => {
    it("should import Html from next/document", () => {
      expect(sourceFile).toContain("Html");
      expect(sourceFile).toContain("next/document");
    });

    it("should import Head from next/document", () => {
      expect(sourceFile).toContain("Head");
    });

    it("should import Main from next/document", () => {
      expect(sourceFile).toContain("Main");
    });

    it("should import NextScript from next/document", () => {
      expect(sourceFile).toContain("NextScript");
    });
  });

  describe("HTML element", () => {
    it("should set lang attribute to 'en'", () => {
      expect(sourceFile).toContain('lang="en"');
    });

    it("should render Html as the root element", () => {
      expect(sourceFile).toContain("<Html");
    });
  });

  describe("Head element", () => {
    it("should render Head component", () => {
      expect(sourceFile).toContain("<Head");
    });

    it("should render Head as a self-closing tag", () => {
      expect(sourceFile).toMatch(/<Head\s*\/>/);
    });
  });

  describe("body element", () => {
    it("should render a body element", () => {
      expect(sourceFile).toContain("<body>");
      expect(sourceFile).toContain("</body>");
    });

    it("should render Main component inside body", () => {
      expect(sourceFile).toContain("<Main");
      expect(sourceFile).toContain("<Main />");
    });

    it("should render NextScript component inside body", () => {
      expect(sourceFile).toContain("<NextScript");
      expect(sourceFile).toContain("<NextScript />");
    });

    it("should render Main before NextScript", () => {
      const mainIndex = sourceFile.indexOf("<Main");
      const nextScriptIndex = sourceFile.indexOf("<NextScript");
      expect(mainIndex).toBeLessThan(nextScriptIndex);
    });
  });

  describe("dark mode detection script", () => {
    it("should include a script tag with dangerouslySetInnerHTML", () => {
      expect(sourceFile).toContain("dangerouslySetInnerHTML");
    });

    it("should use __html property for the script content", () => {
      expect(sourceFile).toContain("__html");
    });

    it("should check for prefers-color-scheme: dark", () => {
      expect(sourceFile).toContain("prefers-color-scheme: dark");
    });

    it("should use window.matchMedia for media query detection", () => {
      expect(sourceFile).toContain("window.matchMedia");
    });

    it("should set dark attribute on documentElement when dark mode is detected", () => {
      expect(sourceFile).toContain("document.documentElement.setAttribute");
      expect(sourceFile).toContain("'dark'");
      expect(sourceFile).toContain("'true'");
    });

    it("should render a script tag", () => {
      expect(sourceFile).toContain("<script");
      expect(sourceFile).toContain("dangerouslySetInnerHTML");
    });
  });

  describe("component rendering order", () => {
    it("should render Head before the dark mode script", () => {
      const headIndex = sourceFile.indexOf("<Head");
      const scriptIndex = sourceFile.indexOf("<script");
      expect(headIndex).toBeLessThan(scriptIndex);
    });

    it("should render the dark mode script before the body element", () => {
      const scriptIndex = sourceFile.indexOf("<script");
      const bodyIndex = sourceFile.indexOf("<body>");
      expect(scriptIndex).toBeLessThan(bodyIndex);
    });

    it("should render body after Head and script", () => {
      const headIndex = sourceFile.indexOf("<Head");
      const bodyIndex = sourceFile.indexOf("<body>");
      expect(headIndex).toBeLessThan(bodyIndex);
    });
  });

  describe("JSX structure", () => {
    it("should use a return statement with JSX", () => {
      expect(sourceFile).toContain("return");
      expect(sourceFile).toContain("(");
    });

    it("should use parentheses for JSX wrapping", () => {
      expect(sourceFile).toMatch(/return\s*\(/);
    });
  });

  describe("export", () => {
    it("should use default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should export a function", () => {
      expect(sourceFile).toMatch(/export\s+default\s+function/);
    });
  });
});
