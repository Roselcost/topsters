import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
  BackgroundType,
  Direction,
  Font,
  Game,
  Position,
  State,
} from "./state";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const gameArray = [];
for (let i = 0; i < 100; ++i) {
  gameArray.push({ title: "", cover: "" });
}

const initialState: State = {
  title: "",
  showTitles: true,
  rows: 5,
  columns: 5,
  backgroundType: BackgroundType.color,
  backgroundColor1: "#000000",
  backgroundColor2: "#000000",
  backgroundOpacity: 16,
  gradientDirection: Direction.right,
  gap: 10,
  showBorder: false,
  borderColor: "#cccccc",
  isCircle: false,
  borderSize: 1,
  borderRadius: 0,
  showNumbers: false,
  showShadows: false,
  font: Font.monospace,
  textColor: "#ffffff",
  titlesPosition: Position.side,
  games: gameArray,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setTitle: (state, value: { payload: string }) => {
      state.title = value.payload;
    },
    setShowTitles: (state, value: { payload: boolean }) => {
      state.showTitles = value.payload;
    },
    setRows: (state, value: { payload: number }) => {
      state.rows = value.payload;
    },
    setColumns: (state, value: { payload: number }) => {
      state.columns = value.payload;
    },
    setBackgroundType: (state, value: { payload: BackgroundType }) => {
      state.backgroundType = value.payload;
    },
    setBackgroundColor1: (state, value: { payload: string }) => {
      state.backgroundColor1 = value.payload;
    },
    setBackgroundColor2: (state, value: { payload: string }) => {
      state.backgroundColor2 = value.payload;
    },
    setBackgroundOpacity: (state, value: { payload: number }) => {
      state.backgroundOpacity = value.payload;
    },
    setGradientDirection: (state, value: { payload: Direction }) => {
      state.gradientDirection = value.payload;
    },
    setGap: (state, value: { payload: number }) => {
      state.gap = value.payload;
    },
    setShowBorder: (state, value: { payload: boolean }) => {
      state.showBorder = value.payload;
    },
    setBorderColor: (state, value: { payload: string }) => {
      state.borderColor = value.payload;
    },
    setIsCircle: (state, value: { payload: boolean }) => {
      state.isCircle = value.payload;
    },
    setBorderSize: (state, value: { payload: number }) => {
      state.borderSize = value.payload;
    },
    setBorderRadius: (state, value: { payload: number }) => {
      state.borderRadius = value.payload;
    },
    setShowNumbers: (state, value: { payload: boolean }) => {
      state.showNumbers = value.payload;
    },
    setShowShadows: (state, value: { payload: boolean }) => {
      state.showShadows = value.payload;
    },
    setFont: (state, value: { payload: Font | string }) => {
      state.font = value.payload;
    },
    setTextColor: (state, value: { payload: string }) => {
      state.textColor = value.payload;
    },
    setTitlesPosition: (state, value: { payload: Position }) => {
      state.titlesPosition = value.payload;
    },
    addGame: (state, value: { payload: { game: Game; index: number } }) => {
      if (value.payload.index === -1) {
        const firstIndex = state.games.findIndex((game) => !game.cover) ?? 0;
        state.games[firstIndex] = value.payload.game;
      } else state.games[value.payload.index] = value.payload.game;
    },
    swapGame: (
      state,
      value: {
        payload: {
          game: { title: string; cover: string; index: number };
          index: number;
        };
      }
    ) => {
      const toMove = state.games[value.payload.game.index];
      state.games[value.payload.game.index] = state.games[value.payload.index];
      state.games[value.payload.index] = toMove;
    },
    removeGame: (state, value: { payload: number }) => {
      state.games[value.payload] = { title: "", cover: "" };
    },
    setPreset: (state, value: { payload: string }) => {
      if (value.payload === "Topsters") {
        state.showTitles = true;
        state.rows = 5;
        state.columns = 5;
        state.backgroundType = BackgroundType.color;
        state.backgroundColor1 = "#000000";
        state.backgroundOpacity = 16;
        state.gap = 5;
        state.borderRadius = 0;
        state.isCircle = false;
        state.showBorder = false;
        state.showNumbers = true;
        state.showShadows = false;
        state.font = Font.monospace;
        state.textColor = "#ffffff";
        state.titlesPosition = Position.side;
      }
      if (value.payload === "Museum") {
        state.rows = 3;
        state.columns = 8;
        state.showTitles = true;
        state.backgroundType = BackgroundType.gradient;
        state.gradientDirection = Direction.topRight;
        state.backgroundColor1 = "#000000";
        state.backgroundColor2 = "#000000";
        state.backgroundOpacity = 0;
        state.gap = 5;
        state.showBorder = true;
        state.borderSize = 1;
        state.borderRadius = 8;
        state.isCircle = false;
        state.borderColor = "#000000";
        state.showNumbers = true;
        state.showShadows = true;
        state.font = Font.lato;
        state.textColor = "#ffffff";
        state.titlesPosition = Position.cover;
      }
    },
    importState: (state, value: { payload: any }) => {
      const fromFile = JSON.parse(value.payload.target.result);
      state.title = fromFile.title;
      state.showTitles = fromFile.showTitles;
      state.rows = fromFile.rows;
      state.columns = fromFile.columns;
      state.backgroundType = fromFile.backgroundType;
      state.backgroundColor1 = fromFile.backgroundColor1;
      state.backgroundColor2 = fromFile.backgroundColor2;
      state.backgroundOpacity = fromFile.backgroundOpacity;
      state.gradientDirection = fromFile.gradientDirection;
      state.gap = fromFile.gap;
      state.showBorder = fromFile.showBorder;
      state.borderColor = fromFile.borderColor;
      state.isCircle = fromFile.isCircle;
      state.borderSize = fromFile.borderSize;
      state.borderRadius = fromFile.borderRadius;
      state.showNumbers = fromFile.showNumbers;
      state.showShadows = fromFile.showShadows;
      state.font = fromFile.font;
      state.textColor = fromFile.textColor;
      state.titlesPosition = fromFile.titlesPosition;
      state.games = fromFile.games;
    },
    exportState: (state) => {
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(state));
      var downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "topsters.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    restart: (state) => {
      const gameArray = [];
      for (let i = 0; i < 100; ++i) {
        gameArray.push({ title: "", cover: "" });
      }
      state.title = initialState.title;
      state.showTitles = initialState.showTitles;
      state.rows = initialState.rows;
      state.columns = initialState.columns;
      state.backgroundType = initialState.backgroundType;
      state.backgroundColor1 = initialState.backgroundColor1;
      state.backgroundColor2 = initialState.backgroundColor2;
      state.backgroundOpacity = initialState.backgroundOpacity;
      state.gradientDirection = initialState.gradientDirection;
      state.gap = initialState.gap;
      state.showBorder = initialState.showBorder;
      state.borderColor = initialState.borderColor;
      state.isCircle = initialState.isCircle;
      state.borderSize = initialState.borderSize;
      state.borderRadius = initialState.borderRadius;
      state.showNumbers = initialState.showNumbers;
      state.showShadows = initialState.showShadows;
      state.font = initialState.font;
      state.textColor = initialState.textColor;
      state.titlesPosition = initialState.titlesPosition;
      state.games = gameArray;
    },
  },
});

export const {
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
  setShowBorder,
  setBorderColor,
  setIsCircle,
  setBorderSize,
  setBorderRadius,
  setShowNumbers,
  setShowShadows,
  setFont,
  setTextColor,
  setTitlesPosition,
  addGame,
  swapGame,
  removeGame,
  setPreset,
  exportState,
  importState,
  restart,
} = stateSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, stateSlice.reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
