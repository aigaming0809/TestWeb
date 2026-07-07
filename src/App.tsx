import { BrowserRouter, Routes, Route } from "react-router-dom";
import CyberBackground from "./components/CyberBackground";
import CursorTrail from "./components/CursorTrail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <CyberBackground />
        <CursorTrail />
        <div className="noise-overlay" />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <HomePage />
                </>
              }
            />
            <Route path="/cards" element={<CardsPage />} />
          </Routes>
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
