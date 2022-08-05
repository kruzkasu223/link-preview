export interface IPreviewData {
  oembed?: unknown;
  ogp?: {
    "og:url"?: string[];
    "og:type"?: string[];
    "og:image"?: string[];
    "og:title"?: string[];
    "fb:app_id"?: string[];
    "al:ios:url"?: string[];
    "al:web:url"?: string[];
    "og:site_name"?: string[];
    "og:video:tag"?: string[];
    "og:video:url"?: string[];
    "og:video:type"?: string[];
    "al:android:url"?: string[];
    "og:description"?: string[];
    "og:image:width"?: string[];
    "og:video:width"?: string[];
    "al:ios:app_name"?: string[];
    "og:image:height"?: string[];
    "og:video:height"?: string[];
    "al:android:package"?: string[];
    "al:android:app_name"?: string[];
    "al:ios:app_store_id"?: string[];
    "og:video:secure_url"?: string[];
  };
  seo?: {
    title?: string[];
    keywords?: string[];
    description?: string[];
    "theme-color"?: string[];
    "twitter:url"?: string[];
    "twitter:card"?: string[];
    "twitter:site"?: string[];
    "twitter:image"?: string[];
    "twitter:title"?: string[];
    "twitter:player"?: string[];
    "twitter:app:id:ipad"?: string[];
    "twitter:description"?: string[];
    "twitter:app:url:ipad"?: string[];
    "twitter:player:width"?: string[];
    "twitter:app:id:iphone"?: string[];
    "twitter:app:name:ipad"?: string[];
    "twitter:player:height"?: string[];
    "twitter:app:url:iphone"?: string[];
    "twitter:app:name:iphone"?: string[];
    "twitter:app:id:googleplay"?: string[];
    "twitter:app:url:googleplay"?: string[];
    "twitter:app:name:googleplay"?: string[];
  };
  title?: string;
}
