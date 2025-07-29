import React from "react";
// Impor gambar yang akan digunakan (pastikan path-nya benar!)
import cornOverviewImage from "../assets/content.jpg";

const Home = () => {
  // Data untuk kartu penyakit
  const diseaseData = [
    {
      id: "blight",
      name: "Blight",
      description:
        "Penyakit Blight (Hawar Daun) disebabkan oleh jamur. Ciri-cirinya adalah lesi lonjong berwarna coklat keabu-abuan yang muncul di daun, seringkali dengan batas yang jelas.",
      icon: (
        // Ikon placeholder sederhana, bisa diganti dengan SVG/gambar lebih spesifik
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h4c0 1.5.5 3 2 3s2-1.5 2-3h4c-1 0-2-1-2-1l-1-3L11 9l-1 1-1 3.5L9.75 17z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4c0-1.104-.896-2-2-2S8 2.896 8 4s.896 2 2 2 2-.896 2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 12h-2.5m-1.5 0h-2.5m-1.5 0h-2.5"
          />
        </svg>
      ),
    },
    {
      id: "common_rust",
      name: "Common Rust",
      description:
        "Penyakit Karat Umum ditandai dengan pustula kecil berwarna oranye-coklat yang timbul, terutama pada permukaan atas daun. Dapat menyebar dengan cepat dalam kondisi lembab.",
      icon: (
        // Ikon placeholder sederhana
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-yellow-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5a.5.5 0 100-1 .5.5 0 000 1zm0-4a.5.5 0 100-1 .5.5 0 000 1zm0-4a.5.5 0 100-1 .5.5 0 000 1z"
          />
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
    },
    {
      id: "gray_leaf_spot",
      name: "Gray Leaf_Spot",
      description:
        "Gray Leaf Spot menyebabkan lesi panjang, sempit, berwarna abu-abu kehijauan pada daun. Lesi ini seringkali berbentuk persegi panjang dan dibatasi oleh urat daun.",
      icon: (
        // Ikon placeholder sederhana
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h4c0 1.5.5 3 2 3s2-1.5 2-3h4c-1 0-2-1-2-1l-1-3L11 9l-1 1-1 3.5L9.75 17z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4c0-1.104-.896-2-2-2S8 2.896 8 4s.896 2 2 2 2-.896 2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 12h-2.5m-1.5 0h-2.5m-1.5 0h-2.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Bagian Awal Halaman (dari kode sebelumnya) */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-300 to-blue-400 p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-8 drop-shadow-lg animate-fade-in-down">
          Deteksi Penyakit Daun Jagung🌽
        </h1>

        <p className="text-lg md:text-xl text-white text-center mb-12 max-w-2xl animate-fade-in-up">
          Identifikasi dini penyakit pada daun jagung Anda dengan mudah
          menggunakan teknologi AI. Dapatkan hasil prediksi akurat dalam
          hitungan detik.
        </p>

        <a
          href="/scan"
          className="relative px-10 py-4 bg-white text-green-700 font-bold text-xl rounded-full shadow-lg hover:bg-green-50 hover:scale-105 transition-all duration-300 ease-in-out transform overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine"></span>
          Mulai Deteksi Sekarang
          <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </a>
      </div>

      {/* Bagian Informasi & Tantangan Penyakit Jagung (Mirip Gambar Pertama) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Konten Kiri */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Penyakit Daun Jagung: Apa yang Perlu Anda Tahu?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Penyakit pada tanaman jagung dapat menyebabkan kerugian
                signifikan pada hasil panen. Memahami jenis-jenis penyakit dan
                dampaknya sangat penting untuk menjaga produktivitas lahan
                pertanian Anda.
              </p>

              {/* Kartu Statistik */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-100 p-6 rounded-lg shadow-sm text-center">
                  <p className="text-3xl font-bold text-green-700 mb-2">
                    3 Penyakit
                  </p>
                  <p className="text-sm text-gray-600">Paling Umum</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow-sm text-center">
                  <p className="text-3xl font-bold text-blue-700 mb-2">30%</p>
                  <p className="text-sm text-gray-600">
                    Penurunan Hasil Panen Potensial
                  </p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow-sm text-center">
                  <p className="text-3xl font-bold text-yellow-700 mb-2">
                    Deteksi Dini
                  </p>
                  <p className="text-sm text-gray-600">Kunci Pencegahan</p>
                </div>
              </div>

              <a
                href="#"
                className="text-green-600 font-semibold flex items-center group"
              >
                Pelajari Lebih Lanjut
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Gambar Kanan */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={cornOverviewImage}
                alt="Gambar Tinjauan Jagung"
                className="max-w-full h-auto rounded-lg shadow-xl"
                style={{ maxHeight: "450px" }} // Batasi tinggi gambar
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Jenis-Jenis Penyakit Jagung (Mirip Gambar Kedua) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            Jenis-Jenis Penyakit Jagung
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Kenali berbagai jenis penyakit umum yang menyerang daun jagung.
          </p>

          {/* Grid Kartu Penyakit */}
          <div
            style={{ fontFamily: "Arial, sans-serif" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {diseaseData.map((disease) => (
              <div key={disease.id} className="flip-card">
                <div className="flip-card-inner">
                  {/* Bagian Depan Kartu */}
                  <div className="flip-card-front bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-6 text-center">
                    {disease.icon}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {disease.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Ketuk/Hover untuk detail
                    </p>
                  </div>

                  {/* Bagian Belakang Kartu */}
                  <div className="flip-card-back bg-green-500 text-white shadow-md rounded-lg flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      {disease.name}
                    </h3>
                    <p className="text-sm leading-relaxed">
                      {disease.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;