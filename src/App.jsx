import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import CancellationPolicy from "./pages/CancellationPolicy";
import FlightChange from "./pages/FlightChange";
import ReservationPolicy from "./pages/ReservationPolicy";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cancel-policy" element={<CancellationPolicy />} />
        <Route path="/flight-change" element={<FlightChange />} />
        <Route path="/reservation-policy" element={<ReservationPolicy />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
