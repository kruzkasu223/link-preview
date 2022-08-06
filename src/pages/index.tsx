import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { IPreviewData } from "../types/types";

const defaultData = {
  oembed: null,
  ogp: {
    "al:android:app_name": ["YouTube"],
    "al:android:package": ["com.google.android.youtube"],
    "al:android:url": [
      "vnd.youtube://www.youtube.com/watch?v=5Eqb_-j3FDA\u0026feature=applinks",
    ],
    "al:ios:app_name": ["YouTube"],
    "al:ios:app_store_id": ["544007664"],
    "al:ios:url": [
      "vnd.youtube://www.youtube.com/watch?v=5Eqb_-j3FDA\u0026feature=applinks",
    ],
    "al:web:url": [
      "http://www.youtube.com/watch?v=5Eqb_-j3FDA\u0026feature=applinks",
    ],
    "fb:app_id": ["87741124305"],
    "og:description": [
      "Letâs transcend boundaries and bridge distances through compassion, love and identity.#Pasoori #RealMagic #CokeStudioSeason14 #SoundOfTheNationListen on Spot...",
    ],
    "og:image": ["https://i.ytimg.com/vi/5Eqb_-j3FDA/maxresdefault.jpg"],
    "og:image:height": ["720"],
    "og:image:width": ["1280"],
    "og:site_name": ["YouTube"],
    "og:title": ["Coke Studio | Season 14 | Pasoori | Ali Sethi x Shae Gill"],
    "og:type": ["video.other"],
    "og:url": ["https://www.youtube.com/watch?v=5Eqb_-j3FDA"],
    "og:video:height": ["720"],
    "og:video:secure_url": ["https://www.youtube.com/embed/5Eqb_-j3FDA"],
    "og:video:tag": [
      "coke studio",
      "cocacola pakistan",
      "coke studio pakistan",
      "SoundOfTheNation",
      "Xulfi",
      "FusionMusic",
      "Coke Studio Season 14",
      "Season 14",
      "Real Magic",
      "Music",
      "Coke Studio 14",
      "Ali Sethi",
      "Shaegill",
      "Pasoori",
      "Shae gill",
    ],
    "og:video:type": ["text/html"],
    "og:video:url": ["https://www.youtube.com/embed/5Eqb_-j3FDA"],
    "og:video:width": ["1280"],
  },
  seo: {
    description: [
      "Letâs transcend boundaries and bridge distances through compassion, love and identity.#Pasoori #RealMagic #CokeStudioSeason14 #SoundOfTheNationListen on Spot...",
    ],
    keywords: [
      "coke studio, cocacola pakistan, coke studio pakistan, SoundOfTheNation, Xulfi, FusionMusic, Coke Studio Season 14, Season 14, Real Magic, Music, Coke Studio 14, Ali Sethi, Shaegill, Pasoori, Shae gill",
    ],
    "theme-color": ["rgba(255, 255, 255, 0.98)"],
    title: ["Coke Studio | Season 14 | Pasoori | Ali Sethi x Shae Gill"],
    "twitter:app:id:googleplay": ["com.google.android.youtube"],
    "twitter:app:id:ipad": ["544007664"],
    "twitter:app:id:iphone": ["544007664"],
    "twitter:app:name:googleplay": ["YouTube"],
    "twitter:app:name:ipad": ["YouTube"],
    "twitter:app:name:iphone": ["YouTube"],
    "twitter:app:url:googleplay": [
      "https://www.youtube.com/watch?v=5Eqb_-j3FDA",
    ],
    "twitter:app:url:ipad": [
      "vnd.youtube://www.youtube.com/watch?v=5Eqb_-j3FDA\u0026feature=applinks",
    ],
    "twitter:app:url:iphone": [
      "vnd.youtube://www.youtube.com/watch?v=5Eqb_-j3FDA\u0026feature=applinks",
    ],
    "twitter:card": ["player"],
    "twitter:description": [
      "Letâs transcend boundaries and bridge distances through compassion, love and identity.#Pasoori #RealMagic #CokeStudioSeason14 #SoundOfTheNationListen on Spot...",
    ],
    "twitter:image": ["https://i.ytimg.com/vi/5Eqb_-j3FDA/maxresdefault.jpg"],
    "twitter:player": ["https://www.youtube.com/embed/5Eqb_-j3FDA"],
    "twitter:player:height": ["720"],
    "twitter:player:width": ["1280"],
    "twitter:site": ["@youtube"],
    "twitter:title": [
      "Coke Studio | Season 14 | Pasoori | Ali Sethi x Shae Gill",
    ],
    "twitter:url": ["https://www.youtube.com/watch?v=5Eqb_-j3FDA"],
  },
  title: "Coke Studio | Season 14 | Pasoori | Ali Sethi x Shae Gill - YouTube",
};

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [previewData, setPreviewData] = useState<IPreviewData>(defaultData);
  const [previewDataError, setPreviewDataError] = useState<unknown>();

  const isUrlValid = (url: string): void => {
    const urlRegEx =
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

    if (urlRegEx.test(url)) {
      setUrlError("");
      return;
    }
    setUrlError("please enter valid url");
  };

  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      isUrlValid(e.target.value);
      setUrl(e.target.value);
    } else {
      setUrlError("");
      setUrl("");
    }
  };

  const onPreviewClick = useCallback(() => {
    let newUrl = url;
    if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      newUrl = "https://" + newUrl;
    }
    fetchData(newUrl);
  }, [url]);

  const fetchData = async (url: string) => {
    fetch(`https://link-preview4.p.rapidapi.com/?url=${url}&oembed=false`, {
      method: "GET",
      headers: {
        // "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        // "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    })
      .then((res) => res?.json())
      .then((data) => {
        setPreviewData(data);
        console.log(data);
      })
      .catch((err) => {
        setPreviewDataError(err), console.error(err);
      });
  };

  useEffect(() => {
    console.log(previewData);
  }, [previewData]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Link Preview</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/link.svg" alt="link" className={styles.linkIcon} />
          <h1 className={styles.title}>Welcome to Link Previewer!</h1>
        </header>
        <section className={styles.inputSection}>
          <div className={styles.inputMainWrapper}>
            <div className={styles.inputWrapper}>
              <input
                id="url"
                type="url"
                name="url"
                value={url}
                className={styles.input}
                onChange={urlChangeHandler}
                placeholder="Enter Valid URL"
                onKeyUp={(e) => {
                  if (
                    (e.code === "Enter" || e.code === "NumpadEnter") &&
                    !urlError &&
                    url
                  )
                    onPreviewClick();
                }}
              />
              <span className={styles.inputError}>{urlError}</span>
            </div>
            <button
              onClick={onPreviewClick}
              className={styles.button}
              disabled={!!urlError || !url}
            >
              See Preview
            </button>
          </div>
        </section>
        {previewData || previewDataError ? (
          <section className={styles.previewSection}>
            <div className={styles.previewCard}>
              {previewDataError ? (
                <div className={styles.previewCardError}>
                  <p>Oops!</p>
                  <p>something went wrong</p>
                  <p>please try again later</p>
                </div>
              ) : (
                <>
                  {previewData?.ogp?.["og:video:url"]?.[0] ||
                  previewData?.ogp?.["og:video:secure_url"]?.[0] ||
                  previewData?.seo?.["twitter:player"]?.[0] ? (
                    <embed
                      className={styles.previewCardImg}
                      src={
                        previewData?.ogp?.["og:video:url"]?.[0] ||
                        previewData?.ogp?.["og:video:secure_url"]?.[0] ||
                        previewData?.seo?.["twitter:player"]?.[0]
                      }
                    />
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={styles.previewCardImg}
                        src={
                          previewData?.ogp?.["og:image"]?.[0] ||
                          previewData?.seo?.["twitter:image"]?.[0] ||
                          "/placeholder.png"
                        }
                        alt={
                          previewData?.title ||
                          previewData?.ogp?.["og:title"]?.[0] ||
                          previewData?.seo?.title?.[0] ||
                          previewData?.seo?.["twitter:title"]?.[0] ||
                          "Title"
                        }
                      />
                    </>
                  )}
                  <div className={styles.previewCardDetails}>
                    <a
                      target="_blank"
                      href={"//" + url}
                      rel="noopener noreferrer"
                      className={styles.previewCardLink}
                    >
                      {previewData?.ogp?.["og:site_name"]?.[0] ||
                        previewData?.seo?.["twitter:site"]?.[0] ||
                        url}
                    </a>
                    <a
                      target="_blank"
                      href={"//" + url}
                      rel="noopener noreferrer"
                      className={styles.previewCardTitle}
                    >
                      {previewData?.title ||
                        previewData?.ogp?.["og:title"]?.[0] ||
                        previewData?.seo?.title?.[0] ||
                        previewData?.seo?.["twitter:title"]?.[0] ||
                        "Title"}
                    </a>
                    <p className={styles.previewCardDesc}>
                      {previewData?.ogp?.["og:description"]?.[0] ||
                        previewData?.seo?.description?.[0] ||
                        previewData?.seo?.["twitter:description"]?.[0] ||
                        "Description"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Made by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://thekruz.tech"
            className={styles.footerLink}
          >
            {`Kru'Z`}
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
