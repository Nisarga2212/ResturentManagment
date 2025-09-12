// // src/pages/Signup.js
// import { useState } from "react";
// import { auth, googleProvider, db } from "../firebase";
// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("client"); // default
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         role: role,
//       });

//       alert("Account created successfully!");
//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//     setLoading(false);
//   };

//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         role: role,
//       });

//       alert("Account created with Google successfully!");
//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black animate-gradient bg-400%">
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
//         {/* Title */}
//         <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-md mb-8 animate-fade-in">
//           Create Account ✨
//         </h2>

//         {/* Email Input */}
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full px-4 py-3 mb-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password Input */}
//         <input
//           type="password"
//           placeholder="Enter your password"
//           className="w-full px-4 py-3 mb-6 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Role Selector */}
//         <label className="block text-gray-200 mb-2 font-medium">Select Role:</label>
//         <select
//           onChange={(e) => setRole(e.target.value)}
//           value={role}
//           className="w-full px-4 py-3 mb-6 rounded-xl bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
//         >
//           <option value="client" className="bg-gray-800 text-white">
//             Client
//           </option>
//           <option value="admin" className="bg-gray-800 text-white">
//             Admin
//           </option>
//         </select>

//         {/* Create Account Button */}
//         <button
//           onClick={handleSignup}
//           disabled={loading}
//           className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
//         >
//           {loading ? (
//             <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             "Create Account"
//           )}
//         </button>

//         {/* Google Signup Button */}
//         <button
//           onClick={handleGoogleSignup}
//           disabled={loading}
//           className="w-full mt-4 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
//         >
//           {loading ? (
//             <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             "Signup with Google"
//           )}
//         </button>

//         {/* Login Link */}
//         <p className="text-center text-gray-300 mt-6">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


// src/pages/Signup.js
import { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
      });

      alert("Account created with Google successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cmVzdGF1cmFudHxlbnwwfHx8fDE2OTA5OTIxNTA&ixlib=rb-4.0.3&q=80&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to dim the background slightly */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Glassmorphism card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-md mb-8 animate-fade-in">
          Create Account ✨
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 mb-6 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selector */}
        <label className="block text-gray-200 mb-2 font-medium">Select Role:</label>
        <select
          onChange={(e) => setRole(e.target.value)}
          value={role}
          className="w-full px-4 py-3 mb-6 rounded-xl bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
        >
          <option value="client" className="bg-gray-800 text-white">
            Client
          </option>
          <option value="admin" className="bg-gray-800 text-white">
            Admin
          </option>
        </select>

        {/* Create Account Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Signup with Google"
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
