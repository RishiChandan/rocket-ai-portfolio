"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const Rishi = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  const projects = [
    {
      title: "Rocket AI Portfolio Assistant",
      desc: "A GPT-powered interactive portfolio using RAG and vector search to answer questions about me in real-time. Includes typing animations, dark/light themes, and full-stack integration.",
      link: "https://github.com/RishiChandan/rocket-ai-portfolio",
      color: "from-blue-600/20 to-slate-600/20",
      tech: ["Python", "FastAPI", "React", "OpenAI", "Vector DB"],
    },
    {
      title: "LangChain File Assistant",
      desc: "Upload PDFs, generate embeddings, and query documents using a conversational agent. Practical demo of agentic AI and RAG.",
      link: "https://github.com/RishiChandan/LangChain_File_Assistant",
      color: "from-teal-600/20 to-slate-600/20",
      tech: ["LangChain", "Python", "Streamlit", "Vector Search"],
    },
    {
      title: "DGAAL",
      desc: "Deep Graph Attention and Adversarial Learning using PyTorch for advanced graph neural networks and data analysis.",
      link: "https://github.com/RishiChandan/DGAAL",
      color: "from-slate-600/20 to-blue-600/20",
      tech: ["PyTorch", "Graph Neural Networks", "Deep Learning"],
    },
    {
      title: "Stock Price Prediction",
      desc: "LSTM-based time series forecasting for stock market movement prediction using technical indicators.",
      link: "https://github.com/RishiChandan/stock-price-prediction",
      color: "from-emerald-600/20 to-slate-600/20",
      tech: ["LSTM", "Time Series", "TensorFlow", "Financial Data"],
    },
    {
      title: "Eigenfaces OpenCV",
      desc: "PCA-based facial recognition using OpenCV to demonstrate dimensionality reduction and image processing.",
      link: "https://github.com/RishiChandan/Eigenfaces_OpenCV",
      color: "from-indigo-600/20 to-slate-600/20",
      tech: ["OpenCV", "PCA", "Computer Vision", "Python"],
    },
  ]

  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "Java", "C++", "JavaScript", "SQL"],
      icon: "💻",
      color: "from-blue-600/10 to-slate-700/10",
    },
    {
      category: "Frontend Development",
      items: ["React.js", "Tailwind CSS", "Vite", "HTML5", "CSS3", "Responsive Design"],
      icon: "🎨",
      color: "from-teal-600/10 to-slate-700/10",
    },
    {
      category: "Backend & APIs",
      items: ["FastAPI", "Flask", "Spring Boot", "Django", "RESTful APIs", "JWT Authentication"],
      icon: "⚙️",
      color: "from-slate-600/10 to-blue-700/10",
    },
    {
      category: "AI & Machine Learning",
      items: ["RAG (LangChain)", "GPT-4.1", "LLaMA", "Transformers", "TensorFlow", "PyTorch", "scikit-learn"],
      icon: "🧠",
      color: "from-indigo-600/10 to-slate-700/10",
    },
    {
      category: "Data Engineering",
      items: ["Feature Engineering", "Data Preprocessing", "Optimization", "Hyperparameter Tuning"],
      icon: "📊",
      color: "from-emerald-600/10 to-slate-700/10",
    },
    {
      category: "MLOps & DevOps",
      items: ["MLflow", "Docker", "AWS (SageMaker, EC2, Lambda)", "GitHub Actions", "Jenkins"],
      icon: "🔄",
      color: "from-purple-600/10 to-slate-700/10",
    },
    {
      category: "Cloud & Databases",
      items: ["AWS", "Azure", "PostgreSQL", "MySQL", "MongoDB"],
      icon: "☁️",
      color: "from-cyan-600/10 to-slate-700/10",
    },
    {
      category: "Development Tools",
      items: ["Git", "Node.js", "npm", "Python venv", "API Integration"],
      icon: "🛠️",
      color: "from-orange-600/10 to-slate-700/10",
    },
  ]

  return (
    <div className="w-full min-h-screen text-slate-200 p-6 relative">
      {/* Subtle background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/2 rounded-full blur-3xl"></div>
      </div>

      {/* Container */}
      <div className="relative max-w-6xl mx-auto bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 space-y-12">
        {/* Professional Profile Section */}
        <div className="flex flex-col items-center text-center" data-aos="fade-up">
          <div className="relative group mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-slate-600/20 to-teal-600/20 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <img
              src="/rishi.jpg"
              alt="Rishi"
              className="relative w-48 h-60 rounded-3xl object-cover shadow-2xl border-2 border-slate-600/30 card-hover"
            />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">Rishi Chandan Didigam</h1>
          <p className="mt-2 text-lg max-w-2xl text-slate-300 leading-relaxed">
            AI/ML Engineer passionate about intelligent systems, model building, and solving problems with creativity
            and code.
          </p>
        </div>

        {/* About Me Section */}
        <section data-aos="fade-up" className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 to-teal-600/5 rounded-3xl blur-xl"></div>
          <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30 professional-hover">
            <h2 className="text-4xl font-bold text-center gradient-text-accent mb-6">About Me</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p className="text-lg">
                🎓 Recently graduated from <strong className="text-slate-200">George Mason University</strong> in May
                2025 with a degree in Computer Science. I'm passionate about exploring the fascinating world of{" "}
                <strong className="text-blue-300">Machine Learning and Deep Learning</strong>, constantly seeking to
                understand how artificial intelligence can solve real-world problems.
              </p>
              <p className="text-slate-400 italic">
                Just like how Spider-Man learned that with great power comes great responsibility, I believe in using AI
                and technology to make a positive impact on the world, one algorithm at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl font-bold text-center gradient-text-accent mb-8">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className={`relative group bg-gradient-to-br ${skill.color} backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover`}
                data-aos="fade-up"
                data-aos-delay={`${200 + index * 50}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl float-animation" style={{ animationDelay: `${index * 0.2}s` }}>
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-200 mb-3">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="px-3 py-1 text-xs bg-slate-700/40 text-slate-300 rounded-full border border-slate-600/30 hover:bg-slate-600/40 transition-colors duration-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-4xl font-bold text-center gradient-text-accent mb-8">Featured Projects</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative"
                data-aos="fade-up"
                data-aos-delay={`${300 + index * 100}`}
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
                ></div>
                <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 p-6 rounded-2xl hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-200 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed mb-4">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-slate-700/50 text-slate-400 rounded border border-slate-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 float-animation">
                      🔗
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Professional Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-300 shadow-xl hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 z-50 border border-slate-600/30 hover:border-blue-500/50"
        title="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}

export default Rishi
