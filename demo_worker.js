const onmessage = (event) => {
  console.log("🐝 Worker: Message received from main script");
  const data = event.data;
  console.log("🐝 Worker: Posting message back to main script");
  postMessage(data);
};

addEventListener("message", onmessage);
