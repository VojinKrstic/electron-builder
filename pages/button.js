"use client";

import { useEffect, useState } from "react";

const Button = () => {
  const [names, setNames] = useState();
  useEffect(() => {
    console.log({ names: names });
  }, [names]);

  return (
    <button onClick={() => setNames(window.api.getNames())}>Click Me!</button>
  );
};

export default Button;
