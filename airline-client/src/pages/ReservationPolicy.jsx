import { useEffect, useState } from "react";
import axios from "axios";

const ReservationPolicy = () => {
  const [page, setPage] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/pages/reserve-policy`);
      setPage(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getImage = (img) => {
    if (!img) return "";

    return img.startsWith("data:") ? img : `${baseUrl}${img}`;
  };

  if (!page) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      {/* Banner */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${getImage(page.bannerImage)})`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {page.title}
        </h1>
      </div>

      {/* Content */}
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </>
  );
};

export default ReservationPolicy;
