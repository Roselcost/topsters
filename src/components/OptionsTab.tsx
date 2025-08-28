import React from "react";
import Image from "next/image";
import Button from "./Button";
import Selector from "./Selector";
import styles from "../styles/OptionsTab.module.css";
import {
  BackgroundType,
  Direction,
  Font,
  Position,
  State,
} from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackgroundColor1,
  setBackgroundColor2,
  setBackgroundOpacity,
  setBackgroundType,
  setBorderColor,
  setBorderRadius,
  setBorderSize,
  setColumns,
  setFont,
  setGap,
  setGradientDirection,
  setIsCircle,
  setRows,
  setShowNumbers,
  setShowShadows,
  setShowTitles,
  setTextColor,
  setTitle,
  setTitlesPosition,
  exportState,
  importState,
  restart,
  setPreset,
} from "@/redux/store";

interface OptionsTabProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}
export default function OptionsTab({
  darkTheme,
  toggleTheme,
}: OptionsTabProps) {
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.title);
  const showTitles = useSelector((state: State) => state.showTitles);
  const rows = useSelector((state: State) => state.rows);
  const columns = useSelector((state: State) => state.columns);
  const backgroundType = useSelector((state: State) => state.backgroundType);
  const backgroundColor1 = useSelector(
    (state: State) => state.backgroundColor1
  );
  const backgroundColor2 = useSelector(
    (state: State) => state.backgroundColor2
  );
  const backgroundOpacity = useSelector(
    (state: State) => state.backgroundOpacity
  );
  const gradientDirection = useSelector(
    (state: State) => state.gradientDirection
  );
  const gap = useSelector((state: State) => state.gap);
  const borderColor = useSelector((state: State) => state.borderColor);
  const isCircle = useSelector((state: State) => state.isCircle);
  const borderSize = useSelector((state: State) => state.borderSize);
  const borderRadius = useSelector((state: State) => state.borderRadius);
  const showNumbers = useSelector((state: State) => state.showNumbers);
  const showShadows = useSelector((state: State) => state.showShadows);
  const font = useSelector((state: State) => state.font);
  const textColor = useSelector((state: State) => state.textColor);
  const titlesPosition = useSelector((state: State) => state.titlesPosition);
  return (
    <div className={`animate-opacity`}>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Theme</label>
          <div className={styles.values}>
            <Selector
              options={[
                {
                  id: "dark",
                  name: "Dark",
                  icon: "/icons/moon.svg",
                },
                {
                  id: "light",
                  name: "Light",
                  icon: "/icons/sun.svg",
                },
              ]}
              selected={[darkTheme ? "dark" : "light"]}
              onChange={(value) => value !== darkTheme && toggleTheme()}
            />
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Data</label>
          <div className={styles.values}>
            <div style={{ display: "flex", gap: "8px" }}>
              <label htmlFor="file" className={styles["file-upload"]}>
                Import
              </label>
              <input
                id="file"
                className={styles.value}
                onChange={(e: any) => {
                  let reader = new FileReader();
                  reader.onload = (ev: any) => {
                    dispatch(importState(ev));
                    e.target.value = "";
                  };
                  reader.readAsText(e.target?.files?.[0]);
                }}
                type="file"
              />
              <Button onClick={() => dispatch(exportState())}>Export</Button>
              <Button
                onClick={() => {
                  confirm("Are you sure you want to start over?") &&
                    dispatch(restart());
                }}
              >
                Restart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Presets</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: "Topsters", name: "Topsters" },
                { id: "Museum", name: "Museum" },
              ]}
              selected={[]}
              onChange={(value) => dispatch(setPreset(value))}
            />
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Rows</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setRows(parseInt(value.target.value)));
              }}
              min={1}
              max={10}
              value={rows}
              className={styles.value}
              type="range"
            />
            <span className={styles["range-value"]}>{rows}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Columns</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setColumns(parseInt(value.target.value)));
              }}
              min={1}
              max={10}
              value={columns}
              className={styles.value}
              type="range"
            />
            <span className={styles["range-value"]}>{columns}</span>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Title</label>
          <div className={styles.values}>
            <input
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className={styles.value}
              value={title}
              placeholder="Set a title..."
              type="text"
            />
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Titles</label>
          <div className={styles.values}>
            <Button
              selected={showTitles}
              onClick={() => dispatch(setShowTitles(!showTitles))}
            >
              {showTitles ? (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/check.svg"
                  alt="Check"
                />
              ) : (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/cancel.svg"
                  alt="Cancel"
                />
              )}
            </Button>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Numbers</label>
          <div className={styles.values}>
            <Button
              selected={showNumbers}
              onClick={() => dispatch(setShowNumbers(!showNumbers))}
            >
              {showNumbers ? (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/check.svg"
                  alt="Check"
                />
              ) : (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/cancel.svg"
                  alt="Cancel"
                />
              )}
            </Button>
          </div>
        </div>
        <div style={{ height: "88px" }} className={styles.input}>
          <label className={styles["input-label"]}>Font</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: Font.monospace, name: Font.monospace },
                { id: Font.lato, name: Font.lato },
              ]}
              selected={[font]}
              onChange={(value) => {
                dispatch(setFont(value));
              }}
            />
            <input
              onChange={(e) => dispatch(setFont(e.target.value))}
              className={styles.value}
              value={font}
              placeholder="Set a font..."
              type="text"
            />
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Color</label>
          <div className={styles.values}>
            <input
              onChange={(value) => dispatch(setTextColor(value.target.value))}
              className={styles.value}
              value={textColor}
              type="color"
            />
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Position</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: Position.side, name: Position.side },
                { id: Position.cover, name: Position.cover },
              ]}
              selected={[titlesPosition]}
              onChange={(value) => dispatch(setTitlesPosition(value))}
            />
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Background</label>
          <div className={styles.values}>
            <Selector
              options={[
                {
                  id: BackgroundType.color,
                  name: BackgroundType.color,
                },
                {
                  id: BackgroundType.gradient,
                  name: BackgroundType.gradient,
                },
                {
                  id: BackgroundType.radialGradient,
                  name: "Radial",
                },
              ]}
              selected={[backgroundType]}
              onChange={(value) => dispatch(setBackgroundType(value))}
            />
          </div>
        </div>
        {backgroundType !== BackgroundType.color && (
          <div style={{ height: "136px" }} className={styles.input}>
            <label className={styles["input-label"]}>Direction</label>
            <div style={{ justifyContent: "center" }} className={styles.values}>
              <Selector
                label="Gradient direction"
                options={[
                  {
                    id: Direction.topLeft,
                    name: "topLeft",
                    hideLabel: true,
                    icon: "/icons/upleft.svg",
                  },
                  {
                    id: Direction.top,
                    name: "top",
                    hideLabel: true,
                    icon: "/icons/up.svg",
                  },
                  {
                    id: Direction.topRight,
                    name: "topRight",
                    hideLabel: true,
                    icon: "/icons/upright.svg",
                  },
                  {
                    id: Direction.left,
                    name: "left",
                    hideLabel: true,
                    icon: "/icons/left.svg",
                  },
                  {
                    id: Direction.center,
                    name: "center",
                    hideLabel: true,
                    icon: "/icons/center.svg",
                  },
                  {
                    id: Direction.right,
                    name: "right",
                    hideLabel: true,
                    icon: "/icons/right.svg",
                  },
                  {
                    id: Direction.bottomLeft,
                    name: "bottomLeft",
                    hideLabel: true,
                    icon: "/icons/downleft.svg",
                  },
                  {
                    id: Direction.bottom,
                    name: "bottom",
                    hideLabel: true,
                    icon: "/icons/down.svg",
                  },
                  {
                    id: Direction.bottomRight,
                    name: "bottomRight",
                    hideLabel: true,
                    icon: "/icons/downright.svg",
                  },
                ]}
                selected={[gradientDirection]}
                onChange={(value) => dispatch(setGradientDirection(value))}
              />
            </div>
          </div>
        )}
        <div className={styles.input}>
          <label className={styles["input-label"]}>Opacity</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBackgroundOpacity(parseInt(value.target.value)));
              }}
              className={styles.value}
              type="range"
              value={backgroundOpacity}
              min={0}
              max={16}
            />
            <span className={styles["range-value"]}>{backgroundOpacity}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Color</label>
          <div className={styles.values}>
            <div>
              <input
                onChange={(value) =>
                  dispatch(setBackgroundColor1(value.target.value))
                }
                value={backgroundColor1}
                className={styles.value}
                type="color"
              />
              {backgroundType !== BackgroundType.color && (
                <input
                  onChange={(value) =>
                    dispatch(setBackgroundColor2(value.target.value))
                  }
                  value={backgroundColor2}
                  className={styles.value}
                  type="color"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Border</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBorderSize(parseInt(value.target.value)));
              }}
              className={styles.value}
              type="range"
              value={borderSize}
              min={0}
              max={20}
            />
            <span className={styles["range-value"]}>{borderSize}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Radius</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBorderRadius(parseInt(value.target.value)));
              }}
              className={styles.value}
              type="range"
              value={borderRadius}
              min={0}
              max={20}
            />
            <span className={styles["range-value"]}>{borderRadius}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Circle</label>
          <div className={styles.values}>
            <Button
              selected={isCircle}
              onClick={() => dispatch(setIsCircle(!isCircle))}
            >
              {isCircle ? (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/check.svg"
                  alt="Check"
                />
              ) : (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/cancel.svg"
                  alt="Cancel"
                />
              )}
            </Button>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Color</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBorderColor(value.target.value));
              }}
              className={styles.value}
              value={borderColor}
              type="color"
            />
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Gap</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setGap(parseInt(value.target.value)));
              }}
              min={0}
              max={50}
              value={gap}
              className={styles.value}
              type="range"
            />
            <span className={styles["range-value"]}>{gap}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Shadows</label>
          <div className={styles.values}>
            <Button
              selected={showShadows}
              onClick={() => dispatch(setShowShadows(!showShadows))}
            >
              {showShadows ? (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/check.svg"
                  alt="Check"
                />
              ) : (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/cancel.svg"
                  alt="Cancel"
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
