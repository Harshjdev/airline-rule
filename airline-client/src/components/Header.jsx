import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState("");
  const [phone, setPhone] = useState("");

  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  useEffect(() => {
    fetchSettings();
  }, []);

  const navtoHome = () => {
    navigate("/");
  };

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/settings`);
      setLogo(res.data.logo);
      setPhone(res.data.phone);
    } catch (err) {
      console.error(err);
    }
  };

  const logoUrl = logo
    ? logo.startsWith("data:")
      ? logo
      : `${baseUrl}${logo}`
    : null;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <div className="text-2xl font-bold text-blue-700" onClick={navtoHome}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-10" />
          ) : (
            "Usa Flight Services"
          )}
        </div>

        {/* NAV */}
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/cancel-policy">Cancellation Policy</Link>
          <Link to="/flight-change">Flight Change</Link>
          <Link to="/reservation-policy">Reservation Policy</Link>
          <Link to="/blog">Blog</Link>

          {/* ✅ DYNAMIC PHONE */}
          {phone && (
            <button className="bg-blue-600 p-2 rounded text-white">
              {phone}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
