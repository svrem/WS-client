import React from "react";
import styles from "../style/home.module.css";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

const Home = () => {
  const [url, setUrl] = useState("");
  const [bad, setBad] = useState(false);
  const router = useRouter();

  let errorMessage = "";
  try {
    console.log(cookieCutter.get("errorMessage"));
    errorMessage = cookieCutter.get("errorMessage");
  } catch {
    console.log("No Error");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bad) {
      cookieCutter.set("url", url);

      console.log("PUSH");
      router.push("/next");
    }
  };

  useEffect(() => {
    if (url.startsWith("ws") || url.length === 0) {
      setBad(false);
    } else {
      setBad(true);
    }
  }, [url]);
  return (
    <>
      {
        <div className={errorMessage !== "" ? styles.errorMessage : ""}>
          <h1>{errorMessage !== "" ? errorMessage : ""}</h1>
        </div>
      }
      <h1 className={styles.title}>Connect</h1>
      <form id="form" onSubmit={handleSubmit} className={styles.container}>
        <input
          id="urlInput"
          className={bad ? styles.false : ""}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          placeholder="URL"
        />
        <button>Connect</button>
      </form>
    </>
  );
};

export default Home;
