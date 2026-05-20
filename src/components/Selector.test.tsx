import * as fs from "fs";
import * as path from "path";
import Selector from "./Selector";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "Selector.tsx"),
  "utf-8"
);

describe("Selector Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof Selector).toBe("function");
    });

    it("should be the default export", () => {
      expect(sourceFile).toContain("export default");
    });

    it("should define a Props interface", () => {
      expect(sourceFile).toContain("interface Props");
    });
  });

  describe("imports", () => {
    it("should import styles from Selector.module.css", () => {
      expect(sourceFile).toContain('from "@/styles/Selector.module.css"');
      expect(sourceFile).toContain("styles");
    });

    it("should import Image from next/image", () => {
      expect(sourceFile).toContain('from "next/image"');
      expect(sourceFile).toContain("Image");
    });
  });

  describe("Props interface", () => {
    it("should have an optional label prop of type string", () => {
      expect(sourceFile).toMatch(/label\?\s*:\s*string/);
    });

    it("should have an options prop that is an array of objects", () => {
      expect(sourceFile).toContain("options");
    });

    it("should define option objects with id, name, icon, and hideLabel fields", () => {
      expect(sourceFile).toContain("id:");
      expect(sourceFile).toContain("name:");
      expect(sourceFile).toContain("icon");
      expect(sourceFile).toContain("hideLabel");
    });

    it("should have a selected prop that is an array", () => {
      expect(sourceFile).toMatch(/selected\s*:\s*\{\}\[\]/);
    });

    it("should have an onChange prop that is a function", () => {
      expect(sourceFile).toContain("onChange");
    });
  });

  describe("rendering", () => {
    it("should render a root div with styles.options class", () => {
      expect(sourceFile).toContain("styles.options");
    });

    it("should conditionally set width style when label is 'Gradient direction'", () => {
      expect(sourceFile).toContain('label === "Gradient direction"');
      expect(sourceFile).toContain('"144px"');
    });

    it("should map over options to render each option", () => {
      expect(sourceFile).toContain("options.map");
    });

    it("should use option index as key", () => {
      expect(sourceFile).toContain("key={i}");
    });
  });

  describe("radio input", () => {
    it("should render a radio input for each option", () => {
      expect(sourceFile).toContain('type={"radio"}');
    });

    it("should hide the radio input with display none", () => {
      expect(sourceFile).toContain('display: "none"');
    });

    it("should set the input id using label and option name", () => {
      expect(sourceFile).toContain("id={label + option.name}");
    });

    it("should set the input name using label", () => {
      expect(sourceFile).toContain("name={label}");
    });

    it("should set the input value to option name", () => {
      expect(sourceFile).toContain("value={option.name}");
    });

    it("should check the input based on selected array", () => {
      expect(sourceFile).toContain("checked={selected.includes(option.id)}");
    });

    it("should call onChange with option.id when input changes", () => {
      expect(sourceFile).toContain("onChange(option.id)");
    });

    it("should guard onChange with optional chaining", () => {
      expect(sourceFile).toContain("onChange && onChange");
    });
  });

  describe("label element", () => {
    it("should render a label htmlFor the radio input", () => {
      expect(sourceFile).toContain("htmlFor={label + option.name}");
    });

    it("should apply styles.label class to the label", () => {
      expect(sourceFile).toContain("styles.label");
    });
  });

  describe("icon rendering", () => {
    it("should conditionally render an Image when option has an icon", () => {
      expect(sourceFile).toContain("option.icon &&");
    });

    it("should render Image with width and height of 10", () => {
      expect(sourceFile).toContain("width={10}");
      expect(sourceFile).toContain("height={10}");
    });

    it("should apply styles.icon class to the Image", () => {
      expect(sourceFile).toContain("className={styles.icon}");
    });

    it("should set Image src to option.icon", () => {
      expect(sourceFile).toContain("src={option.icon}");
    });

    it("should set Image alt text using label and option name", () => {
      expect(sourceFile).toContain("alt={label + option.name}");
    });
  });

  describe("name display", () => {
    it("should conditionally render the option name span", () => {
      expect(sourceFile).toContain("!!option.name");
    });

    it("should hide label when hideLabel is true", () => {
      expect(sourceFile).toContain("!option.hideLabel");
    });

    it("should render option.name inside a span", () => {
      expect(sourceFile).toContain("<span>{option.name}</span>");
    });
  });

  describe("CSS module usage", () => {
    it("should use styles.options for the root container", () => {
      expect(sourceFile).toContain("styles.options");
    });

    it("should use styles.label for option labels", () => {
      expect(sourceFile).toContain("styles.label");
    });

    it("should use styles.icon for option icons", () => {
      expect(sourceFile).toContain("styles.icon");
    });
  });
});
