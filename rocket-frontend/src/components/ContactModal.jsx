"use client"

const ContactModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="relative max-w-md w-full">
        {/* Subtle decorative background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-slate-600/20 to-teal-600/20 rounded-3xl blur opacity-40"></div>

        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-600/30"
          >
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4 float-animation">🚀</div>
            <h2 className="text-2xl font-bold gradient-text-accent mb-2">Let's Connect</h2>
            <p className="text-slate-300 text-sm">"Let's connect and build something amazing together!"</p>
          </div>

          {/* Contact Links */}
          <div className="space-y-4">
            <a
              href="mailto:rishichandan577@gmail.com"
              className="group flex items-center p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-200 group-hover:text-red-300 transition-colors">Email</div>
                <div className="text-sm text-slate-400">rishichandan577@gmail.com</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/rishi-chandan-didigam-18774b300"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">LinkedIn</div>
                <div className="text-sm text-slate-400">Professional Profile</div>
              </div>
            </a>

            <a
              href="https://github.com/RishiChandan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-200 group-hover:text-slate-300 transition-colors">GitHub</div>
                <div className="text-sm text-slate-400">Code Repository</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
