import { downloadImage } from "@/components/utils";
import OptionsTab from "@/components/OptionsTab";
import { Item, State } from "@/redux/state";
import { addItem, swapItem } from "@/redux/store";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Workspace from "@/components/Workspace";
import AddTab from "@/components/AddTab";
import AboutTab from "@/components/AboutTab";

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

  const [tab, setTab] = useState("add");
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.title);

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
                  <AddTab
                    setDraggingItem={setDraggingItem}
                    resetDrag={resetDrag}
                    hasData={hasData}
                  ></AddTab>
                )}
                {tab === "options" && (
                  <OptionsTab darkTheme={darkTheme} toggleTheme={toggleTheme} />
                )}
                {tab === "about" && <AboutTab />}
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
                <Workspace
                  draggingItem={draggingItem}
                  hoverItem={hoverItem}
                  hasData={hasData}
                  onDrop={onDrop}
                  setHoverItem={setHoverItem}
                  setDraggingItem={setDraggingItem}
                  resetDrag={resetDrag}
                ></Workspace>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
