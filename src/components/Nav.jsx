// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";
// import { CiMenuFries } from "react-icons/ci";

// const Nav = () => {
//   const [click, setClick] = useState(false);
//   const handleClick = () => setClick(!click);

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Scan", path: "/scan" },
//     { name: "About", path: "/about" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-slate-0 shadow-md">
//       <div className="h-10vh flex justify-between items-center z-10 text-white lg:py-5 px-6 py-4 relative">
//         <div className="flex items-center">
//           <span className="text-3xl font-bold">
//             <a href="/">My Corn</a>
//           </span>
//         </div>

//         {/* Desktop Menu */}
//         <div className="lg:flex md:flex flex-1 items-center justify-center font-normal hidden">
//           <ul className="flex gap-8 mr-16 text-[18px]">
//             {menuItems.map((item) => (
//               <li
//                 key={item.name}
//                 className="hover:text-fuchsia-600 transition hover:border-b-2 hover:border-fuchsia-600 cursor-pointer"
//               >
//                 <Link to={item.path}>{item.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Mobile Toggle Button */}
//         <button className="block lg:hidden text-2xl z-20" onClick={handleClick}>
//           {click ? <FaTimes /> : <CiMenuFries />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {click && (
//         <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition opacity-50 z-10">
//           <ul className="text-center text-xl p-10">
//             {menuItems.map((item) => (
//               <li
//                 key={item.name}
//                 className="my-4 py-4 border-b border-slate-800 text-slate-400 hover:bg-slate-800 hover:rounded cursor-pointer"
//               >
//                 <Link to={item.path} onClick={() => setClick(false)}>
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Ikon close untuk menu mobile
import { CiMenuFries } from "react-icons/ci"; // Ikon hamburger untuk menu mobile

const Nav = () => {
  // State untuk mengontrol visibilitas menu mobile
  const [click, setClick] = useState(false);

  // Fungsi untuk mengalihkan state 'click'
  const handleClick = () => setClick(!click);

  // Daftar item menu navigasi
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Scan", path: "/scan" },
    { name: "About", path: "/about" },
  ];

  return (
    // Navigasi utama: fixed di atas, lebar penuh, z-index tinggi.
    // Latar belakang transparan di desktop, shadow-lg untuk efek bayangan.
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-green-400 to-blue-300 shadow-lg">
      <div className="container mx-auto h-16 flex justify-between items-center px-4 md:px-6">
        {/* Logo/Nama Aplikasi */}
        <div className="flex items-center">
          <span className="text-3xl font-extrabold text-white tracking-wide">
            <Link to="/">MyCorn</Link> {/* Menggunakan Link untuk navigasi */}
          </span>
        </div>

        {/* Menu Desktop (Hidden on small screens) */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <ul className="flex gap-8 text-lg font-light">
            {menuItems.map((item) => (
              <li
                key={item.name}
                // Teks putih untuk kontras dengan latar belakang transparan
                className="relative text-white hover:text-green-300 transition-colors duration-300 group"
              >
                <Link to={item.path} className="py-2 px-1">
                  {item.name}
                </Link>
                {/* Garis bawah animasi saat hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tombol Toggle Menu Mobile (Hidden on large screens) */}
        {/* Ikon berwarna putih agar terlihat di atas latar belakang transparan */}
        <button
          className="block md:hidden text-3xl text-white z-20"
          onClick={handleClick}
        >
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>

      {/* Menu Mobile (Animated slide-down) */}
      <div
        className={`
          md:hidden absolute top-16 left-0 w-full bg-gradient-to-br from-green-300 to-blue-400 transition-transform duration-300 ease-in-out
          ${
            click
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-full opacity-0 pointer-events-none"
          }
          shadow-lg // Menambahkan bayangan untuk menu mobile
        `}
      >
        <ul className="text-center text-xl py-6 max-w-md m-auto">
          {menuItems.map((item) => (
            <li
              key={item.name}
              // Teks abu-abu gelap agar terlihat di atas latar belakang putih
              className="my-3 py-3 border-b border-gray-300 text-gray-100 hover:bg-gray-200/40 transition-colors duration-300 cursor-pointer"
            >
              <Link
                to={item.path}
                onClick={() => setClick(false)}
                className="block w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
