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

  useEffect(() => {
    if (!html) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // ✅ 1. Inject META + TITLE into head
    const headTags = doc.head.children;
    Array.from(headTags).forEach((tag) => {
      document.head.appendChild(tag.cloneNode(true));
    });

    // ✅ 2. Inject SCRIPT manually (VERY IMPORTANT)
    const scripts = doc.querySelectorAll("script");

    scripts.forEach((script) => {
      const newScript = document.createElement("script");

      if (script.src) {
        newScript.src = script.src;
        newScript.async = true;
      } else {
        newScript.innerHTML = script.innerHTML;
      }

      document.head.appendChild(newScript);
    });
  }, [html]);

  return (
    <>
      {/* ✅ CSS */}
      <style>{css}</style>

      {/* ✅ Only render BODY content (header UI) */}
      <div
        dangerouslySetInnerHTML={{
          __html: html.replace(
            /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
            ""
          ),
        }}
      />
    </>
  );
};

export default Header;