import * as fs from "fs";
import * as path from "path";

jest.mock("@/styles/globals.css", () => ({}));

import App from "./_app";

const sourceFile = fs.readFileSync(
  path.join(__dirname, "_app.tsx"),
  "utf-8"
);

describe("App Component", () => {
  describe("component structure", () => {
    it("should be a function (React component)", () => {
      expect(typeof App).toBe("function");
    });

    it("should have a name", () => {
      expect(App.name).toBe("App");
    });
  });

  describe("imports", () => {
    it("should import store from @/redux/store", () => {
      expect(sourceFile).toContain("store");
      expect(sourceFile).toContain("@/redux/store");
    });

    it("should import persistor from @/redux/store", () => {
      expect(sourceFile).toContain("persistor");
    });

    it("should import global styles", () => {
      expect(sourceFile).toContain("@/styles/globals.css");
    });

    it("should import AppProps from next/app", () => {
      expect(sourceFile).toContain("AppProps");
      expect(sourceFile).toContain("next/app");
    });

    it("should import Provider from react-redux", () => {
      expect(sourceFile).toContain("Provider");
      expect(sourceFile).toContain("react-redux");
    });

    it("should import PersistGate from redux-persist/integration/react", () => {
      expect(sourceFile).toContain("PersistGate");
      expect(sourceFile).toContain("redux-persist/integration/react");
    });
  });

  describe("Provider component", () => {
    it("should render Provider as the root element", () => {
      expect(sourceFile).toContain("<Provider");
    });

    it("should pass store prop to Provider", () => {
      expect(sourceFile).toContain("store={store}");
    });
  });

  describe("PersistGate component", () => {
    it("should render PersistGate inside Provider", () => {
      expect(sourceFile).toContain("<PersistGate");
    });

    it("should pass loading={null} to PersistGate", () => {
      expect(sourceFile).toContain("loading={null}");
    });

    it("should pass persistor prop to PersistGate", () => {
      expect(sourceFile).toContain("persistor={persistor}");
    });
  });

  describe("Component rendering", () => {
    it("should render Component inside PersistGate", () => {
      expect(sourceFile).toContain("<Component");
    });

    it("should spread pageProps onto Component", () => {
      expect(sourceFile).toContain("{...pageProps}");
    });
  });

  describe("component rendering order", () => {
    it("should render Provider before PersistGate", () => {
      const providerIndex = sourceFile.indexOf("<Provider");
      const persistGateIndex = sourceFile.indexOf("<PersistGate");
      expect(providerIndex).toBeLessThan(persistGateIndex);
    });

    it("should render PersistGate before Component", () => {
      const persistGateIndex = sourceFile.indexOf("<PersistGate");
      const componentIndex = sourceFile.indexOf("<Component");
      expect(persistGateIndex).toBeLessThan(componentIndex);
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
