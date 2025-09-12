// src/pages/Qrpage.js
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import qrCodeImage from "../asserts/qr-code (1).png"; 

function Qrpage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Logout Button in top-right corner */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 text-white font-semibold bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>

      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 transition-transform duration-1000 ease-in-out hover:scale-105"
        style={{
          backgroundImage:
            "url('C:/Users/Venu/Desktop/final/ResturentManagment/public/qr-code (1).png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) blur(2px)",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/25 to-black/40"></div>

      {/* QR Code Container */}
      <div className="relative bg-white/80 backdrop-blur-lg p-12 rounded-4xl shadow-2xl flex flex-col items-center justify-center max-w-sm w-full transition-transform duration-500 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-wide">
          Scan Me!
        </h2>

        {/* QR Code Image */}
        <div className="w-64 h-64 flex items-center justify-center rounded-2xl border-4 border-gray-400 shadow-inner">
          <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" />
        </div>

        {/* Optional Description */}
        <p className="mt-6 text-center text-gray-700 font-medium text-lg">
          Open your camera and scan the QR code to explore our menu!
        </p>
      </div>

      {/* Optional Footer */}
      <div className="absolute bottom-6 text-gray-300 text-sm">
        &copy; Foodie Express
      </div>
    </div>
  );
}

export default Qrpage;