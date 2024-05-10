import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addGame,
  exportState,
  importState,
  removeGame,
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
  swapGame,
} from "@/redux/store";
import {
  BackgroundType,
  Direction,
  Font,
  Game,
  Position,
  State,
} from "@/redux/state";
import Selector from "@/components/Selector";
import { downloadImage } from "@/components/utils";
import axios from "axios";

export default function Home() {
  const hasData = (game: Game) => {
    return !!game?.title && !!game?.cover;
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
    const dragGame = draggingItem.item;
    if (hasData(dragGame)) {
      if (draggingItem.origin === "add")
        dispatch(
          addGame({ game: dragGame, destinationIndex: destinationIndex })
        );
      else {
        dispatch(
          swapGame({
            game: {
              ...dragGame,
            },
            sourceIndex: draggingItem.index,
            destinationIndex,
          })
        );
      }
      resetDrag();
    }
  };

  const searchGames = () => {
    if (!!search) {
      setIsSearching(true);
      axios
        .get(`https://topsters4.vercel.app/api/igdb?name=${search}`)
        .then((response) => {
          setSearchedGames(
            response.data.data.map(
              (game: { cover: { url: string }; name: string }) => {
                const cover = game.cover?.url.replace("t_thumb", "t_cover_big");
                return {
                  title: game.name,
                  cover,
                };
              }
            )
          );
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
    item: Game;
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
  const games = useSelector((state: State) => state.games);
  const [searchedGames, setSearchedGames] = useState<
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
                    Add games
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
                      <div
                        className={`${styles.input} ${styles["search-input"]}`}
                      >
                        <input
                          onChange={(e) => setSearch(e.target.value)}
                          className={styles.value}
                          type="text"
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              searchGames();
                            }
                          }}
                        ></input>
                        <Button onClick={() => searchGames()}>
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
                    </div>

                    <div className={`${styles["input-group"]} ${styles.items}`}>
                      {!searchedGames.length && (
                        <div className={styles["no-items"]}>
                          <Image
                            width={100}
                            height={100}
                            className={`${styles.icon} ${styles["big-icon"]}`}
                            src={"/icons/controller.svg"}
                            alt={"No items"}
                          ></Image>
                          <span>Nothing here... yet!</span>
                        </div>
                      )}
                      {!!searchedGames.length && (
                        <div className={styles.covers}>
                          {searchedGames
                            .filter((game) => hasData(game))
                            .map((game, i) => {
                              return (
                                <div
                                  key={i + game.title}
                                  className={styles.cover}
                                >
                                  <Image
                                    draggable={true}
                                    onDragStart={() => {
                                      setDraggingItem({
                                        item: { ...game },
                                        index: -1,
                                        origin: "add",
                                      });
                                    }}
                                    onDragEnd={() => resetDrag()}
                                    onClick={(e) => {
                                      dispatch(
                                        addGame({
                                          game: game,
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
                                      game.cover.replace(
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
                              confirm("Are you sure you want to start over?") &&
                                dispatch(restart());
                            }}
                          >
                            Restart
                          </Button>
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
                          <div className={styles.values}>
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
                          <input
                            onChange={(value) =>
                              dispatch(setBackgroundColor1(value.target.value))
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
                          It only has support for games, unlike Topsters 3,
                          where you can also add music, TV shows, movies, books
                          and pretty much anything you like. I know the concept
                          was originally in fact for music but gaming is my
                          thing. Maybe I&apos;ll add support someday... sorry!
                        </p>
                        <p>
                          Topsters 1 and 2 are not around anymore, but Topsters
                          3 is still up and running and has been for a couple or
                          years already. Give it a try if you want!
                        </p>
                        <p>
                          Also, if you feel like you can improve upon this
                          version and pass on the legacy, you can fork the
                          GitHub repo or go ahead and make your own Topsters 5
                          from scratch!
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            onClick={() => window.open("https://igdb.com")}
                          >
                            Data from IGDB
                          </Button>
                          <Button
                            onClick={() =>
                              window.open(
                                "https://github.com/roselcost/topsters"
                              )
                            }
                          >
                            GitHub Repository
                          </Button>
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
                        {games
                          .filter((_game, i) => i < rows * columns)
                          .map((game, i) => (
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
                              draggable={hasData(game)}
                              onDragStart={() => {
                                setDraggingItem({
                                  item: { ...game },
                                  index: i,
                                  origin: "collection",
                                });
                              }}
                              onClick={(e: any) => {
                                if (e?.target?.id !== "remove") {
                                  if (draggingItem.index === -1) {
                                    if (hasData(game)) {
                                      setDraggingItem({
                                        item: { ...game },
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
                              {!hasData(game) && (
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
                              {hasData(game) && draggingItem.index === -1 && (
                                <>
                                  <div
                                    id="remove"
                                    onClick={() => {
                                      dispatch(removeGame(i));
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
                                          if (hasData(game)) {
                                            setDraggingItem({
                                              item: { ...game },
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
                              {hasData(game) && (
                                <>
                                  <img
                                    className={styles.cover}
                                    style={{
                                      borderRadius: isCircle
                                        ? "100%"
                                        : borderRadius,
                                      objectFit: isCircle ? "cover" : "contain",
                                      height: `${isCircle ? "100px" : "unset"}`,
                                      border: `${borderSize}px solid ${borderColor}`,
                                      boxShadow: `${
                                        showShadows
                                          ? "black 3px 3px 10px 0px"
                                          : "unset"
                                      }`,
                                    }}
                                    src={"https:" + game.cover}
                                    alt="Cover"
                                    width={isCircle ? 100 : 75}
                                    height={isCircle ? 100 : 0}
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
                                          }` + game.title}
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
                            !games.some((game) => hasData(game)) && (
                              <div className={styles["no-items"]}>
                                <Image
                                  width={100}
                                  height={100}
                                  className={`${styles.icon} ${styles["big-icon"]}`}
                                  src={"/icons/controller.svg"}
                                  alt={"No items"}
                                ></Image>

                                <span>Nothing here... yet!</span>
                              </div>
                            )}
                          {titlesPosition === Position.side &&
                            games
                              .filter((_game, i) => i < rows * columns)
                              .map((game, i) => {
                                const number = showNumbers ? `${i + 1}. ` : "";
                                const br =
                                  (i + 1) % columns === 0 ? <br></br> : "";
                                const res = hasData(game) ? (
                                  <div key={i}>
                                    <div>{number + game.title}</div>
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
