import {
  Html, Head, Main, NextScript
} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head lang="en">
        <link
          rel="preload"
          href="/fonts/bon-voyage-thin.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/helvetica-neue-thin.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          href="/fonts/recife-dispaly-italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
