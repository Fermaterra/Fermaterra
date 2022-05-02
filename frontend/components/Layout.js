import Head from "next/head";

import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>
          Terraferma|
          {" "}
          {title}
        </title>
        <meta name="description" content="Guitar store located on Barcelona" />
        <meta name="keywords" content="Guitars, Guitars store, Barcelona, Music store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header />
        {children}
      </>
    </>
  );
}
