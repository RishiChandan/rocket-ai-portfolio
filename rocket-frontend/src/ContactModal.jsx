// ContactModal.jsx
import React from "react";

const ContactModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-red-600 p-6 rounded-xl max-w-md w-full shadow-xl">
        <div className="text-right">
          <button
            onClick={onClose}
            className="text-red-400 hover:text-white font-bold text-lg"
          >
            ✖
          </button>
        </div>
        <h2 className="text-xl text-red-500 font-semibold text-center mb-4">"Let's connect and build something amazing together!"</h2>
        <div className="space-y-3 text-sm">
          <p><strong>Email:</strong> <a href="mailto:rishichandan577@gmail.com" className="text-blue-400 hover:underline">rishichandan577@gmail.com</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rishi-chandan-didigam-18774b300" target="_blank" className="text-blue-400 hover:underline">linkedin.com/in/rishi-chandan-didigam</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/RishiChandan" target="_blank" className="text-blue-400 hover:underline">github.com/RishiChandan</a></p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
