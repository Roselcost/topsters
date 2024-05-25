import Selector from "@/components/Selector";
import { downloadImage } from "@/components/utils";
import {
  BackgroundType,
  Category,
  Direction,
  Font,
  Item,
  Position,
  State,
} from "@/redux/state";
import {
  addItem,
  exportState,
  importState,
  removeItem,
  restart,
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
  setPreset,
  setRows,
  setShowNumbers,
  setShowShadows,
  setShowTitles,
  setTextColor,
  setTitle,
  setTitlesPosition,
  swapItem,
} from "@/redux/store";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";

export default function Home() {
  const hasData = (item: Item) => {
    return !!item?.title && !!item?.cover;
  };

  const resetDrag = () => {
    setHoverItem(-1);
    setDraggingItem({
      item: {
        title: "",
        cover: "",
      },
      index: -1,
      origin: "",
    });
  };

  const onDrop = (destinationIndex: number) => {
    const dragitem = draggingItem.item;
    if (hasData(dragitem)) {
      if (draggingItem.origin === "add")
        dispatch(
          addItem({ item: dragitem, destinationIndex: destinationIndex })
        );
      else {
        dispatch(
          swapItem({
            item: {
              ...dragitem,
            },
            sourceIndex: draggingItem.index,
            destinationIndex,
          })
        );
      }
      resetDrag();
    }
  };

  const generateItem = () => {
    if (!!itemForm.title && !!itemForm.url) {
      setSearchedItems([
        {
          title: itemForm.title,
          cover: itemForm.url.replace(/(^\w+:|^)\/\//, ""),
        },
      ]);
    }
  };

  const importItems = () => {};

  const searchItems = () => {
    if (!!search) {
      setIsSearching(true);
      axios
        .get(
          `https://topsters4.vercel.app/api/endpoints?category=${category}&name=${search}`
        )
        .then((response) => {
          console.log(response.data[0].cover);
          setSearchedItems(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    darkTheme
      ? document.getElementsByTagName("html")[0].removeAttribute("dark")
      : document.getElementsByTagName("html")[0].setAttribute("dark", "true");
  };

  const prefersDarkTheme = () => {
    const a =
      window &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return a;
  };

  useEffect(() => {
    if (!prefersDarkTheme()) toggleTheme();
    else document.getElementsByTagName("html")[0].setAttribute("dark", "true");
  }, []);

  const [draggingItem, setDraggingItem] = useState<{
    item: Item;
    index: number;
    origin: "add" | "collection" | "";
  }>({
    item: { title: "", cover: "" },
    index: -1,
    origin: "",
  });
  const [hoverItem, setHoverItem] = useState(-1);

  const [darkTheme, setDarkTheme] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [itemForm, setItemForm] = useState({ title: "", url: "" });
  const [importForm, setImportForm] = useState([]);
  const [category, setCategory] = useState(Category.games);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("add");
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
  const [searchedItems, setSearchedItems] = useState<
    { title: string; cover: string }[]
  >([]);
  return (
    <>
      <Head>
        <title>Topsters 4</title>
        <meta name="description" content="Topsters 4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.container}>
          <div className={styles["left-panel"]}>
            <div
              className={`${styles["section-container"]} ${styles["app-header"]}`}
            >
              <div className={`${styles.section} ${styles.header}`}>
                <h1>Topsters 4</h1>
              </div>
            </div>
            <div className={`${styles["section-container"]} ${styles.toolbar}`}>
              <div className={styles["section-title"]}>
                <div
                  onClick={() => setTab("add")}
                  className={`${styles.tab} ${
                    tab === "add" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/add.svg"
                      alt={"Add"}
                    ></Image>
                    Add items
                  </h2>
                </div>
                <div
                  onClick={() => setTab("options")}
                  className={`${styles.tab} ${
                    tab === "options" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/settings.svg"
                      alt="Settings"
                    ></Image>
                    Options
                  </h2>
                </div>
                <div
                  onClick={() => setTab("about")}
                  className={`${styles.tab} ${
                    tab === "about" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/about.svg"
                      alt="About"
                    ></Image>
                    About
                  </h2>
                </div>
              </div>
              <div className={`${styles.section} ${styles["add-items"]}`}>
                {tab === "add" && (
                  <div className={`animate-opacity ${styles.search}`}>
                    <div className={styles["input-group"]}>
                      <div className={`${styles.input} ${styles.categories}`}>
                        <Selector
                          label="categories"
                          options={[
                            {
                              id: Category.games,
                              name: Category.games,
                              icon: "/icons/controller.svg",
                              hideLabel: true,
                            },
                            {
                              id: Category.music,
                              name: Category.music,
                              icon: "/icons/music.svg",
                              hideLabel: true,
                            },
                            {
                              id: Category.movies,
                              name: Category.movies,
                              icon: "/icons/movie.svg",
                              hideLabel: true,
                            },
                            {
                              id: Category.tvshows,
                              name: Category.tvshows,
                              icon: "/icons/tv.svg",
                              hideLabel: true,
                            },
                            {
                              id: Category.books,
                              name: Category.books,
                              icon: "/icons/book.svg",
                              hideLabel: true,
                            },
                            // {
                            //   id: Category.lastfm,
                            //   name: Category.lastfm,
                            //   icon: "/icons/lastfm.svg",
                            //   hideLabel: true,
                            // },
                            // {
                            //   id: Category.pictures,
                            //   name: Category.pictures,
                            //   icon: "/icons/picture.svg",
                            //   hideLabel: true,
                            // },
                          ]}
                          selected={[category]}
                          onChange={(value) => setCategory(value)}
                        ></Selector>
                      </div>
                    </div>
                    <div className={styles["input-group"]}>
                      {category !== Category.pictures &&
                        category !== Category.lastfm && (
                          <div
                            className={`${styles.input} ${styles["search-input"]}`}
                          >
                            <input
                              onChange={(e) => setSearch(e.target.value)}
                              className={styles.value}
                              type="text"
                              placeholder={`Search ${category}...`}
                              onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                  searchItems();
                                }
                              }}
                            ></input>
                            <Button onClick={() => searchItems()}>
                              <Image
                                width={10}
                                height={10}
                                className={`${styles.icon} ${
                                  isSearching && styles.loading
                                }`}
                                src="/icons/search.svg"
                                alt="Search"
                              ></Image>
                            </Button>
                          </div>
                        )}
                      {category === Category.pictures && (
                        <>
                          <div
                            className={`${styles.input} ${styles["search-button"]}`}
                          >
                            <h3>Generate new item</h3>
                          </div>
                          <div className={styles.input}>
                            <label className={styles["input-label"]}>
                              Link
                            </label>
                            <div className={styles.values}>
                              <input
                                onChange={(e) =>
                                  setItemForm({
                                    ...itemForm,
                                    url: e.target.value,
                                  })
                                }
                                className={styles.value}
                                type="text"
                                placeholder={"Image link"}
                                onKeyUp={(e) => {
                                  if (e.key === "Enter") {
                                    generateItem();
                                  }
                                }}
                              ></input>
                            </div>
                          </div>
                          <div className={styles.input}>
                            <label className={styles["input-label"]}>
                              Title
                            </label>
                            <div className={styles.values}>
                              <input
                                onChange={(e) =>
                                  setItemForm({
                                    ...itemForm,
                                    title: e.target.value,
                                  })
                                }
                                className={styles.value}
                                type="text"
                                placeholder={`Title`}
                                onKeyUp={(e) => {
                                  if (e.key === "Enter") {
                                    generateItem();
                                  }
                                }}
                              ></input>
                            </div>
                          </div>
                          <div
                            className={`${styles.input} ${styles["search-button"]}`}
                          >
                            <Button onClick={() => generateItem()}>
                              Generate
                            </Button>
                          </div>
                        </>
                      )}
                      {category === Category.lastfm && (
                        <>
                          <div
                            className={`${styles.input} ${styles["search-button"]}`}
                          >
                            <h3>Import from Last.fm</h3>
                          </div>
                          <div className={`${styles.input} `}>
                            <label className={styles["input-label"]}>
                              Username
                            </label>
                            <div className={styles.values}>
                              <input
                                className={styles.value}
                                type="text"
                                placeholder={`Username`}
                                onKeyUp={(e) => {
                                  if (e.key === "Enter") {
                                    importItems();
                                  }
                                }}
                              ></input>
                            </div>
                          </div>
                          <div
                            style={{ height: "88px" }}
                            className={styles.input}
                          >
                            <label className={styles["input-label"]}>
                              Period
                            </label>
                            <div className={styles.values}>
                              <Selector
                                options={[
                                  { id: "overall", name: "Overall" },
                                  { id: "week", name: "Week" },
                                  { id: "month", name: "Month" },
                                  { id: "three", name: "3 months" },
                                  { id: "six", name: "6 months" },
                                  { id: "year", name: "Year" },
                                ]}
                                selected={["week"]}
                                onChange={function (id: any): void | {} {
                                  throw new Error("Function not implemented.");
                                }}
                              ></Selector>
                            </div>
                          </div>
                          <div
                            className={`${styles.input} ${styles["search-button"]}`}
                          >
                            <Button onClick={() => importItems()}>
                              Import
                            </Button>
                          </div>
                        </>
                      )}
                    </div>

                    <div
                      style={
                        category === Category.lastfm
                          ? { display: "none" }
                          : category === Category.pictures
                          ? { height: "unset" }
                          : {}
                      }
                      className={`${styles["input-group"]} ${styles.items}`}
                    >
                      {!searchedItems.length && (
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
                      {!!searchedItems.length && (
                        <div className={styles.covers}>
                          {searchedItems
                            .filter((item) => hasData(item))
                            .map((item, i) => {
                              return (
                                <div
                                  key={i + item.title}
                                  className={styles.cover}
                                >
                                  <Image
                                    draggable={true}
                                    onDragStart={() => {
                                      setDraggingItem({
                                        item: { ...item },
                                        index: -1,
                                        origin: "add",
                                      });
                                    }}
                                    onDragEnd={() => resetDrag()}
                                    onClick={(e) => {
                                      dispatch(
                                        addItem({
                                          item,
                                          destinationIndex: -1,
                                        })
                                      );
                                      const ref = e.currentTarget.parentElement;
                                      ref?.classList.add("added");
                                      setTimeout(() => {
                                        ref?.classList.remove("added");
                                      }, 500);
                                    }}
                                    src={
                                      "https:" +
                                      item.cover.replace(
                                        "t_cover_big",
                                        "t_cover_small_2x"
                                      )
                                    }
                                    alt="Cover"
                                    width={80}
                                    height={0}
                                    priority
                                  />
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {tab === "options" && (
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
                            onChange={(value) =>
                              value !== darkTheme && toggleTheme()
                            }
                          ></Selector>
                        </div>
                      </div>
                    </div>
                    <div className={styles["input-group"]}>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Data</label>
                        <div className={styles.values}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <label
                              htmlFor="file"
                              className={styles["file-upload"]}
                            >
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
                            ></input>
                            <Button
                              onClick={() => {
                                dispatch(exportState());
                              }}
                            >
                              Export
                            </Button>
                            <Button
                              onClick={() => {
                                confirm(
                                  "Are you sure you want to start over?"
                                ) && dispatch(restart());
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
                          ></Selector>
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
                          ></input>
                          <span className={styles["range-value"]}>{rows}</span>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Columns</label>
                        <div className={styles.values}>
                          <input
                            onChange={(value) => {
                              dispatch(
                                setColumns(parseInt(value.target.value))
                              );
                            }}
                            min={1}
                            max={10}
                            value={columns}
                            className={styles.value}
                            type="range"
                          ></input>
                          <span className={styles["range-value"]}>
                            {columns}
                          </span>
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
                          ></input>
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
                              ></Image>
                            ) : (
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src="/icons/cancel.svg"
                                alt="Cancel"
                              ></Image>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Numbers</label>
                        <div className={styles.values}>
                          <Button
                            selected={showNumbers}
                            onClick={() =>
                              dispatch(setShowNumbers(!showNumbers))
                            }
                          >
                            {showNumbers ? (
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src="/icons/check.svg"
                                alt="Check"
                              ></Image>
                            ) : (
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src="/icons/cancel.svg"
                                alt="Cancel"
                              ></Image>
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
                          ></Selector>
                          <input
                            onChange={(e) => dispatch(setFont(e.target.value))}
                            className={styles.value}
                            value={font}
                            placeholder="Set a font..."
                            type="text"
                          ></input>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Color</label>
                        <div className={styles.values}>
                          <input
                            onChange={(value) =>
                              dispatch(setTextColor(value.target.value))
                            }
                            className={styles.value}
                            value={textColor}
                            type="color"
                          ></input>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>
                          Position
                        </label>
                        <div className={styles.values}>
                          <Selector
                            options={[
                              { id: Position.side, name: Position.side },
                              { id: Position.cover, name: Position.cover },
                            ]}
                            selected={[titlesPosition]}
                            onChange={(value) =>
                              dispatch(setTitlesPosition(value))
                            }
                          ></Selector>
                        </div>
                      </div>
                    </div>
                    <div className={styles["input-group"]}>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>
                          Background
                        </label>
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
                            onChange={(value) =>
                              dispatch(setBackgroundType(value))
                            }
                          ></Selector>
                        </div>
                      </div>
                      {backgroundType !== BackgroundType.color && (
                        <div
                          style={{ height: "136px" }}
                          className={styles.input}
                        >
                          <label className={styles["input-label"]}>
                            Direction
                          </label>
                          <div
                            style={{ justifyContent: "center" }}
                            className={styles.values}
                          >
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
                              onChange={(value) =>
                                dispatch(setGradientDirection(value))
                              }
                            ></Selector>
                          </div>
                        </div>
                      )}
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Opacity</label>
                        <div className={styles.values}>
                          <input
                            onChange={(value) => {
                              dispatch(
                                setBackgroundOpacity(
                                  parseInt(value.target.value)
                                )
                              );
                            }}
                            className={styles.value}
                            type="range"
                            value={backgroundOpacity}
                            min={0}
                            max={16}
                          ></input>
                          <span className={styles["range-value"]}>
                            {backgroundOpacity}
                          </span>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Color</label>
                        <div className={styles.values}>
                          <div>
                            <input
                              onChange={(value) =>
                                dispatch(
                                  setBackgroundColor1(value.target.value)
                                )
                              }
                              value={backgroundColor1}
                              className={styles.value}
                              type="color"
                            ></input>
                            {backgroundType !== BackgroundType.color && (
                              <input
                                onChange={(value) =>
                                  dispatch(
                                    setBackgroundColor2(value.target.value)
                                  )
                                }
                                value={backgroundColor2}
                                className={styles.value}
                                type="color"
                              ></input>
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
                              dispatch(
                                setBorderSize(parseInt(value.target.value))
                              );
                            }}
                            className={styles.value}
                            type="range"
                            value={borderSize}
                            min={0}
                            max={20}
                          ></input>
                          <span className={styles["range-value"]}>
                            {borderSize}
                          </span>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Radius</label>
                        <div className={styles.values}>
                          <input
                            onChange={(value) => {
                              dispatch(
                                setBorderRadius(parseInt(value.target.value))
                              );
                            }}
                            className={styles.value}
                            type="range"
                            value={borderRadius}
                            min={0}
                            max={20}
                          ></input>
                          <span className={styles["range-value"]}>
                            {borderRadius}
                          </span>
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
                              ></Image>
                            ) : (
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src="/icons/cancel.svg"
                                alt="Cancel"
                              ></Image>
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
                          ></input>
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
                          ></input>
                          <span className={styles["range-value"]}>{gap}</span>
                        </div>
                      </div>
                      <div className={styles.input}>
                        <label className={styles["input-label"]}>Shadows</label>
                        <div className={styles.values}>
                          <Button
                            selected={showShadows}
                            onClick={() =>
                              dispatch(setShowShadows(!showShadows))
                            }
                          >
                            {showShadows ? (
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src="/icons/check.svg"
                                alt="Check"
                              ></Image>
                            ) : (
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src="/icons/cancel.svg"
                                alt="Cancel"
                              ></Image>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {tab === "about" && (
                  <>
                    <div className={`animate-opacity ${styles["input-group"]}`}>
                      <div className={styles.about}>
                        <p>
                          Based on <a href="https://topsters.org">Topsters 3</a>
                          . There are some few extra features that I wanted to
                          have, and that&apos;s why I implemented my own version
                          :)
                        </p>
                        <p>
                          Topsters 1 and 2 are not around anymore, but Topsters
                          3 is still up and running and has been for a couple or
                          years already. Give it a try if you want!
                        </p>
                        <p>
                          Also, if you feel like you can improve upon this
                          version and pass on the legacy, you can fork the{" "}
                          <a
                            target="_blank"
                            href="https://github.com/roselcost/topsters"
                          >
                            GitHub repo
                          </a>{" "}
                          or go ahead and make your own Topsters 5 from scratch!
                        </p>
                        <h2>Data sources</h2>
                        <br></br>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          <a
                            className={styles["link-button"]}
                            target="_blank"
                            href="https://igdb.com"
                          >
                            <div className={styles["link-icon"]}>
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src={"/icons/controller.svg"}
                                alt={"controller"}
                              ></Image>
                            </div>
                            <span>IGDB</span>
                          </a>
                          <a
                            className={styles["link-button"]}
                            target="_blank"
                            href="https://last.fm"
                          >
                            <div className={styles["link-icon"]}>
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src={"/icons/music.svg"}
                                alt={"music"}
                              ></Image>
                            </div>
                            <span>Last.fm</span>
                          </a>
                          <a
                            className={styles["link-button"]}
                            target="_blank"
                            href="https://www.themoviedb.org"
                          >
                            <div className={styles["link-icon"]}>
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src={"/icons/tv.svg"}
                                alt={"tv"}
                              ></Image>
                            </div>
                            <span>The Movie Database</span>
                          </a>
                          <a
                            className={styles["link-button"]}
                            target="_blank"
                            href="https://openlibrary.org"
                          >
                            <div className={styles["link-icon"]}>
                              <Image
                                width={10}
                                height={10}
                                className={styles.icon}
                                src={"/icons/book.svg"}
                                alt={"book"}
                              ></Image>
                            </div>
                            <span>Open Library</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.workspace}>
            <div
              className={`${styles["workspace-container"]} ${styles["section-container"]}`}
            >
              <div
                style={{ justifyContent: "space-between" }}
                className={styles["section-title"]}
              >
                <div className={styles.collection}>
                  <div
                    style={{ cursor: "unset" }}
                    className={`${styles.tab} ${styles["selected-tab"]}`}
                  >
                    <h2>{!!title ? title : "Untitled"}</h2>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => {
                      setIsDownloading(true);
                      downloadImage(title).then(() => setIsDownloading(false));
                    }}
                    className={styles.tab}
                  >
                    <h2>
                      Download
                      <Image
                        width={10}
                        height={10}
                        className={`${styles.icon} ${
                          isDownloading && styles.loading
                        }`}
                        src="/icons/download.svg"
                        alt="Download"
                      ></Image>
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className={`${styles["workspace-content"]} ${styles.section} `}
              >
                <div className={styles.checkerboard}>
                  <div
                    id="imageContainer"
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
                          textShadow: `${
                            showShadows ? "black 1px 1px 1px" : ""
                          }`,
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
                                  titlesPosition === Position.side
                                    ? "100px"
                                    : "unset"
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
                                    borderRadius: isCircle
                                      ? "100%"
                                      : borderRadius,
                                    boxShadow: `${
                                      showShadows
                                        ? "black 3px 3px 10px 0px"
                                        : "unset"
                                    }`,
                                    border: `${borderSize}px solid ${borderColor} `,
                                  }}
                                  className={`${styles.cover} ${styles["no-items"]}`}
                                >
                                  <span style={{ color: "black" }}>
                                    {i + 1}
                                  </span>
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
                                      borderRadius: isCircle
                                        ? "100%"
                                        : borderRadius,
                                      height: `${isCircle ? "100px" : "unset"}`,
                                      maxHeight: "100px",
                                      maxWidth: "100px",
                                      border: `${borderSize}px solid ${borderColor}`,
                                      boxShadow: `${
                                        showShadows
                                          ? "black 3px 3px 10px 0px"
                                          : "unset"
                                      }`,
                                    }}
                                    src={"https:" + item.cover}
                                    alt="Cover"
                                    width={isCircle ? 100 : "unset"}
                                  ></img>
                                  {showTitles &&
                                    titlesPosition === Position.cover && (
                                      <div
                                        className={styles["cover-titles"]}
                                        style={{
                                          fontFamily: font,
                                          color: textColor,
                                          textShadow: `${
                                            showShadows
                                              ? "black 1px 1px 1px"
                                              : ""
                                          }`,
                                        }}
                                      >
                                        <div>
                                          {`${
                                            showNumbers ? `${i + 1}. ` : ""
                                          }` + item.title}
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
                            textShadow: `${
                              showShadows ? "black 1px 1px 1px" : ""
                            }`,
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
                            items
                              .filter((_item, i) => i < rows * columns)
                              .map((item, i) => {
                                const number = showNumbers ? `${i + 1}. ` : "";
                                const br =
                                  (i + 1) % columns === 0 ? <br></br> : "";
                                const res = hasData(item) ? (
                                  <div key={i}>
                                    <div>{number + item.title}</div>
                                    {br}
                                  </div>
                                ) : (
                                  <div key={i}>{br}</div>
                                );
                                return res;
                              })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
