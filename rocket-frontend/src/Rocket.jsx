import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setAnswer("");
    setDisplayedAnswer("");
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/ask`, {
        question: input,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Oops! Rocket got tangled in the web 🕸️");
    } finally {
      setLoading(false);
      setInput("");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    let i = 0;
    setDisplayedAnswer("");
    if (answer) {
      const interval = setInterval(() => {
        setDisplayedAnswer((prev) => prev + answer.charAt(i));
        i++;
        if (i >= answer.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [answer]);

  return (
    <div className=" bg-gradient-to-br from-red-900 via-black to-blue-900 text-white p-6 flex flex-col items-center dark:bg-black">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <img
          src="/rishi.jpg"
          alt="Rishi"
          className="rounded-full w-32 h-32 border-4 border-red-600 mb-4"
        />
        <h1 className="text-4xl font-bold text-red-500">Rishi Chandan Didigam</h1>
        <p className="mt-2 text-sm max-w-md">
          AI/ML Engineer passionate about intelligent systems, model building,
          and solving problems with creativity and code.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl flex items-center gap-2 mb-10">
        <input
          type="text"
          className="flex-1 bg-white/10 border border-red-500 text-white placeholder-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-md"
          placeholder="I am RoCket, Rishi's best friend. I'm excited to talk about Rishi!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-blue-700 hover:to-red-600 transition-all text-white px-4 py-2 rounded shadow-md font-semibold"
        >
          Ask 🚀
        </button>
      </div>

      {/* Answer Section */}
      <div className="w-full max-w-2xl text-left space-y-4" ref={resultsRef}>
        {loading && (
          <div className="text-white animate-pulse">Rocket is thinking...</div>
        )}
        {!loading && displayedAnswer && (
          <div className="px-4 py-3 rounded-lg bg-red-600 text-white shadow-md whitespace-pre-line">
            {displayedAnswer}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
