import { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import styles from "../style/next.module.css";

const Next = () => {
  let url = "";
  const [bad, setBad] = useState(false);
  const [messages, setMessages] = useState([
    { send: false, message: "hello world" },
  ]);
  const [status, setStatus] = useState("Disconnected");

  const router = useRouter();

  useEffect(() => {
    if (bad) {
      router.push("/home");
    }
  }, [bad]);

  if (!bad) {
    try {
      url = cookieCutter.get("url");
    } catch {}
    if (url !== "") {
      try {
        const ws = new WebSocket(url);
        if (status === "Disconnected") setStatus("Connected");
      } catch {
        cookieCutter.set("errorMessage", "Couldn't connect to the WebSocket.");
        console.log(cookieCutter.get("errorMessage"));

        setBad(true);
      }

      return (
        <main className={styles.main}>
          <div className={styles.statusContainer}>
            <h1>Status: {status}</h1>
            <h3>{url}</h3>
          </div>
          <div className={styles.messages}></div>
          <form className={styles.inputContainer}>
            <button className={styles.disconnect}>Disconnect</button>

            <input placeholder="Message" />
            <button className={styles.send}>Send</button>
          </form>
        </main>
      );
    } else {
      setBad(true);
    }
  }
  return <></>;
};

export default Next;
