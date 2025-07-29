import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi internal
// Import gambar profil Anda (pastikan path-nya benar!)
import profilePicture from "../assets/profile2.jpg"; // Ganti dengan path gambar Anda

const Footer = () => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Scan", path: "/scan" },
    { name: "About", path: "/about" },
  ];

  return (
    // Footer utama dengan latar belakang abu-abu gelap dan padding
    <footer className="bg-slate-900 text-white py-10 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Bagian utama footer dengan 3 kolom di layar menengah ke atas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
          {/* Kolom 1: Logo dan Deskripsi */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <span className="text-3xl font-extrabold text-white tracking-wide">
                <Link to="/">MyCorn</Link>{" "}
                {/* Menggunakan Link untuk navigasi ke Home */}
              </span>
            </div>
            <p className="text-md text-gray-300 max-w-xs mb-4">
              Platform pendeteksi penyakit tanaman jagung yang efektif.
            </p>
            {/* Jika ada ikon media sosial atau lainnya, bisa ditambahkan di sini */}
            {/* Contoh placeholder untuk ikon (bisa diganti dengan SVG atau gambar) */}
            {/* <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">F</div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">T</div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">I</div>
            </div> */}
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name} className="flex items-center">
                  {/* Ikon panah seperti di gambar */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <Link
                    to={item.path}
                    className="text-gray-200 hover:text-green-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami / Informasi Pengembang */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Hubungi Kami
            </h3>
            {/* Foto Profil */}
            {/* Pastikan Anda memiliki gambar di path yang benar, misal: src/assets/profile_picture.jpg */}
            <img
              src={profilePicture} // Ganti dengan path gambar Anda
              alt="Naldo Albert Johan Gulo"
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-green-400 shadow-lg"
            />

            <div className="space-y-2 text-gray-200">
              {/* Menggunakan ikon email */}
              <p className="flex items-center justify-center md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v8a2 2 0 002 2h14a2 2 0 002-2v-8m-18 0h18"
                  />
                </svg>
                <a
                  href="mailto:naldoalbert1104@gmail.com"
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  naldoalbert1104@gmail.com
                </a>
              </p>
              {/* Informasi pribadi Anda */}
              <p className="text-sm text-gray-400 pt-4">
                Naldo Albert Johan Gulo
              </p>
              <p className="text-sm text-gray-400">NPM: 51422204</p>
              <p className="text-sm text-gray-400">Kelas: 3IA28</p>
            </div>
          </div>
        </div>

        {/* Bagian Bawah Footer: Hak Cipta dan Tautan Kebijakan */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-gray-500 text-sm">
          <p className="mb-2 md:mb-0">
            © {new Date().getFullYear()} MyCorn. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Kebijakan Privasi
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Syarat & Layanan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
