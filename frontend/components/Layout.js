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

        <meta name="description" content="Terraferma " />
        <meta name="keywords" content="Menorca, Yoga, Kundalini, Frigidarium, Pranayama, Chi kung, experience, relax, activity, activities, Balears" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@200;300;400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <>
        <Header />
        {children}
      </>
    </>
  );
}
