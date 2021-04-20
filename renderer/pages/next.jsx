import { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import styles from "../style/next.module.css";
import MessagesFrame from "../components/messages";

const Next = () => {
  let url = "";
  const [bad, setBad] = useState(false);
  const [ws, setWs] = useState(false);
  const [status, setStatus] = useState("Disconnected");
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (bad) {
      router.push("/home");
    }
  }, [bad]);

  useEffect(() => {
    if (ws != false) {
      ws.onmessage = (mess) => {
        const newData = [...messages, { send: false, message: mess.data }];
        setMessages(newData);
      };
    } else {
      setBad(true);
    }
  }, [ws]);

  if (!bad) {
    try {
      url = cookieCutter.get("url");
    } catch {}
    if (url !== "") {
      try {
        if (ws === false) setWs(new WebSocket(url));

        if (status === "Disconnected") setStatus("Connected");
      } catch {
        cookieCutter.set("errorMessage", "Couldn't connect to the WebSocket.");

        setBad(true);
      }
      return (
        <main className={styles.main}>
          <div className={styles.statusContainer}>
            <h1>Status: {status}</h1>
            <h3>{url}</h3>
          </div>
          <div className={styles.messages}>
            <MessagesFrame messages={messages} />
          </div>
          <form className={styles.inputContainer}>
            <button className={styles.disconnect} onClick={(e) => setBad(true)}>
              Disconnect
            </button>

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
