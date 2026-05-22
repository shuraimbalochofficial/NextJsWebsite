import React from "react";
import Hello from "./components/hello";

const page = () => {
  console.log("Hello world !");
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>Testing My Next.js page.</p>
      <Hello />
    </div>
  );
};

export default page;
