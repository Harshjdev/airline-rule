import { useEffect } from "react";

const useDynamicHead = () => {
  useEffect(() => {
    fetch("/api/seo/head")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.headScripts) {
          const temp = document.createElement("div");
          temp.innerHTML = data.data.headScripts;

          Array.from(temp.children).forEach((el) => {
            if (!document.head.innerHTML.includes(el.outerHTML)) {
              document.head.appendChild(el);
            }
          });
        }
      });
  }, []);
};

export default useDynamicHead;
