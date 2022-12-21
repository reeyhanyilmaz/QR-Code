import "../App.css";
import React, { useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { nanoid } from "nanoid";
import axios from "axios";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "https://cro.hype.com.tr/image-api/b2uzjd9KprH4YakyiAnWf4a01c217be626de074d0a2b544cc24d.png",
  dotsOptions: {
    color: "#230a4a",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 5,
  },
});

function Home() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [showQrButton, setShowQrButton] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  
  const handleLogin = async () => {
    const { data } = await axios.get(
      `https://marineadvisor.xyz/admin/${inputVal}`
    );
    
    if (data.success === true) {
      setShowQrButton(true);
      setError("");
    } else {
      setError("Hatalı Parola!");
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = nanoid();

    const { data } = await axios.post("https://marineadvisor.xyz/qrcodes", {
      code: code,
    });

    if (data.success) {
      const url = `https://hypeinvitation.netlify.app/qrcode/${code}`;
      qrCode.append(ref.current);
      qrCode.update({
        data: url,
      });
      setShowDownload(true)
    } else {
      setError("Bir hata oluştu");
    }
    setLoading(false);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
    });
  };


  return (
    <div className="App">
      <div className="qrContainer">
        <h1>Hype QR Kod Oluşturucu</h1>
        <p>Butona her tıklandığında yeni bir QR kod oluşmaktadır</p>
        <ul>
          <li>QR Kodlar tek kullanımlıktır</li>
          <li>
            İlk kez okutulduğunda oluşan linke tıklandığında "Davetli" mesajı
            görünür
          </li>
          <li>
            Kod ikinci kez okutulduğunda veya sistemde olmayan bir kod
            okutulduğunda "Kayıt bulunamadı" mesajı görünür
          </li>
        </ul>

        {loading && <div className="loading">loading...</div>}
        {error && <div className="loading">{error}</div>}

        {showQrButton ? (
          <button onClick={handleGenerate}>Qr Code Oluştur</button>
        ) : (
          <>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Admin Parolası"
            />
            <button onClick={handleLogin}>Giriş Yap</button>
          </>
        )}
        <div className="qrCode"><div ref={ref} /></div>
        {showQrButton && showDownload && (
          <button className="downloadButton" onClick={onDownloadClick}>
            İndir
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;

