import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Qr from "../src/pages/Qr";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrcode/:code" element={<Qr />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
