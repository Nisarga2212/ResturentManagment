// // src/pages/Login.js
// import { useState } from "react";
// import { auth, googleProvider, db } from "../firebase";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false); // loader state
//   const navigate = useNavigate();

//   const redirectBasedOnRole = async (uid) => {
//     const docRef = doc(db, "users", uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const role = docSnap.data().role;
//       if (role === "admin") navigate("/admin");
//       else if (role === "client") navigate("/client");
//       else alert("Role not assigned.");
//     } else {
//       alert("No role found for this user.");
//     }
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       await redirectBasedOnRole(userCredential.user.uid);
//     } catch (error) {
//       alert(error.message);
//     }
//     setLoading(false);
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       await redirectBasedOnRole(result.user.uid);
//     } catch (error) {
//       alert(error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Login
//         </h2>

//         {/* Email Input */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password Input */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-4 py-2 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Login Button */}
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             "Login"
//           )}
//         </button>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             "Login with Google"
//           )}
//         </button>

//         {/* Signup Link */}
//         <p className="text-center text-gray-600 mt-6">
//           Don’t have an account?{" "}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Signup
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


// src/pages/Login.js
import { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirectBasedOnRole = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      if (role === "admin") navigate("/admin");
      else if (role === "client") navigate("/client");
      else alert("Role not assigned.");
    } else {
      alert("No role found for this user.");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await redirectBasedOnRole(userCredential.user.uid);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await redirectBasedOnRole(result.user.uid);
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
          "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fHx8MTY5MDk5MzM1OA&ixlib=rb-4.0.3&q=80&w=1920')", // 🍴 Different restaurant background
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
          Welcome Back 👋
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

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login with Google"
          )}
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
