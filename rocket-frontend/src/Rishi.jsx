import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

const Rishi = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full min-h-screen text-[#E0E0E0] p-4 relative">
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_4px_25px_rgba(255,255,255,0.5)] p-6 border border-white/20 space-y-10">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center" data-aos="fade-up">
          <img
            src="/rishi.jpg"
            alt="Rishi"
            className="w-40 h-90 rounded-xl object-cover mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-300">Rishi Chandan Didigam</h1>
          <p className="mt-2 text-sm max-w-md text-gray-200">
            AI/ML Engineer passionate about intelligent systems, model building,
            and solving problems with creativity and code.
          </p>
        </div>

        {/* Portfolio Content */}
        <div className="w-full max-w-4xl space-y-10 mx-auto">
          <section data-aos="fade-up">
            <h2 className="text-3xl font-bold text-center text-gray-300 mb-4">About Me</h2>
            <p className="text-gray-200 text-sm leading-7">
              🎓 Recently graduated from <strong>George Mason University</strong> in May 2025 with a degree in Computer Science. I'm passionate about exploring the fascinating world of <strong>Machine Learning and Deep Learning</strong>, constantly seeking to understand how artificial intelligence can solve real-world problems.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Just like how Spider-Man learned that with great power comes great responsibility, I believe in using AI and technology to make a positive impact on the world, one algorithm at a time.
            </p>
          </section>

          <section data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-3xl font-bold text-center text-gray-300 mb-4">Skills</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">
              <li><strong className="text-gray-300">Languages:</strong> Python, Java, C++, JavaScript, SQL</li>
              <li><strong className="text-gray-300">Frontend:</strong> React.js, Tailwind CSS, Vite, HTML5, CSS3, Responsive Design, UI Animations, Dark/Light Mode Toggle</li>
              <li><strong className="text-gray-300">Backend & APIs:</strong> FastAPI, Flask, Spring Boot, Django, RESTful APIs, JWT Authentication</li>
              <li><strong className="text-gray-300">AI/ML:</strong> RAG (LangChain), Prompt Engineering, GPT-4.1, LLaMA, Transformers, TensorFlow, PyTorch, scikit-learn, XGBoost</li>
              <li><strong className="text-gray-300">Data Engineering:</strong> Feature Engineering, Preprocessing, Optimization, Hyperparameter Tuning</li>
              <li><strong className="text-gray-300">MLOps:</strong> MLflow, Bayesian Search, A/B Testing, Quantization</li>
              <li><strong className="text-gray-300">Cloud & DevOps:</strong> AWS (SageMaker, EC2, Lambda), Azure, Docker, Git, GitHub Actions, Jenkins</li>
              <li><strong className="text-gray-300">Databases:</strong> PostgreSQL, MySQL, MongoDB</li>
              <li><strong className="text-gray-300">Tools:</strong> Node.js, Uvicorn, npm, Python venv, .env API Key Handling</li>
            </ul>
          </section>

          <section data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-3xl font-bold text-center text-gray-300 mb-4">Projects in My Web</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Rocket AI Portfolio Assistant",
                  desc: "A GPT-powered interactive portfolio using RAG and vector search to answer questions about me in real-time. Includes typing animations, dark/light themes, and full-stack integration.",
                  link: "https://github.com/RishiChandan/rocket-ai-portfolio"
                },
                {
                  title: "LangChain File Assistant",
                  desc: "Upload PDFs, generate embeddings, and query documents using a conversational agent. Practical demo of agentic AI and RAG.",
                  link: "https://github.com/RishiChandan/LangChain_File_Assistant"
                },
                {
                  title: "DGAAL",
                  desc: "Deep Graph Attention and Adversarial Learning using PyTorch for advanced graph neural networks and data analysis.",
                  link: "https://github.com/RishiChandan/DGAAL"
                },
                {
                  title: "Stock Price Prediction",
                  desc: "LSTM-based time series forecasting for stock market movement prediction using technical indicators.",
                  link: "https://github.com/RishiChandan/stock-price-prediction"
                },
                {
                  title: "Eigenfaces OpenCV",
                  desc: "PCA-based facial recognition using OpenCV to demonstrate dimensionality reduction and image processing.",
                  link: "https://github.com/RishiChandan/Eigenfaces_OpenCV"
                }
              ].map((project, index) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 border border-white/20 p-4 rounded-lg hover:shadow-[0_0_12px_#aaaaaa66] hover:scale-[1.01] transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={`${300 + index * 100}`}
                >
                  <h3 className="text-lg font-semibold text-gray-300">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Scroll to Top Button (outside container) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-300 text-black shadow-md hover:bg-gray-400 transition duration-300 z-50"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default Rishi;
