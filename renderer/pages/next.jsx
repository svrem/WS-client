import { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

const Next = () => {
  let url = "";
  const [bad, setBad] = useState(false);
  const router = useRouter();

  if (bad) {
    console.log("");
    router.push("/home");
  } else {
    try {
      url = cookieCutter.get("url");
    } catch {}
    console.log(url);
    if (url !== "") {
      try {
        const ws = new WebSocket(url);
      } catch {
        cookieCutter.set("errorMessage", "Couldn't connect to the WebSocket.");
        console.log(cookieCutter.get("errorMessage"));

        setBad(true);
      }

      return <h1>{url}</h1>;
    } else {
      setBad(true);
    }
  }
  return <></>;
};

export default Next;
