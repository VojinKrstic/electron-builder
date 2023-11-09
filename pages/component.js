"use client";

import { useEffect, useState } from "react";

const Component = () => {
  const [names, setNames] = useState([]);
  const [status, setStatus] = useState(true);

  async function fromAPI() {
    const response = await fetch("https://catfact.ninja/fact");
    const fact = await response.json();
    setNames([fact]);
  }

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
