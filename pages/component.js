"use client";

import { useEffect, useState } from "react";

const Component = () => {
  const [names, setNames] = useState([]);
  const [status, setStatus] = useState();

  async function fromAPI() {
    const response = await fetch("https://catfact.ninja/fact");
    const fact = await response.json();
    setNames([fact]);
  }

  const checkOnlineStatus = async () => {
    try {
      const online = await fetch("https://catfact.ninja/fact");
      return online.status >= 200 && online.status < 300;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const plusWorker = new Worker(
      new URL("../demo_worker.js", import.meta.url)
    );
    plusWorker.onmessage = (event) => {
      console.log("🍏 Message received from worker: ", event.data);
      if (event.data === true) {
        setStatus((prev) => {
          if (prev === false || prev === undefined) fromAPI();
          return true;
        });
      }
      if (event.data === false) {
        setStatus((prev) => {
          if (prev === true || prev === undefined) setNames(api.getNames());
          return false;
        });
      }
    };

    plusWorker.onerror = (event) => {
      if (event instanceof Event) {
        console.log("🍎 Error message received from worker: ", event);
        return event;
      }
      console.log("🍎 Unexpected error: ", event);
      throw event;
    };

    setInterval(async () => {
      const result = await checkOnlineStatus();
      plusWorker.postMessage(result);
    }, 3000);

    return () => {
      plusWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (window.navigator.onLine) {
      setStatus(true);
      fromAPI();
    } else {
      setStatus(false);
      setNames(api.getNames());
    }
    // window.api.storeData();
  }, []);

  return (
    <div>
      {names.map((name, id) => {
        return <p key={id}>{status === true ? name.fact : name.name}</p>;
      })}
    </div>
  );
};

export default Component;
