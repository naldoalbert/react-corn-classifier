import React, { useState, useRef } from "react";
import Camera from "./Camera"; // Asumsi komponen Camera menangani logika kamera

const Scan = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [useCamera, setUseCamera] = useState(false);
  const [diseaseDescription, setDiseaseDescription] = useState(""); // State baru untuk deskripsi penyakit

  const fileInputRef = useRef(null); // Ref untuk input file

  // Objek yang berisi deskripsi untuk setiap penyakit
  const diseaseInfo = {
    Blight: {
      name: "Blight (Hawar Daun)",
      description:
        "Penyakit Blight (Hawar Daun) disebabkan oleh jamur. Ciri-cirinya adalah lesi lonjong berwarna coklat keabu-abuan yang muncul di daun, seringkali dengan batas yang jelas.",
      color: "text-red-600", // Contoh warna untuk penyakit ini
    },
    Common_Rust: {
      name: "Common Rust (Karat Umum)",
      description:
        "Penyakit Karat Umum ditandai dengan pustula kecil berwarna oranye-coklat yang timbul, terutama pada permukaan atas daun. Dapat menyebar dengan cepat dalam kondisi lembab.",
      color: "text-yellow-600", // Contoh warna untuk penyakit ini
    },
    Gray_Leaf_Spot: {
      name: "Gray Leaf Spot",
      description:
        "Gray Leaf Spot menyebabkan lesi panjang, sempit, berwarna abu-abu kehijauan pada daun. Lesi ini seringkali berbentuk persegi panjang dan dibatasi oleh urat daun.",
      color: "text-gray-600", // Contoh warna untuk penyakit ini
    },
    Healthy: {
      // Tambahkan juga untuk kasus daun sehat
      name: "Sehat",
      description:
        "Daun jagung Anda terlihat sehat! Terus jaga kondisi tanaman Anda dengan baik.",
      color: "text-green-600",
    },
    Unknown: {
      // Untuk kasus prediksi tidak dikenal atau error
      name: "Tidak Dikenal",
      description:
        "Tidak dapat mengidentifikasi penyakit. Mohon coba lagi dengan gambar yang lebih jelas atau dari sudut yang berbeda.",
      color: "text-blue-600",
    },
  };

  /**
   * Mengatur deskripsi penyakit berdasarkan hasil prediksi.
   * @param {string} predictedDisease - Nama penyakit yang diprediksi.
   */
  const updateDiseaseDescription = (predictedDisease) => {
    const info = diseaseInfo[predictedDisease] || diseaseInfo["Unknown"];
    setDiseaseDescription(info);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setPrediction("Memproses..."); // Tampilkan "Memproses..." saat mengunggah
      setConfidence("");
      setDiseaseDescription(""); // Hapus deskripsi sebelumnya

      // Kirim gambar ke API
      const formData = new FormData();
      formData.append("image", file);

      fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          const predicted = data.prediction;
          setPrediction(predicted);
          setConfidence((data.confidence * 100).toFixed(2) + "%");
          updateDiseaseDescription(predicted); // Perbarui deskripsi berdasarkan prediksi
        })
        .catch((err) => {
          console.error("Error:", err);
          setPrediction("Error");
          setConfidence("");
          setDiseaseDescription(diseaseInfo["Unknown"]); // Tampilkan deskripsi error
        });
    }
  };

  const handleUnggahGambarClick = () => {
    setUseCamera(false);
    fileInputRef.current.click(); // Klik input file secara terprogram
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="mt-16 text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Scan Daun Jagung
      </h2>

      {/* Pilihan Unggah Gambar atau Gunakan Kamera */}
      {!useCamera && !imagePreview && (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {/* Unggah Gambar Card */}
          <div
            className="flex flex-col items-center justify-center w-64 h-48 bg-white rounded-lg shadow-md border-2 border-dashed border-green-400 cursor-pointer hover:border-green-600 hover:bg-green-100 transition-all duration-300"
            onClick={handleUnggahGambarClick}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden" // Sembunyikan input file default
              ref={fileInputRef}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-medium text-gray-700">
              Unggah Gambar
            </span>
          </div>

          {/* Gunakan Kamera Card */}
          <div
            className="flex flex-col items-center justify-center w-64 h-48 bg-white rounded-lg shadow-md border-2 border-dashed border-green-400 cursor-pointer hover:border-green-600 hover:bg-green-100 transition-all duration-300"
            onClick={() => setUseCamera(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-medium text-gray-700">
              Gunakan Kamera
            </span>
          </div>
        </div>
      )}

      {/* Tampilan Kamera */}
      {useCamera && (
        <Camera
          setImagePreview={setImagePreview}
          setPrediction={setPrediction}
          setConfidence={setConfidence}
          setUseCamera={setUseCamera}
          updateDiseaseDescription={updateDiseaseDescription} // Teruskan fungsi ini ke Camera
        />
      )}

      {/* Tampilan Pratinjau Gambar dan Hasil Prediksi */}
      {imagePreview && (
        <div className="mt-4 flex flex-col items-center w-full max-w-2xl">
          <img
            src={imagePreview}
            alt="Pratinjau"
            className="max-w-full h-auto rounded-lg shadow-lg border border-gray-300 mb-6"
          />

          {prediction && (
            <div className="w-full bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Hasil Deteksi
              </h3>
              <p className="text-xl font-bold mb-3">
                Penyakit:{" "}
                <span className={diseaseDescription.color || "text-green-600"}>
                  {diseaseDescription.name || prediction}
                </span>
              </p>
              <p className="text-base text-gray-600 mb-4">
                Akurasi: <span className="font-semibold">{confidence}</span>
              </p>

              {/* Deskripsi Penyakit */}
              {diseaseDescription.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 text-left">
                  <p className="text-md text-gray-700 leading-relaxed">
                    {diseaseDescription.description}
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
            onClick={() => {
              setImagePreview(null);
              setPrediction("");
              setConfidence("");
              setDiseaseDescription(""); // Reset deskripsi
              setUseCamera(false); // Reset ke kondisi awal
            }}
          >
            Scan Ulang
          </button>
        </div>
      )}
    </div>
  );
};

export default Scan;
