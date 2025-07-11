import React from "react";
import "./index.css";

const Rishi = () => {
  return (
    <div className="bg-gradient-to-br from-red-900 via-black to-blue-900 text-white p-6 flex flex-col items-center dark:bg-black">
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

      {/* Scrollable Portfolio Content */}
      <div className="w-full max-w-4xl space-y-10">
        <section>
          <h2 className="text-3xl font-bold text-center text-red-400 mb-4">About Me</h2>
          <p className="text-gray-200 text-sm leading-7">
            🎓 Recently graduated from <strong>George Mason University</strong> in May 2025 with a degree in Computer Science. I'm passionate about exploring the fascinating world of <strong>Machine Learning and Deep Learning</strong>, constantly seeking to understand how artificial intelligence can solve real-world problems. My journey in computer science has been driven by curiosity and a desire to push the boundaries of what's possible with technology.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Just like how Spider-Man learned that with great power comes great responsibility, I believe in using AI and technology to make a positive impact on the world, one algorithm at a time.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center text-red-400 mb-4">Skills</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">
            <li><strong className="text-red-500">Languages:</strong> Python, Java, C++, JavaScript, SQL</li>
            <li><strong className="text-red-500">Frontend:</strong> React.js, Tailwind CSS, Vite, HTML5, CSS3, Responsive Design, UI Animations, Dark/Light Mode Toggle</li>
            <li><strong className="text-red-500">Backend & APIs:</strong> FastAPI, Flask, Spring Boot, Django, RESTful APIs, JWT Authentication</li>
            <li><strong className="text-red-500">AI/ML:</strong> RAG (LangChain), Prompt Engineering, GPT-4.1, LLaMA, Transformers, TensorFlow, PyTorch, scikit-learn, XGBoost</li>
            <li><strong className="text-red-500">Data Engineering:</strong> Feature Engineering, Preprocessing, Optimization, Hyperparameter Tuning</li>
            <li><strong className="text-red-500">MLOps:</strong> MLflow, Bayesian Search, A/B Testing, Quantization</li>
            <li><strong className="text-red-500">Cloud & DevOps:</strong> AWS (SageMaker, EC2, Lambda), Azure, Docker, Git, GitHub Actions, Jenkins</li>
            <li><strong className="text-red-500">Databases:</strong> PostgreSQL, MySQL, MongoDB</li>
            <li><strong className="text-red-500">Tools:</strong> Node.js, Uvicorn, npm, Python venv, .env API Key Handling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center text-red-400 mb-4">Projects in My Web</h2>
          <div className="space-y-6">
            <div className="bg-white/10 border border-red-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-300">Rocket AI Portfolio Assistant</h3>
              <p className="text-sm text-gray-300">A GPT-powered interactive portfolio that uses RAG (Retrieval-Augmented Generation) and vector search to answer questions about me in real-time. Includes typing animations, dark/light themes, and a React + FastAPI frontend/backend integration.</p>
              <a href="https://github.com/RishiChandan/rocket-ai-portfolio" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm underline">GitHub Link</a>
            </div>
            <div className="bg-white/10 border border-red-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-300">LangChain File Assistant</h3>
              <p className="text-sm text-gray-300">Upload PDFs, generate embeddings, and query documents using a conversational agent. Demonstrates practical knowledge of agentic AI and retrieval-augmented generation.</p>
              <a href="https://github.com/RishiChandan/LangChain_File_Assistant" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm underline">GitHub Link</a>
            </div>
            <div className="bg-white/10 border border-red-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-300">DGAAL</h3>
              <p className="text-sm text-gray-300">Deep Graph Attention and Adversarial Learning using PyTorch for advanced graph neural networks and data analysis.</p>
              <a href="https://github.com/RishiChandan/DGAAL" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm underline">GitHub Link</a>
            </div>
            <div className="bg-white/10 border border-red-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-300">Stock Price Prediction</h3>
              <p className="text-sm text-gray-300">LSTM-based time series forecasting for stock market movement prediction using technical indicators.</p>
              <a href="https://github.com/RishiChandan/stock-price-prediction" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm underline">GitHub Link</a>
            </div>
            <div className="bg-white/10 border border-red-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-300">Eigenfaces OpenCV</h3>
              <p className="text-sm text-gray-300">PCA-based facial recognition project using OpenCV to demonstrate dimensionality reduction and image processing.</p>
              <a href="https://github.com/RishiChandan/Eigenfaces_OpenCV" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm underline">GitHub Link</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rishi;
