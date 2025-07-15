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
      }, 8);
      return () => clearInterval(interval);
    }
  }, [answer]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_4px_25px_rgba(255,255,255,0.5)] p-6 flex flex-col gap-8 border border-white/20">

        {/* 🚀 Top Profile Summary */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src="/rishi.jpg"
            alt="Rishi"
            className="w-40 h-90 rounded-xl object-cover"
          />

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold" style={{ color: "#DDDDDD" }}>
              Rishi Chandan Didigam
            </h1>
            <p className="text-xs" style={{ color: "#DDDDDD" }}>
              AI/ML Engineer passionate about intelligent systems, model building,
              and solving problems with creativity and code.
            </p>

            <div>
              <h2 className="font-semibold text-sm" style={{ color: "#DDDDDD" }}>
                Key Skills
              </h2>
              <ul className="list-disc list-inside text-xs" style={{ color: "#DDDDDD" }}>
                <li><b>Machine Learning & Deep Learning:</b> GPT-4.1, LLaMA, Transformers, RAG (LangChain), CNNs, LSTMs, Scikit-learn, PyTorch, TensorFlow, XGBoost, model deployment via FastAPI/Flask.</li>
                <li><b>Backend & DevOps:</b> Spring Boot, Django, FastAPI, REST APIs, PostgreSQL, Docker, AWS (SageMaker, Lambda), Jenkins, GitHub Actions, CI/CD pipelines.</li>
                <li><b>Frontend & Data Engineering:</b> React.js, Tailwind CSS, Vite, feature engineering, preprocessing, hyperparameter tuning, and cloud-integrated MLOps workflows (MLflow, A/B testing).</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-sm" style={{ color: "#DDDDDD" }}>
                Projects
              </h2>
              <ul className="list-disc list-inside text-xs" style={{ color: "#DDDDDD" }}>
                <li>
                  <a href="https://github.com/RishiChandan/rocket-ai-portfolio" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Rocket AI Portfolio Assistant
                  </a>
                </li>
                <li>
                  <a href="https://github.com/RishiChandan/LangChain_File_Assistant" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LangChain File Assistant
                  </a>
                </li>
                <li>
                  <a href="https://github.com/RishiChandan/DGAAL" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    DGAAL
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            className="flex-1 p-4 rounded-xl text-white bg-[#333333] focus:outline-none transition-all duration-300 custom-hover-glow placeholder:text-gray-300"
            placeholder="I am RoCket, Rishi's best friend. I'm excited to talk about Rishi!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            className="p-4 px-6 rounded-xl text-white bg-[#333333] focus:outline-none transition-all duration-300 custom-hover-glow"
          >
            Ask 🚀
          </button>
        </div>

        {/* 💬 Answer Section */}
        <div className="w-full max-w-2xl text-left space-y-4" ref={resultsRef}>
          {loading && (
            <div className="text-gray-800 animate-pulse">Rocket is thinking...</div>
          )}
          {!loading && displayedAnswer && (
            <div className="px-4 py-3 rounded-lg bg-[#333333] text-white shadow-md whitespace-pre-line">
              {displayedAnswer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

export default App;
