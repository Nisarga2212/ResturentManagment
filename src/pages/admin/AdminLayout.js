// // src/pages/admin/AdminLayout.js
// import NavBar from "../../Components/admin/NavBar";
// import SideBar from "../../Components/admin/SideBar";

// function AdminLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 animate-gradient bg-400%">
//       {/* Sidebar */}
//       <div className="w-64 hidden md:block animate-slide-up">
//         <SideBar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <div className="sticky top-0 z-50 animate-fade-in">
//           <NavBar />
//         </div>

//         {/* Page Content */}
//         <div className="p-6 overflow-y-auto animate-slide-up">
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 animate-fade-in">
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;





// // src/pages/admin/AdminLayout.js
// import NavBar from "../../Components/admin/NavBar";
// import SideBar from "../../Components/admin/SideBar";

// function AdminLayout({ children }) {
//   return (
//     <div
//       className="flex min-h-screen relative"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1555992336-c8d4a2f2b6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cmVzdGF1cmFudHxlbnwwfHx8fDE2OTA5OTIxNTA&ixlib=rb-4.0.3&q=80&w=1920')", // 🍽️ Restaurant interior
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay to dim the background slightly */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Sidebar */}
//       <div className="w-64 hidden md:block relative z-10 animate-slide-up">
//         <SideBar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col relative z-10">
//         {/* Navbar */}
//         <div className="sticky top-0 z-50 animate-fade-in">
//           <NavBar />
//         </div>

//         {/* Page Content */}
//         <div className="p-6 overflow-y-auto animate-slide-up">
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 animate-fade-in">
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;

// // src/pages/admin/AdminLayout.js
// import React, { useState } from "react";
// import NavBar from "../../Components/admin/NavBar";
// import Sidebar from "../../Components/admin/SideBar"; // ensure the case matches the file

// function AdminLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen relative">
//       {/* Background image */}
//       <div
//         className="fixed inset-0 -z-10 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1617196038360-50f52841ff26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
//           filter: "brightness(0.35) blur(1.5px)",
//         }}
//       ></div>

//       {/* Optional overlay for extra dimming */}
//       <div className="fixed inset-0 -z-10 bg-black/30"></div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:relative`}
//       >
//         <Sidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
//         {/* Navbar */}
//         <div className="sticky top-0 z-50">
//           <NavBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
//         </div>

//         {/* Page content */}
//         <div className="flex-1 p-6 overflow-y-auto">{children}</div>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default AdminLayout;




// src/pages/admin/AdminLayout.js
import React, { useState } from "react";
import NavBar from "../../Components/admin/NavBar";
import Sidebar from "../../Components/admin/SideBar"; // ensure the case matches

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Full-page background image */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1617196038360-50f52841ff26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
          filter: "brightness(0.35) blur(1.5px)",
        }}
      ></div>

      {/* Optional overlay */}
      <div className="fixed inset-0 -z-10 bg-black/30"></div>

      {/* Sidebar - fully fixed */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="sticky top-0 z-50">
          <NavBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminLayout;
