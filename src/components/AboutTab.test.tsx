import * as fs from "fs";
import * as path from "path";
import AboutTab from "./AboutTab";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "AboutTab.tsx"),
  "utf-8"
);

describe("AboutTab Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof AboutTab).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should not accept any props", () => {
      expect(sourceFile).toMatch(/function\s+AboutTab\s*\(\s*\)/);
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

    it("should import styles from AboutTab.module.css", () => {
      expect(sourceFile).toContain('from "../styles/AboutTab.module.css"');
      expect(sourceFile).toContain("styles");
    });
  });

  describe("content structure", () => {
    it("should render a root div with animate-opacity class", () => {
      expect(sourceFile).toContain("animate-opacity");
    });

    it("should apply input-group style from CSS module", () => {
      expect(sourceFile).toContain('styles["input-group"]');
    });

    it("should contain an about div with CSS module style", () => {
      expect(sourceFile).toContain("styles.about");
    });

    it("should contain three paragraph elements", () => {
      const pMatches = sourceFile.match(/<p>/g);
      expect(pMatches).not.toBeNull();
      expect(pMatches!.length).toBe(3);
    });
  });

  describe("text content", () => {
    it("should mention Topsters 3", () => {
      expect(sourceFile).toContain("Topsters 3");
    });

    it("should reference topsters.org", () => {
      expect(sourceFile).toContain("topsters.org");
    });

    it("should mention Topsters 1 and 2", () => {
      expect(sourceFile).toContain("Topsters 1 and 2");
    });

    it("should mention Topsters 5", () => {
      expect(sourceFile).toContain("Topsters 5");
    });

    it("should have a Data sources heading", () => {
      expect(sourceFile).toContain("<h2>Data sources</h2>");
    });
  });

  describe("external links", () => {
    it("should link to topsters.org", () => {
      expect(sourceFile).toContain('href="https://topsters.org"');
    });

    it("should link to the GitHub repo", () => {
      expect(sourceFile).toContain(
        'href="https://github.com/roselcost/topsters"'
      );
    });

    it("should open GitHub link in a new tab", () => {
      expect(sourceFile).toContain('target="_blank"');
    });
  });

  describe("data source links", () => {
    it("should have a link-container div", () => {
      expect(sourceFile).toContain('styles["link-container"]');
    });

    it("should render four data source link buttons", () => {
      const linkButtonMatches = sourceFile.match(/styles\["link-button"\]/g);
      expect(linkButtonMatches).not.toBeNull();
      expect(linkButtonMatches!.length).toBe(4);
    });

    it("should render link-icon divs for each data source", () => {
      const linkIconMatches = sourceFile.match(/styles\["link-icon"\]/g);
      expect(linkIconMatches).not.toBeNull();
      expect(linkIconMatches!.length).toBe(4);
    });
  });

  describe("IGDB data source", () => {
    it("should link to igdb.com", () => {
      expect(sourceFile).toContain('href="https://igdb.com"');
    });

    it("should display IGDB label", () => {
      expect(sourceFile).toContain("<span>IGDB</span>");
    });

    it("should use controller icon", () => {
      expect(sourceFile).toContain('src={"/icons/controller.svg"}');
      expect(sourceFile).toContain('alt={"controller"}');
    });
  });

  describe("Last.fm data source", () => {
    it("should link to last.fm", () => {
      expect(sourceFile).toContain('href="https://last.fm"');
    });

    it("should display Last.fm label", () => {
      expect(sourceFile).toContain("<span>Last.fm</span>");
    });

    it("should use music icon", () => {
      expect(sourceFile).toContain('src={"/icons/music.svg"}');
      expect(sourceFile).toContain('alt={"music"}');
    });
  });

  describe("The Movie Database data source", () => {
    it("should link to themoviedb.org", () => {
      expect(sourceFile).toContain('href="https://www.themoviedb.org"');
    });

    it("should display The Movie Database label", () => {
      expect(sourceFile).toContain("<span>The Movie Database</span>");
    });

    it("should use tv icon", () => {
      expect(sourceFile).toContain('src={"/icons/tv.svg"}');
      expect(sourceFile).toContain('alt={"tv"}');
    });
  });

  describe("Open Library data source", () => {
    it("should link to openlibrary.org", () => {
      expect(sourceFile).toContain('href="https://openlibrary.org"');
    });

    it("should display Open Library label", () => {
      expect(sourceFile).toContain("<span>Open Library</span>");
    });

    it("should use book icon", () => {
      expect(sourceFile).toContain('src={"/icons/book.svg"}');
      expect(sourceFile).toContain('alt={"book"}');
    });
  });

  describe("Image component usage", () => {
    it("should render four Image components", () => {
      const imageMatches = sourceFile.match(/<Image/g);
      expect(imageMatches).not.toBeNull();
      expect(imageMatches!.length).toBe(4);
    });

    it("should set icon dimensions to 10x10", () => {
      expect(sourceFile).toContain("width={10}");
      expect(sourceFile).toContain("height={10}");
    });

    it("should apply icon style from CSS module", () => {
      expect(sourceFile).toContain("styles.icon");
    });
  });

  describe("styling", () => {
    it("should use CSS module styles throughout", () => {
      const styleMatches = sourceFile.match(/styles\./g);
      expect(styleMatches).not.toBeNull();
      expect(styleMatches!.length).toBeGreaterThanOrEqual(3);
    });

    it("should combine animate-opacity class with CSS module class", () => {
      expect(sourceFile).toContain(
        '`animate-opacity ${styles["input-group"]}`'
      );
    });
  });

  describe("accessibility", () => {
    it("should provide alt text for all images", () => {
      const altMatches = sourceFile.match(/alt=\{/g);
      expect(altMatches).not.toBeNull();
      expect(altMatches!.length).toBe(4);
    });
  });

  describe("link behavior", () => {
    it("should open all data source links in new tabs", () => {
      const targetBlankMatches = sourceFile.match(/target="_blank"/g);
      expect(targetBlankMatches).not.toBeNull();
      expect(targetBlankMatches!.length).toBe(5);
    });

    it("should use anchor tags for links", () => {
      const anchorMatches = sourceFile.match(/<a\s/g);
      expect(anchorMatches).not.toBeNull();
      expect(anchorMatches!.length).toBe(6);
    });
  });
});
