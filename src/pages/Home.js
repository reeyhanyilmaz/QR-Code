import "../App.css";
import React, { useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import { nanoid } from "nanoid";
import axios from "axios";

function Home() {
  const { Image } = useQRCode();
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [inputVal, setInputVal] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleLogin = () => {
    if (inputVal === "qrHype2022") {
      setShowButton(true);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = nanoid();
    console.log("code", code);

    const { data } = await axios.post("https://marineadvisor.xyz/qrcodes", {
      code: code,
    });

    console.log("data", data);

    if (data.success) {
      const url = `http://localhost:3000/qrcode/${code}`;
      setText(url);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (text) {
      const image = document.querySelector(".qrCode img");
      setImageSrc(image.src);
      console.log("image", image.src);
    }
  }, [text]);

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
        {error && <div className="loading">Bir hata oluştu.</div>}

        {showButton ? (
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
        <div className="qrCode">
          {text ? (
            <Image
              text={text}
              options={{
                type: "image/jpeg",
                quality: 0.9,
                level: "M",
                scale: 50,
                width: 350,
                color: {
                  dark: "#000",
                  light: "#fff",
                },
              }}
            />
          ) : null}
        </div>
        {imageSrc && (
          <a
            href={imageSrc}
            download="HypeQrCode.jpeg"
            className="downloadButton"
          >
            İndir
          </a>
        )}
      </div>
    </div>
  );
}

export default Home;
