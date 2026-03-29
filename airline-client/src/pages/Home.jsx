import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SLIDER ================= */
  useEffect(() => {
    if (!blogs.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [blogs]);

  /* ================= IMAGE HELPER ================= */
  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/400x250";
    return img.startsWith("data:") ? img : `${baseUrl}${img}`;
  };

  /* ================= FILTER ================= */
  const filterBlogs = (category) =>
    blogs.filter((blog) => blog.category === category);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* ================= EMPTY STATE ================= */}
      {blogs.length === 0 ? (
        <h1 className="text-center text-2xl font-bold text-gray-600 py-20">
          No data found. Please add data from Admin Dashboard 🚀
        </h1>
      ) : (
        <>
          {/* ================= TOP SECTION ================= */}
          <div className="flex flex-col lg:flex-row gap-6 mb-16">
            {/* LEFT - SLIDER */}
            <div className="lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={getImage(blogs[currentIndex]?.bannerImage)}
                alt={blogs[currentIndex]?.title}
                className="h-[350px] w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">
                  {blogs[currentIndex]?.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {blogs[currentIndex]?.description}
                </p>

                <Link
                  to={`/blog/${blogs[currentIndex]?.slug}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>

            {/* RIGHT - 4 BLOGS */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogs.slice(1, 5).map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blog/${blog.slug}`)} // ✅ correct
                >
                  <img
                    src={getImage(blog.bannerImage)}
                    alt={blog.title}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTIONS ================= */}
          <Section
            title="Name Change Policies"
            blogs={filterBlogs("name-change")}
            getImage={getImage}
          />

          <Section
            title="Cancellation Policies"
            blogs={filterBlogs("cancellation")}
            getImage={getImage}
          />

          <Section
            title="Refund Policies"
            blogs={filterBlogs("refund")}
            getImage={getImage}
          />
        </>
      )}
    </div>
  );
};

export default Home;

/* ================= SECTION COMPONENT ================= */

const Section = ({ title, blogs, getImage }) => {
  const navigate = useNavigate();
  if (!blogs.length) {
    return (
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4 border-l-4 border-blue-600 pl-4 text-left">
          {title}
        </h2>

        <h1 className="text-lg text-gray-500">
          No data available. Please add from Admin Dashboard.
        </h1>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            onClick={() => navigate(`/blog/${blog.slug}`)} // ✅ correct
          >
            <img
              src={getImage(blog.bannerImage)}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3">{blog.title}</h3>

              <Link
                to={`/blog/${blog.slug}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
