import { useEffect } from "react";

const useDynamicHead = () => {
  useEffect(() => {
    const baseUrl =
      import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

    fetch(`${baseUrl}/api/seo/head`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.headScripts) {
          const temp = document.createElement("div");
          temp.innerHTML = data.data.headScripts;

          Array.from(temp.childNodes).forEach((node) => {
            // ✅ Handle SCRIPT separately (IMPORTANT)
            if (node.tagName === "SCRIPT") {
              const script = document.createElement("script");

              if (node.src) {
                script.src = node.src;
                script.async = true;
              } else {
                script.innerHTML = node.innerHTML;
              }

              document.head.appendChild(script);
            } else {
              document.head.appendChild(node);
            }
          });
        }
      })
      .catch((err) => console.log("SEO ERROR:", err));
  }, []);
};

export default useDynamicHead;
