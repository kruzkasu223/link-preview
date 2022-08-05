import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import styles from "../styles/Home.module.css";
import { IPreviewData } from "../types/types";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [previewData, setPreviewData] = useState<IPreviewData>();
  const [previewDataError, setPreviewDataError] = useState<IPreviewData>();

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
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Link Preview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
    </div>
  );
};

export default Home;