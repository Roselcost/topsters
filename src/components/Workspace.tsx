import { BackgroundType, Item, Position, State } from "@/redux/state";
import { removeItem } from "@/redux/store";
import styles from "@/styles/Workspace.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface WorkspaceProps {
  draggingItem: any;
  hoverItem: number;
  hasData: (item: any) => boolean;
  onDrop: (i: number) => void;
  setHoverItem: (i: number) => void;
  setDraggingItem: (item: any) => void;
  resetDrag: () => void;
}

export default function Workspace({
  draggingItem,
  hoverItem,
  hasData,
  onDrop,
  setHoverItem,
  setDraggingItem,
  resetDrag,
}: WorkspaceProps) {
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
  const items = useSelector((state: State) => state.items);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculateScale = () => {
    if (!containerRef.current || !contentRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const contentWidth = contentRef.current.scrollWidth;
    const contentHeight = contentRef.current.scrollHeight;

    const widthRatio = containerWidth / contentWidth;
    const heightRatio = containerHeight / contentHeight;
    const newScale = Math.min(1, widthRatio, heightRatio);
    setScale(newScale);
  };

  useEffect(() => {
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [rows, columns, gap, items]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      ref={containerRef}
    >
      <div
        className={styles.checkerboard}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
      >
        <div
          id="imageContainer"
          ref={contentRef}
          className={styles.content}
          style={{
            padding: gap + "px",
            backgroundColor:
              backgroundType === BackgroundType.color
                ? backgroundColor1 +
                  Math.max(backgroundOpacity * 16 - 1, 0)
                    .toString(16)
                    .padStart(2, "0")
                : "unset",
            backgroundImage:
              backgroundType === BackgroundType.gradient
                ? `linear-gradient(to ${gradientDirection}, ${
                    backgroundColor1 +
                    Math.max(backgroundOpacity * 16 - 1, 0)
                      .toString(16)
                      .padStart(2, "0")
                  }, ${
                    backgroundColor2 +
                    Math.max(backgroundOpacity * 16 - 1, 0)
                      .toString(16)
                      .padStart(2, "0")
                  })`
                : backgroundType === BackgroundType.radialGradient
                ? `radial-gradient(at ${gradientDirection}, ${
                    backgroundColor1 +
                    Math.max(backgroundOpacity * 16 - 1, 0)
                      .toString(16)
                      .padStart(2, "0")
                  }, ${
                    backgroundColor2 +
                    Math.max(backgroundOpacity * 16 - 1, 0)
                      .toString(16)
                      .padStart(2, "0")
                  })`
                : "unset",
          }}
        >
          {title && (
            <div
              className={styles.title}
              style={{
                textShadow: `${showShadows ? "black 1px 1px 1px" : ""}`,
                fontFamily: font,
                color: textColor,
                gap: gap,
              }}
            >
              {title}
            </div>
          )}
          <div className={styles["workspace-covers-container"]}>
            <div
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: gap,
                padding: gap,
              }}
              className={styles["workspace-covers"]}
            >
              {items
                .filter((_item, i) => i < rows * columns)
                .map((item, i) => (
                  <div
                    key={i}
                    className={`${styles["workspace-cover"]} ${
                      [draggingItem.index, hoverItem].includes(i) &&
                      styles.dragging
                    }`}
                    style={{
                      minHeight: "100px",
                      height: `${
                        titlesPosition === Position.side ? "100px" : "unset"
                      }`,
                      borderRadius: borderRadius,
                    }}
                    onDrop={() => onDrop(i)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setHoverItem(i);
                    }}
                    draggable={hasData(item)}
                    onDragStart={() => {
                      setDraggingItem({
                        item: { ...item },
                        index: i,
                        origin: "collection",
                      });
                    }}
                    onClick={(e: any) => {
                      if (e?.target?.id !== "remove") {
                        if (draggingItem.index === -1) {
                          if (hasData(item)) {
                            setDraggingItem({
                              item: { ...item },
                              index: i,
                              origin: "collection",
                            });
                          }
                        } else {
                          onDrop(i);
                        }
                      }
                    }}
                    onDragEnd={() => resetDrag()}
                  >
                    {!hasData(item) && (
                      <div
                        style={{
                          backgroundColor: `#ccc`,
                          height: "100px",
                          borderRadius: isCircle ? "100%" : borderRadius,
                          boxShadow: `${
                            showShadows ? "black 3px 3px 10px 0px" : "unset"
                          }`,
                          border: `${borderSize}px solid ${borderColor} `,
                        }}
                        className={`${styles.cover} ${styles["no-items"]}`}
                      >
                        <span style={{ color: "black" }}>{i + 1}</span>
                      </div>
                    )}
                    {hasData(item) && draggingItem.index === -1 && (
                      <>
                        <div
                          id="remove"
                          onClick={() => {
                            dispatch(removeItem(i));
                            resetDrag();
                          }}
                          className={styles.delete}
                        >
                          <img
                            id="remove"
                            className={styles.icon}
                            src="/icons/remove.svg"
                          ></img>
                        </div>
                        <div
                          onClick={(e: any) => {
                            if (e?.target?.id !== "remove") {
                              if (draggingItem.index === -1) {
                                if (hasData(item)) {
                                  setDraggingItem({
                                    item: { ...item },
                                    index: i,
                                    origin: "collection",
                                  });
                                }
                              } else {
                                onDrop(i);
                              }
                            }
                          }}
                          className={styles.move}
                        >
                          <img
                            className={styles.icon}
                            src="/icons/drag.svg"
                          ></img>
                        </div>
                      </>
                    )}
                    {hasData(item) && (
                      <>
                        <img
                          className={styles.cover}
                          style={{
                            borderRadius: isCircle ? "100%" : borderRadius,
                            height: `${isCircle ? "100px" : "unset"}`,
                            maxHeight: "100px",
                            maxWidth: "100px",
                            border: `${borderSize}px solid ${borderColor}`,
                            boxShadow: `${
                              showShadows ? "black 3px 3px 10px 0px" : "unset"
                            }`,
                          }}
                          src={"https:" + item.cover}
                          alt="Cover"
                          width={isCircle ? 100 : "unset"}
                        ></img>
                        {showTitles && titlesPosition === Position.cover && (
                          <div
                            className={styles["cover-titles"]}
                            style={{
                              fontFamily: font,
                              color: textColor,
                              textShadow: `${
                                showShadows ? "black 1px 1px 1px" : ""
                              }`,
                            }}
                          >
                            <div>
                              {`${showNumbers ? `${i + 1}. ` : ""}` +
                                item.title}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
            </div>
            {showTitles && titlesPosition === Position.side && (
              <div
                className={styles["side-titles"]}
                style={{
                  fontFamily: font,
                  color: textColor,
                  textShadow: `${showShadows ? "black 1px 1px 1px" : ""}`,
                  padding: gap,
                }}
              >
                {titlesPosition === Position.side &&
                  !items.some((item) => hasData(item)) && (
                    <div className={styles["no-items"]}>
                      <Image
                        width={100}
                        height={100}
                        className={`${styles.icon} ${styles["big-icon"]}`}
                        src={"/icons/picture.svg"}
                        alt={"No items"}
                      ></Image>

                      <span>Nothing here... yet!</span>
                    </div>
                  )}
                {titlesPosition === Position.side &&
                  (() => {
                    // limit items
                    const visibleItems = items.filter(
                      (_item, i) => i < rows * columns
                    );

                    // helper to chunk into rows
                    const chunk = (arr: any[], size: number) =>
                      arr.reduce((acc, _, i) => {
                        if (i % size === 0) acc.push(arr.slice(i, i + size));
                        return acc;
                      }, []);

                    const rowsArr = chunk(visibleItems, columns);

                    // render rows with columns
                    return rowsArr.map((rowItems: Item[], rowIdx: number) => (
                      <div
                        style={
                          items.some((item) => hasData(item))
                            ? {
                                height:
                                  (rowIdx === rowsArr.length - 1 ? 0 : gap) +
                                  100 +
                                  "px",
                              }
                            : {}
                        }
                        key={rowIdx}
                      >
                        {rowItems.map((item: Item, colIdx: number) => {
                          const i = rowIdx * columns + colIdx;
                          const number = showNumbers ? `${i + 1}. ` : "";

                          return (
                            <div key={i}>
                              {hasData(item) ? number + item.title : ""}
                            </div>
                          );
                        })}
                      </div>
                    ));
                  })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
