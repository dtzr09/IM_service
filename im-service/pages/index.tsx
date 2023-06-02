import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const pageTitle = "Instant Messaging App";
    document.title = pageTitle;
    if (router.pathname == "/") router.push("/login");
  }, []);

  return (
    <div>
      <Head>
        <title>Instant Messaging App</title>
      </Head>
    </div>
  );
};

export default Home;
