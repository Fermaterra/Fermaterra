import Head from "next/head";
import Footer from "./adminForms/Footer";

import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>
          Terraferma |
          {" "}
          {title}
        </title>

        <meta name="description" content="Terraferma " />
        <meta name="keywords" content="Menorca, Yoga, Kundalini, Frigidarium, Pranayama, Chi kung, experience, relax, activity, activities, Balears" />

      </Head>
      <>
        <Header />
        {children}
        <Footer />
      </>
    </>
  );
}
