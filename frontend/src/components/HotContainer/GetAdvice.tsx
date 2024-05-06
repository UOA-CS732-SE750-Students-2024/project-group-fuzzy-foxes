import { useState, useEffect } from "react";
import "./GetAdvice.css";

interface MessageProps {
  count: number;
}

export default function GetAdvice() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  async function getSomeAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getSomeAdvice();
  }, []);

  return (
    <div className="container">
      <h2>Suggestions</h2>
      <p className="advice">{advice}</p>
      <button onClick={getSomeAdvice}>Get advice</button>
      <Message count={count} />
    </div>
  );
}

function Message(props: MessageProps) {
  return (
    <p className="message">
      You have read <strong>{props.count}</strong> times
    </p>
  );
}
