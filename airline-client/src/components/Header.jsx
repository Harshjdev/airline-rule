import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");

  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  useEffect(() => {
    fetchLayout();
  }, []);

  const fetchLayout = async () => {
    const res = await axios.get(`${baseUrl}/api/layout`);
    setHTML(res.data.headerHTML || "");
    setCSS(res.data.headerCSS || "");
  };

  return (
    <>
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default Header;
