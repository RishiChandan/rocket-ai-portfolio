import React from "react";

const ContactModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white/20 backdrop-blur-md rounded-2xl shadow-[0_15px_25px_rgba(0,0,0,0.4)] p-6 max-w-md w-full ring-1 ring-white/10">
        <div className="absolute top-2 right-4">
          <button
            onClick={onClose}
            className="text-white font-bold text-lg hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>
        <h2 className="text-xl text-white font-semibold text-center mb-4">
          "Let's connect and build something amazing together!"
        </h2>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:rishichandan577@gmail.com"
              className="text-blue-400 hover:underline"
            >
              rishichandan577@gmail.com
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/rishi-chandan-didigam-18774b300"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              linkedin.com/in/rishi-chandan-didigam
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/RishiChandan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              github.com/RishiChandan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
