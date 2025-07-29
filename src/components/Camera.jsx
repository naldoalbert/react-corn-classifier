// import React, { useRef, useState, useEffect } from "react";

// /**
//  * Komponen Camera memungkinkan pengguna untuk mengakses kamera perangkat,
//  * mengambil foto, dan mengirimkannya untuk prediksi.
//  *
//  * @param {object} props - Properti yang diteruskan ke komponen.
//  * @param {function} props.setImagePreview - Fungsi untuk mengatur URL pratinjau gambar di komponen induk.
//  * @param {function} props.setPrediction - Fungsi untuk mengatur hasil prediksi di komponen induk.
//  * @param {function} props.setConfidence - Fungsi untuk mengatur tingkat kepercayaan prediksi di komponen induk.
//  * @param {function} props.setUseCamera - Fungsi untuk mengalihkan kembali ke tampilan unggah gambar di komponen induk.
//  */
// const Camera = ({
//   setImagePreview,
//   setPrediction,
//   setConfidence,
//   setUseCamera,
// }) => {
//   // Referensi untuk elemen video yang menampilkan feed kamera
//   const videoRef = useRef(null);
//   // Referensi untuk stream media dari kamera
//   const streamRef = useRef(null);

//   // State untuk melacak apakah kamera aktif
//   const [cameraOn, setCameraOn] = useState(false);
//   // State untuk melacak mode kamera (depan "user" atau belakang "environment")
//   const [facingMode, setFacingMode] = useState("environment");
//   // State untuk menyimpan pesan kesalahan (misalnya, jika akses kamera ditolak)
//   const [errorMessage, setErrorMessage] = useState("");

//   /**
//    * Memulai stream kamera.
//    * Mengakses media perangkat dan menampilkan feed di elemen video.
//    */
//   const startCamera = async () => {
//     setErrorMessage(""); // Hapus pesan kesalahan sebelumnya
//     try {
//       // Meminta akses ke perangkat video dengan mode kamera yang ditentukan
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: facingMode,
//           width: { ideal: 1280 }, // Meminta resolusi ideal untuk kualitas yang lebih baik
//           height: { ideal: 720 },
//         },
//         audio: false, // Tidak memerlukan audio
//       });

//       // Menetapkan stream ke elemen video
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         // Memastikan video diputar setelah metadata dimuat
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current.play();
//         };
//       }

//       streamRef.current = stream; // Simpan referensi stream
//       setCameraOn(true); // Atur kamera menjadi aktif
//     } catch (err) {
//       console.error("Gagal mengakses kamera:", err);
//       setErrorMessage("Gagal mengakses kamera. Pastikan Anda memberikan izin.");
//       setCameraOn(false); // Atur kamera menjadi tidak aktif jika ada kesalahan
//     }
//   };

//   /**
//    * Menghentikan stream kamera.
//    * Menghentikan semua trek media yang aktif.
//    */
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//       setCameraOn(false); // Atur kamera menjadi tidak aktif
//     }
//   };

//   // Efek samping untuk memulai kamera saat komponen dimuat atau mode kamera berubah
//   useEffect(() => {
//     startCamera(); // Mulai kamera
//     // Fungsi cleanup untuk menghentikan kamera saat komponen dilepas
//     return () => {
//       stopCamera();
//     };
//   }, [facingMode]); // Bergantung pada facingMode, kamera akan dimulai ulang jika mode berubah

//   /**
//    * Mengambil gambar dari feed kamera, menampilkannya sebagai pratinjau,
//    * dan mengirimkannya ke API untuk prediksi.
//    */
//   const captureAndPredict = async () => {
//     if (!videoRef.current || !cameraOn) {
//       setErrorMessage("Kamera tidak aktif.");
//       return;
//     }

//     // Buat elemen kanvas untuk menggambar frame video
//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     // Dapatkan URL data gambar untuk pratinjau di komponen induk
//     const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
//     setImagePreview(imageDataUrl); // Perbarui pratinjau gambar di komponen induk

//     // Hentikan kamera setelah mengambil gambar
//     stopCamera();
//     // Atur useCamera ke false untuk menampilkan pratinjau di komponen induk (Scan)
//     setUseCamera(false);

//     // Konversi kanvas ke Blob untuk pengiriman API
//     canvas.toBlob(async (blob) => {
//       if (!blob) {
//         console.error("Gagal membuat blob dari gambar.");
//         setPrediction("Gagal memproses gambar.");
//         setConfidence("");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("image", blob, "captured_image.jpg");

//       // Reset prediksi dan kepercayaan sebelum panggilan API baru
//       setPrediction("Memproses...");
//       setConfidence("");

//       try {
//         const response = await fetch("http://localhost:5000/predict", {
//           method: "POST",
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         setPrediction(result.prediction); // Perbarui hasil prediksi di komponen induk
//         setConfidence((result.confidence * 100).toFixed(2) + "%"); // Perbarui kepercayaan di komponen induk
//       } catch (err) {
//         console.error("Gagal mengirim gambar ke API:", err);
//         setPrediction("Gagal mendeteksi gambar");
//         setConfidence("");
//       }
//     }, "image/jpeg");
//   };

//   /**
//    * Mengalihkan mode kamera antara depan ("user") dan belakang ("environment").
//    */
//   const toggleFacingMode = () => {
//     stopCamera(); // Hentikan stream saat ini
//     setFacingMode((prev) => (prev === "user" ? "environment" : "user")); // Alihkan mode
//     // Efek samping useEffect akan memulai ulang kamera dengan facingMode yang baru
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg w-full max-w-xl">
//       <h3 className="text-xl font-semibold mb-4 text-gray-800">Ambil Gambar</h3>

//       {/* Menampilkan pesan kesalahan jika ada */}
//       {errorMessage && (
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full"
//           role="alert"
//         >
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {errorMessage}</span>
//         </div>
//       )}

//       {/* Kontainer video kamera */}
//       <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="w-full h-full object-cover rounded-lg"
//           style={{ display: cameraOn ? "block" : "none" }}
//         />
//         {/* Pesan saat kamera sedang memuat atau tidak aktif */}
//         {!cameraOn && !errorMessage && (
//           <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
//             Memuat kamera...
//           </div>
//         )}
//       </div>

//       {/* Tombol-tombol kontrol kamera */}
//       <div className="flex flex-wrap justify-center gap-4 mt-6">
//         {cameraOn && (
//           <>
//             <button
//               onClick={captureAndPredict}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               Ambil Foto
//             </button>

//             <button
//               onClick={toggleFacingMode}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 14c0 1.577-.45 3.078-1.233 4.382M4 10V5a2 2 0 012-2h2.5M4 10h16M4 10l-1.356 2.034M20 10v5a2 2 0 002 2h-2.5M20 10l1.356 2.034M8 16H6a2 2 0 01-2-2v-2.5m12 0h2a2 2 0 012 2v2.5M12 18h.01M12 21h.01"
//                 />
//               </svg>
//               {facingMode === "user"
//                 ? "Ganti ke Kamera Belakang"
//                 : "Ganti ke Kamera Depan"}
//             </button>
//           </>
//         )}
//         {/* Tombol "Buka Kamera" hanya muncul jika kamera tidak aktif dan tidak ada error */}
//         {!cameraOn && !errorMessage && (
//           <button
//             onClick={startCamera}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 10h-1a1 1 0 00-1 1v3a1 1 0 001 1h1M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
//               />
//             </svg>
//             Buka Kamera
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Camera;



import React, { useRef, useState, useEffect } from "react";

/**
 * Komponen Camera memungkinkan pengguna untuk mengakses kamera perangkat,
 * mengambil foto, dan mengirimkannya untuk prediksi.
 *
 * @param {object} props - Properti yang diteruskan ke komponen.
 * @param {function} props.setImagePreview - Fungsi untuk mengatur URL pratinjau gambar di komponen induk.
 * @param {function} props.setPrediction - Fungsi untuk mengatur hasil prediksi di komponen induk.
 * @param {function} props.setConfidence - Fungsi untuk mengatur tingkat kepercayaan prediksi di komponen induk.
 * @param {function} props.setUseCamera - Fungsi untuk mengalihkan kembali ke tampilan unggah gambar di komponen induk.
 * @param {function} props.updateDiseaseDescription - Fungsi untuk memperbarui deskripsi penyakit di komponen induk. // BARU: Prop baru
 */
const Camera = ({
  setImagePreview,
  setPrediction,
  setConfidence,
  setUseCamera,
  updateDiseaseDescription, // BARU: Menerima prop ini
}) => {
  // Referensi untuk elemen video yang menampilkan feed kamera
  const videoRef = useRef(null);
  // Referensi untuk stream media dari kamera
  const streamRef = useRef(null);

  // State untuk melacak apakah kamera aktif
  const [cameraOn, setCameraOn] = useState(false);
  // State untuk melacak mode kamera (depan "user" atau belakang "environment")
  const [facingMode, setFacingMode] = useState("environment");
  // State untuk menyimpan pesan kesalahan (misalnya, jika akses kamera ditolak)
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Memulai stream kamera.
   * Mengakses media perangkat dan menampilkan feed di elemen video.
   */
  const startCamera = async () => {
    setErrorMessage(""); // Hapus pesan kesalahan sebelumnya
    try {
      // Meminta akses ke perangkat video dengan mode kamera yang ditentukan
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 }, // Meminta resolusi ideal untuk kualitas yang lebih baik
          height: { ideal: 720 },
        },
        audio: false, // Tidak memerlukan audio
      });

      // Menetapkan stream ke elemen video
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Memastikan video diputar setelah metadata dimuat
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }

      streamRef.current = stream; // Simpan referensi stream
      setCameraOn(true); // Atur kamera menjadi aktif
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
      setErrorMessage("Gagal mengakses kamera. Pastikan Anda memberikan izin.");
      setCameraOn(false); // Atur kamera menjadi tidak aktif jika ada kesalahan
    }
  };

  /**
   * Menghentikan stream kamera.
   * Menghentikan semua trek media yang aktif.
   */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setCameraOn(false); // Atur kamera menjadi tidak aktif
    }
  };

  // Efek samping untuk memulai kamera saat komponen dimuat atau mode kamera berubah
  useEffect(() => {
    startCamera(); // Mulai kamera
    // Fungsi cleanup untuk menghentikan kamera saat komponen dilepas
    return () => {
      stopCamera();
    };
  }, [facingMode]); // Bergantung pada facingMode, kamera akan dimulai ulang jika mode berubah

  /**
   * Mengambil gambar dari feed kamera, menampilkannya sebagai pratinjau,
   * dan mengirimkannya ke API untuk prediksi.
   */
  const captureAndPredict = async () => {
    if (!videoRef.current || !cameraOn) {
      setErrorMessage("Kamera tidak aktif.");
      return;
    }

    // Buat elemen kanvas untuk menggambar frame video
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Dapatkan URL data gambar untuk pratinjau di komponen induk
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setImagePreview(imageDataUrl); // Perbarui pratinjau gambar di komponen induk

    // Hentikan kamera setelah mengambil gambar
    stopCamera();
    // Atur useCamera ke false untuk menampilkan pratinjau di komponen induk (Scan)
    setUseCamera(false);

    // Konversi kanvas ke Blob untuk pengiriman API
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Gagal membuat blob dari gambar.");
        setPrediction("Gagal memproses gambar.");
        setConfidence("");
        updateDiseaseDescription("Unknown"); // BARU: Perbarui deskripsi error
        return;
      }

      const formData = new FormData();
      formData.append("image", blob, "captured_image.jpg");

      // Reset prediksi dan kepercayaan sebelum panggilan API baru
      setPrediction("Memproses...");
      setConfidence("");
      updateDiseaseDescription(""); // BARU: Hapus deskripsi sebelumnya

      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const predicted = result.prediction; // Ambil hasil prediksi
        setPrediction(predicted); // Perbarui hasil prediksi di komponen induk
        setConfidence((result.confidence * 100).toFixed(2) + "%"); // Perbarui kepercayaan di komponen induk
        updateDiseaseDescription(predicted); // BARU: Panggil fungsi untuk memperbarui deskripsi
      } catch (err) {
        console.error("Gagal mengirim gambar ke API:", err);
        setPrediction("Gagal mendeteksi gambar");
        setConfidence("");
        updateDiseaseDescription("Unknown"); // BARU: Perbarui deskripsi error
      }
    }, "image/jpeg");
  };

  /**
   * Mengalihkan mode kamera antara depan ("user") dan belakang ("environment").
   */
  const toggleFacingMode = () => {
    stopCamera(); // Hentikan stream saat ini
    setFacingMode((prev) => (prev === "user" ? "environment" : "user")); // Alihkan mode
    // Efek samping useEffect akan memulai ulang kamera dengan facingMode yang baru
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg w-full max-w-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Ambil Gambar</h3>

      {/* Menampilkan pesan kesalahan jika ada */}
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}

      {/* Kontainer video kamera */}
      <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-lg"
          style={{ display: cameraOn ? "block" : "none" }}
        />
        {/* Pesan saat kamera sedang memuat atau tidak aktif */}
        {!cameraOn && !errorMessage && (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
            Memuat kamera...
          </div>
        )}
      </div>

      {/* Tombol-tombol kontrol kamera */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {cameraOn && (
          <>
            <button
              onClick={captureAndPredict}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
            >
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Ambil Foto
            </button>

            <button
              onClick={toggleFacingMode}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
            >
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 14c0 1.577-.45 3.078-1.233 4.382M4 10V5a2 2 0 012-2h2.5M4 10h16M4 10l-1.356 2.034M20 10v5a2 2 0 002 2h-2.5M20 10l1.356 2.034M8 16H6a2 2 0 01-2-2v-2.5m12 0h2a2 2 0 012 2v2.5M12 18h.01M12 21h.01"
                />
              </svg>
              {facingMode === "user"
                ? "Ganti ke Kamera Belakang"
                : "Ganti ke Kamera Depan"}
            </button>
          </>
        )}
        {/* Tombol "Buka Kamera" hanya muncul jika kamera tidak aktif dan tidak ada error */}
        {!cameraOn && !errorMessage && (
          <button
            onClick={startCamera}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          >
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 10h-1a1 1 0 00-1 1v3a1 1 0 001 1h1M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
              />
            </svg>
            Buka Kamera
          </button>
        )}
      </div>
    </div>
  );
};

export default Camera;
