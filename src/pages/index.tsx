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
      "vnd.youtube://www.youtube.com/watch?v=ybJ_R08SogU&feature=applinks",
    ],
    "al:ios:app_name": ["YouTube"],
    "al:ios:app_store_id": ["544007664"],
    "al:ios:url": [
      "vnd.youtube://www.youtube.com/watch?v=ybJ_R08SogU&feature=applinks",
    ],
    "al:web:url": [
      "http://www.youtube.com/watch?v=ybJ_R08SogU&feature=applinks",
    ],
    "fb:app_id": ["87741124305"],
    "og:description": [
      "An updated version of this live stream will be released shortly. To view this or our other live streams, click the link below.https://www.youtube.com/yellowb...",
    ],
    "og:image": ["https://i.ytimg.com/vi/ybJ_R08SogU/maxresdefault_live.jpg"],
    "og:image:height": ["720"],
    "og:image:width": ["1280"],
    "og:site_name": ["YouTube"],
    "og:title": [
      "This live stream has ended. We will release a new version of this live stream soon. See link below",
    ],
    "og:type": ["video.other"],
    "og:url": ["https://www.youtube.com/watch?v=ybJ_R08SogU"],
    "og:video:height": ["360"],
    "og:video:secure_url": ["https://www.youtube.com/embed/ybJ_R08SogU"],
    "og:video:type": ["text/html"],
    "og:video:url": ["https://www.youtube.com/embed/ybJ_R08SogU"],
    "og:video:width": ["640"],
  },
  seo: {
    description: [
      "An updated version of this live stream will be released shortly. To view this or our other live streams, click the link below.https://www.youtube.com/yellowb...",
    ],
    keywords: [
      "vidÃ©o, partage, tÃ©lÃ©phone-appareil photo, visiophone, gratuit, envoi",
    ],
    "theme-color": ["rgba(255, 255, 255, 0.98)"],
    title: [
      "This live stream has ended. We will release a new version of this live stream soon. See link below",
    ],
    "twitter:app:id:googleplay": ["com.google.android.youtube"],
    "twitter:app:id:ipad": ["544007664"],
    "twitter:app:id:iphone": ["544007664"],
    "twitter:app:name:googleplay": ["YouTube"],
    "twitter:app:name:ipad": ["YouTube"],
    "twitter:app:name:iphone": ["YouTube"],
    "twitter:app:url:googleplay": [
      "https://www.youtube.com/watch?v=ybJ_R08SogU",
    ],
    "twitter:app:url:ipad": [
      "vnd.youtube://www.youtube.com/watch?v=ybJ_R08SogU&feature=applinks",
    ],
    "twitter:app:url:iphone": [
      "vnd.youtube://www.youtube.com/watch?v=ybJ_R08SogU&feature=applinks",
    ],
    "twitter:card": ["player"],
    "twitter:description": [
      "An updated version of this live stream will be released shortly. To view this or our other live streams, click the link below.https://www.youtube.com/yellowb...",
    ],
    "twitter:image": [
      "https://i.ytimg.com/vi/ybJ_R08SogU/maxresdefault_live.jpg",
    ],
    "twitter:player": ["https://www.youtube.com/embed/ybJ_R08SogU"],
    "twitter:player:height": ["360"],
    "twitter:player:width": ["640"],
    "twitter:site": ["@youtube"],
    "twitter:title": [
      "This live stream has ended. We will release a new version of this live stream soon. See link below",
    ],
    "twitter:url": ["https://www.youtube.com/watch?v=ybJ_R08SogU"],
  },
  title:
    "This live stream has ended. We will release a new version of this live stream soon. See link below - YouTube",
};
console.log(defaultData);
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
    <div className={styles.container}>
      <Head>
        <title>Link Preview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/link.svg" alt="link" className={styles.linkIcon} />
        <h1 className={styles.title}>Welcome to Link Preview!</h1>
      </main>
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
      <section className={styles.previewSection}>
        <div className={styles.previewCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.previewCardImg}
            src="https://i.ytimg.com/vi/y7MW7d8fb1Y/maxresdefault.jpg"
            alt="site title"
          />
          {/* <embed
            className={styles.previewCardEmbed}
            src="https://www.youtube.com/embed/5Eqb_-j3FDA"
          /> */}
          <div className={styles.previewCardDetails}>
            <a
              target="_blank"
              rel="noreferrer"
              className={styles.previewCardLink}
              href="//example.com"
            >
              example.com
            </a>
            <a href="//example.com" className={styles.previewCardTitle}>
              This live stream has ended. We will release a new version of this
              live stream soon. See link below - YouTube
            </a>
            <p className={styles.previewCardDesc}>
              This live stream has ended. We will release a new version of this
              live stream soon. See link below - YouTubeAn updated version of
              this live stream will be released shortly. To view this or our
              other live streams, click the link
              below.https://www.youtube.com/yellowb...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
