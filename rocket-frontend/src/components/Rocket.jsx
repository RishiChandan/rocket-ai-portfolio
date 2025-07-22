"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"

function Rocket() {
  const [answer, setAnswer] = useState("")
  const [displayedAnswer, setDisplayedAnswer] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    setAnswer("")
    setDisplayedAnswer("")
    setLoading(true)

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/ask`, {
        question: input,
      })
      setAnswer(res.data.answer)
    } catch (err) {
      console.error(err)
      setAnswer("Oops! Rocket got tangled in the web 🕸️")
    } finally {
      setLoading(false)
      setInput("")
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage()
  }

  useEffect(() => {
    let i = 0
    setDisplayedAnswer("")
    if (answer) {
      const interval = setInterval(() => {
        setDisplayedAnswer((prev) => prev + answer.charAt(i))
        i++
        if (i >= answer.length) clearInterval(interval)
      }, 12)
      return () => clearInterval(interval)
    }
  }, [answer])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative">
      {/* Advanced ML Background Layers */}
      <div className="matrix-rain"></div>
      <div className="ai-waves"></div>

      <div className="relative bg-slate-900/30 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 border border-slate-700/40 overflow-hidden">
        {/* Enhanced decorative elements with advanced ML theme */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Pulsing Neural Nodes */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-emerald-500/8 to-teal-500/8 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/6 to-pink-500/6 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>

          {/* Floating Data Streams */}
          <div className="absolute top-20 left-20 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-1 h-24 bg-gradient-to-b from-transparent via-emerald-500/15 to-transparent animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col gap-10">
          {/* Professional Profile Summary */}
          <div className="flex flex-col lg:flex-row items-start gap-8 fade-in-up">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-slate-600/20 to-teal-600/20 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
              <img
                src="/rishi.jpg"
                alt="Rishi"
                className="relative w-48 h-60 rounded-2xl object-cover shadow-xl border border-slate-600/30 card-hover"
              />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Rishi Chandan Didigam</h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  AI/ML Engineer passionate about intelligent systems, model building, and solving problems with
                  creativity and code.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 card-hover professional-hover">
                  <h2 className="font-bold text-lg text-blue-300 mb-3 flex items-center">
                    <span className="mr-2">🧠</span>
                    Core Expertise
                  </h2>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <div>
                        <strong className="text-slate-200">Machine Learning & AI:</strong> GPT-4.1, LLaMA, Transformers,
                        RAG (LangChain), Neural Networks
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2 mt-1">•</span>
                      <div>
                        <strong className="text-slate-200">Backend Development:</strong> FastAPI, Django, Spring Boot,
                        PostgreSQL, Docker, AWS
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-400 mr-2 mt-1">•</span>
                      <div>
                        <strong className="text-slate-200">Frontend & Data:</strong> React.js, Tailwind CSS, Data
                        Engineering, MLOps
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 card-hover professional-hover">
                  <h2 className="font-bold text-lg text-teal-300 mb-3 flex items-center">
                    <span className="mr-2">🚀</span>
                    Featured Work
                  </h2>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a
                        href="https://github.com/RishiChandan/rocket-ai-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg bg-slate-700/15 hover:bg-slate-700/30 transition-all duration-300 border border-slate-600/20 hover:border-slate-500/40 group professional-hover"
                      >
                        <div className="font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                          Rocket AI Portfolio Assistant
                        </div>
                        <div className="text-slate-400 text-xs mt-1">GPT-powered interactive portfolio</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/RishiChandan/LangChain_File_Assistant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg bg-slate-700/15 hover:bg-slate-700/30 transition-all duration-300 border border-slate-600/20 hover:border-slate-500/40 group professional-hover"
                      >
                        <div className="font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                          LangChain File Assistant
                        </div>
                        <div className="text-slate-400 text-xs mt-1">Document query with RAG</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/RishiChandan/DGAAL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg bg-slate-700/15 hover:bg-slate-700/30 transition-all duration-300 border border-slate-600/20 hover:border-slate-500/40 group professional-hover"
                      >
                        <div className="font-semibold text-slate-200 group-hover:text-slate-300 transition-colors">
                          DGAAL
                        </div>
                        <div className="text-slate-400 text-xs mt-1">Deep Graph Attention Networks</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Search Interface */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <input
                type="text"
                className="relative w-full p-5 rounded-2xl text-slate-200 bg-slate-800/40 backdrop-blur-sm focus:outline-none transition-all duration-300 placeholder:text-slate-400 border border-slate-600/30 focus:border-blue-500/50 focus:bg-slate-800/60"
                placeholder="I am RoCket, Rishi's Bestfriend. Ask me anything about his experience and projects!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="relative px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-semibold professional-hover"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Ask RoCket 🚀"
              )}
            </button>
          </div>

          {/* Professional Answer Display */}
          <div className="w-full max-w-4xl text-left space-y-6" ref={resultsRef}>
            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-4"></div>
                  <div className="text-slate-300 professional-pulse">RoCket is analyzing your question...</div>
                </div>
              </div>
            )}
            {!loading && displayedAnswer && (
              <div className="relative group fade-in-up">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/10 to-blue-600/10 rounded-2xl blur opacity-50"></div>
                <div className="relative px-6 py-5 rounded-2xl bg-slate-800/50 backdrop-blur-sm text-slate-200 shadow-xl whitespace-pre-line border border-slate-600/30 card-hover">
                  <div className="flex items-start">
                    <div className="text-2xl mr-3 mt-1 float-animation">🚀</div>
                    <div className="flex-1 leading-relaxed">{displayedAnswer}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rocket
