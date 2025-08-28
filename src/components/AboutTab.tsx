import React from "react";
import Image from "next/image";
import styles from "../styles/AboutTab.module.css";

export default function AboutTab() {
  return (
    <div className={`animate-opacity ${styles["input-group"]}`}>
      <div className={styles.about}>
        <p>
          Based on <a href="https://topsters.org">Topsters 3</a>. There are some
          few extra features that I wanted to have, and that&apos;s why I
          implemented my own version :)
        </p>
        <p>
          Topsters 1 and 2 are not around anymore, but Topsters 3 is still up
          and running and has been for a couple or years already. Give it a try
          if you want!
        </p>
        <p>
          Also, if you feel like you can improve upon this version and pass on
          the legacy, you can fork the{" "}
          <a target="_blank" href="https://github.com/roselcost/topsters">
            GitHub repo
          </a>{" "}
          or go ahead and make your own Topsters 5 from scratch!
        </p>
        <h2>Data sources</h2>
        <br></br>
        <div className={styles["link-container"]}>
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
              />
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
              />
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
              />
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
              />
            </div>
            <span>Open Library</span>
          </a>
        </div>
      </div>
    </div>
  );
}
