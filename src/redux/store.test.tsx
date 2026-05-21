import {
  stateSlice,
  setTitle,
  setShowTitles,
  setRows,
  setColumns,
  setBackgroundType,
  setBackgroundColor1,
  setBackgroundColor2,
  setBackgroundOpacity,
  setGradientDirection,
  setGap,
  setBorderColor,
  setIsCircle,
  setBorderSize,
  setBorderRadius,
  setShowNumbers,
  setShowShadows,
  setFont,
  setTextColor,
  setTitlesPosition,
  addItem,
  swapItem,
  removeItem,
  setPreset,
  restart,
} from "./store";
import { BackgroundType, Direction, Font, Position, State, Item } from "./state";

const { importState } = stateSlice.actions;

const { reducer } = stateSlice;

const createInitialState = (): State => ({
  title: "",
  showTitles: true,
  rows: 5,
  columns: 5,
  backgroundType: BackgroundType.color,
  backgroundColor1: "#000000",
  backgroundColor2: "#000000",
  backgroundOpacity: 16,
  gradientDirection: Direction.right,
  gap: 20,
  borderColor: "#cccccc",
  isCircle: false,
  borderSize: 0,
  borderRadius: 0,
  showNumbers: false,
  showShadows: false,
  font: Font.monospace,
  textColor: "#ffffff",
  titlesPosition: Position.side,
  items: Array.from({ length: 100 }, () => ({ title: "", cover: "" })),
});

describe("Redux Store", () => {
  describe("initial state", () => {
    it("should have correct default values", () => {
      const state = reducer(undefined, { type: "unknown" });
      expect(state.title).toBe("");
      expect(state.showTitles).toBe(true);
      expect(state.rows).toBe(5);
      expect(state.columns).toBe(5);
      expect(state.backgroundType).toBe(BackgroundType.color);
      expect(state.backgroundColor1).toBe("#000000");
      expect(state.backgroundColor2).toBe("#000000");
      expect(state.backgroundOpacity).toBe(16);
      expect(state.gradientDirection).toBe(Direction.right);
      expect(state.gap).toBe(20);
      expect(state.borderColor).toBe("#cccccc");
      expect(state.isCircle).toBe(false);
      expect(state.borderSize).toBe(0);
      expect(state.borderRadius).toBe(0);
      expect(state.showNumbers).toBe(false);
      expect(state.showShadows).toBe(false);
      expect(state.font).toBe(Font.monospace);
      expect(state.textColor).toBe("#ffffff");
      expect(state.titlesPosition).toBe(Position.side);
      expect(state.items).toHaveLength(100);
    });

    it("should initialize all items with empty title and cover", () => {
      const state = reducer(undefined, { type: "unknown" });
      state.items.forEach((item) => {
        expect(item.title).toBe("");
        expect(item.cover).toBe("");
      });
    });
  });

  describe("setTitle", () => {
    it("should set the title", () => {
      const state = reducer(createInitialState(), setTitle("My Title"));
      expect(state.title).toBe("My Title");
    });

    it("should handle empty string", () => {
      const state = reducer(createInitialState(), setTitle(""));
      expect(state.title).toBe("");
    });
  });

  describe("setShowTitles", () => {
    it("should set showTitles to true", () => {
      const state = reducer(createInitialState(), setShowTitles(true));
      expect(state.showTitles).toBe(true);
    });

    it("should set showTitles to false", () => {
      const state = reducer(createInitialState(), setShowTitles(false));
      expect(state.showTitles).toBe(false);
    });
  });

  describe("setRows", () => {
    it("should set rows", () => {
      const state = reducer(createInitialState(), setRows(10));
      expect(state.rows).toBe(10);
    });
  });

  describe("setColumns", () => {
    it("should set columns", () => {
      const state = reducer(createInitialState(), setColumns(8));
      expect(state.columns).toBe(8);
    });
  });

  describe("setBackgroundType", () => {
    it("should set background type to gradient", () => {
      const state = reducer(createInitialState(), setBackgroundType(BackgroundType.gradient));
      expect(state.backgroundType).toBe(BackgroundType.gradient);
    });

    it("should set background type to radialGradient", () => {
      const state = reducer(createInitialState(), setBackgroundType(BackgroundType.radialGradient));
      expect(state.backgroundType).toBe(BackgroundType.radialGradient);
    });
  });

  describe("setBackgroundColor1", () => {
    it("should set background color 1", () => {
      const state = reducer(createInitialState(), setBackgroundColor1("#ff0000"));
      expect(state.backgroundColor1).toBe("#ff0000");
    });
  });

  describe("setBackgroundColor2", () => {
    it("should set background color 2", () => {
      const state = reducer(createInitialState(), setBackgroundColor2("#00ff00"));
      expect(state.backgroundColor2).toBe("#00ff00");
    });
  });

  describe("setBackgroundOpacity", () => {
    it("should set background opacity", () => {
      const state = reducer(createInitialState(), setBackgroundOpacity(50));
      expect(state.backgroundOpacity).toBe(50);
    });
  });

  describe("setGradientDirection", () => {
    it("should set gradient direction", () => {
      const state = reducer(createInitialState(), setGradientDirection(Direction.topLeft));
      expect(state.gradientDirection).toBe(Direction.topLeft);
    });
  });

  describe("setGap", () => {
    it("should set gap", () => {
      const state = reducer(createInitialState(), setGap(30));
      expect(state.gap).toBe(30);
    });
  });

  describe("setBorderColor", () => {
    it("should set border color", () => {
      const state = reducer(createInitialState(), setBorderColor("#ff00ff"));
      expect(state.borderColor).toBe("#ff00ff");
    });
  });

  describe("setIsCircle", () => {
    it("should set isCircle to true", () => {
      const state = reducer(createInitialState(), setIsCircle(true));
      expect(state.isCircle).toBe(true);
    });

    it("should set isCircle to false", () => {
      const state = reducer(createInitialState(), setIsCircle(false));
      expect(state.isCircle).toBe(false);
    });
  });

  describe("setBorderSize", () => {
    it("should set border size", () => {
      const state = reducer(createInitialState(), setBorderSize(5));
      expect(state.borderSize).toBe(5);
    });
  });

  describe("setBorderRadius", () => {
    it("should set border radius", () => {
      const state = reducer(createInitialState(), setBorderRadius(12));
      expect(state.borderRadius).toBe(12);
    });
  });

  describe("setShowNumbers", () => {
    it("should set showNumbers to true", () => {
      const state = reducer(createInitialState(), setShowNumbers(true));
      expect(state.showNumbers).toBe(true);
    });

    it("should set showNumbers to false", () => {
      const state = reducer(createInitialState(), setShowNumbers(false));
      expect(state.showNumbers).toBe(false);
    });
  });

  describe("setShowShadows", () => {
    it("should set showShadows to true", () => {
      const state = reducer(createInitialState(), setShowShadows(true));
      expect(state.showShadows).toBe(true);
    });

    it("should set showShadows to false", () => {
      const state = reducer(createInitialState(), setShowShadows(false));
      expect(state.showShadows).toBe(false);
    });
  });

  describe("setFont", () => {
    it("should set font to lato", () => {
      const state = reducer(createInitialState(), setFont(Font.lato));
      expect(state.font).toBe(Font.lato);
    });

    it("should set font to custom string", () => {
      const state = reducer(createInitialState(), setFont("Arial"));
      expect(state.font).toBe("Arial");
    });
  });

  describe("setTextColor", () => {
    it("should set text color", () => {
      const state = reducer(createInitialState(), setTextColor("#000000"));
      expect(state.textColor).toBe("#000000");
    });
  });

  describe("setTitlesPosition", () => {
    it("should set titles position to cover", () => {
      const state = reducer(createInitialState(), setTitlesPosition(Position.cover));
      expect(state.titlesPosition).toBe(Position.cover);
    });

    it("should set titles position to side", () => {
      const state = reducer(createInitialState(), setTitlesPosition(Position.side));
      expect(state.titlesPosition).toBe(Position.side);
    });
  });

  describe("addItem", () => {
    it("should add item at first empty slot when destinationIndex is -1", () => {
      const state = createInitialState();
      const newItem: Item = { title: "New Item", cover: "cover.jpg" };
      const newState = reducer(state, addItem({ item: newItem, destinationIndex: -1 }));
      expect(newState.items[0]).toEqual(newItem);
    });

    it("should add item at specific destinationIndex", () => {
      const state = createInitialState();
      const newItem: Item = { title: "New Item", cover: "cover.jpg" };
      const newState = reducer(state, addItem({ item: newItem, destinationIndex: 5 }));
      expect(newState.items[5]).toEqual(newItem);
    });

    it("should find first empty slot when destinationIndex is -1", () => {
      const state = createInitialState();
      state.items[0] = { title: "Existing", cover: "existing.jpg" };
      const newItem: Item = { title: "New Item", cover: "cover.jpg" };
      const newState = reducer(state, addItem({ item: newItem, destinationIndex: -1 }));
      expect(newState.items[1]).toEqual(newItem);
    });
  });

  describe("swapItem", () => {
    it("should swap two items", () => {
      const state = createInitialState();
      state.items[0] = { title: "Item A", cover: "a.jpg" };
      state.items[1] = { title: "Item B", cover: "b.jpg" };

      const newState = reducer(
        state,
        swapItem({ item: state.items[0], sourceIndex: 0, destinationIndex: 1 })
      );

      expect(newState.items[0]).toEqual({ title: "Item B", cover: "b.jpg" });
      expect(newState.items[1]).toEqual({ title: "Item A", cover: "a.jpg" });
    });

    it("should handle swapping same index", () => {
      const state = createInitialState();
      state.items[0] = { title: "Item A", cover: "a.jpg" };

      const newState = reducer(
        state,
        swapItem({ item: state.items[0], sourceIndex: 0, destinationIndex: 0 })
      );

      expect(newState.items[0]).toEqual({ title: "Item A", cover: "a.jpg" });
    });
  });

  describe("removeItem", () => {
    it("should remove item by setting empty title and cover", () => {
      const state = createInitialState();
      state.items[5] = { title: "Item", cover: "item.jpg" };

      const newState = reducer(state, removeItem(5));

      expect(newState.items[5]).toEqual({ title: "", cover: "" });
    });
  });

  describe("setPreset - Topsters", () => {
    it("should apply Topsters preset", () => {
      const state = reducer(createInitialState(), setPreset("Topsters"));

      expect(state.rows).toBe(5);
      expect(state.columns).toBe(5);
      expect(state.showTitles).toBe(true);
      expect(state.backgroundType).toBe(BackgroundType.color);
      expect(state.backgroundColor1).toBe("#000000");
      expect(state.backgroundOpacity).toBe(16);
      expect(state.gap).toBe(20);
      expect(state.borderSize).toBe(0);
      expect(state.borderRadius).toBe(0);
      expect(state.isCircle).toBe(false);
      expect(state.showNumbers).toBe(true);
      expect(state.showShadows).toBe(false);
      expect(state.font).toBe(Font.monospace);
      expect(state.textColor).toBe("#ffffff");
      expect(state.titlesPosition).toBe(Position.side);
    });
  });

  describe("setPreset - Museum", () => {
    it("should apply Museum preset", () => {
      const state = reducer(createInitialState(), setPreset("Museum"));

      expect(state.rows).toBe(3);
      expect(state.columns).toBe(8);
      expect(state.showTitles).toBe(true);
      expect(state.backgroundType).toBe(BackgroundType.gradient);
      expect(state.gradientDirection).toBe(Direction.topRight);
      expect(state.backgroundColor1).toBe("#000000");
      expect(state.backgroundColor2).toBe("#2c313a");
      expect(state.backgroundOpacity).toBe(16);
      expect(state.gap).toBe(20);
      expect(state.borderSize).toBe(0);
      expect(state.borderRadius).toBe(8);
      expect(state.isCircle).toBe(false);
      expect(state.showNumbers).toBe(true);
      expect(state.showShadows).toBe(true);
      expect(state.font).toBe(Font.lato);
      expect(state.textColor).toBe("#ffffff");
      expect(state.titlesPosition).toBe(Position.cover);
    });
  });

  describe("setPreset - unknown preset", () => {
    it("should not modify state for unknown preset", () => {
      const state = createInitialState();
      const newState = reducer(state, setPreset("Unknown"));

      expect(newState).toEqual(state);
    });
  });

  describe("restart", () => {
    it("should reset state to initial values", () => {
      const modifiedState = createInitialState();
      modifiedState.title = "Modified";
      modifiedState.rows = 10;
      modifiedState.columns = 10;
      modifiedState.showTitles = false;
      modifiedState.items[0] = { title: "Item", cover: "item.jpg" };

      const newState = reducer(modifiedState, restart());

      expect(newState.title).toBe("");
      expect(newState.rows).toBe(5);
      expect(newState.columns).toBe(5);
      expect(newState.showTitles).toBe(true);
      expect(newState.items).toHaveLength(100);
      expect(newState.items[0]).toEqual({ title: "", cover: "" });
    });

    it("should reset all items to empty", () => {
      const modifiedState = createInitialState();
      for (let i = 0; i < 100; i++) {
        modifiedState.items[i] = { title: `Item ${i}`, cover: `cover${i}.jpg` };
      }

      const newState = reducer(modifiedState, restart());

      newState.items.forEach((item) => {
        expect(item.title).toBe("");
        expect(item.cover).toBe("");
      });
    });
  });

  describe("importState", () => {
    it("should import state from JSON string", () => {
      const state = createInitialState();
      const importedState = {
        title: "Imported",
        showTitles: false,
        rows: 3,
        columns: 3,
        backgroundType: BackgroundType.gradient,
        backgroundColor1: "#111111",
        backgroundColor2: "#222222",
        backgroundOpacity: 50,
        gradientDirection: Direction.bottom,
        gap: 10,
        borderColor: "#333333",
        isCircle: true,
        borderSize: 2,
        borderRadius: 4,
        showNumbers: true,
        showShadows: true,
        font: Font.lato,
        textColor: "#000000",
        titlesPosition: Position.cover,
        items: [{ title: "Imported Item", cover: "imported.jpg" }],
      };

      const mockEvent = {
        target: {
          result: JSON.stringify(importedState),
        },
      };

      const newState = reducer(state, importState(mockEvent as any));

      expect(newState.title).toBe("Imported");
      expect(newState.showTitles).toBe(false);
      expect(newState.rows).toBe(3);
      expect(newState.columns).toBe(3);
      expect(newState.items).toEqual([{ title: "Imported Item", cover: "imported.jpg" }]);
    });
  });

  describe("slice name", () => {
    it("should have correct slice name", () => {
      expect(stateSlice.name).toBe("state");
    });
  });

  describe("reducer immutability", () => {
    it("should not mutate the original state", () => {
      const state = createInitialState();
      const originalTitle = state.title;

      reducer(state, setTitle("New Title"));

      expect(state.title).toBe(originalTitle);
    });
  });
});
