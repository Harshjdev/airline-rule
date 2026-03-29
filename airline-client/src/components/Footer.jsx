import { useState,useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");

  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  useEffect(() => {
    fetchLayout();
  }, []);

  const fetchLayout = async () => {
    const res = await axios.get(`${baseUrl}/api/layout`);
    setHTML(res.data.footerHTML || "");
    setCSS(res.data.footerCSS || "");
  };

  return (
    <>
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default Footer;
