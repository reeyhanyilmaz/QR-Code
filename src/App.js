import "./App.css";
import React, { useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import { nanoid } from "nanoid";
import axios from "axios";

function App() {
  const { Image } = useQRCode();
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = nanoid();
    console.log("code", code);

    const { data } = await axios.post("https://marineadvisor.xyz/qrcodes", {
      code: code,
    });

    console.log("data", data);

    // if(data.success){

    // }

    // const res2 = await fetch(
    //   `https://63a209a0ba35b96522eecbec.mockapi.io/qrcodes/${data.id}`
    // );

    // const data2 = await res2.json();
    // console.log("data2 :>> ", data2);

    const qrLink = `https://63a209a0ba35b96522eecbec.mockapi.io/qrcodes/${data.id}`;

    setLoading(false);
    setText(qrLink);
  };

  useEffect(() => {
    if (text) {
      const image = document.querySelector(".qrCode img");
      setImageSrc(image.src);
      console.log("image :>> ", image.src);
    }
  }, [text]);

  return (
    <div className="App">
      <div className="header">Hype QR Code</div>

      <div className="qrContainer">
        <p>Butona her tıklandığında yeni bir qr code oluşmaktadır.</p>
        {/* <input placeholder="E-mail Giriniz" /> */}
        {/* {loading && <div className="loading">loading...</div>} */}

        {loading && <div className="loading">loading...</div>}
        <button onClick={handleGenerate}>Qr Code Oluştur</button>

        <div className="qrCode">
          {/* <QRCode value="fdfds" /> */}
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
      <div className="footer">Hype 2022</div>
    </div>
  );
}

export default App;
