import { useState, useEffect } from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === blogs.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Helper filter function
  const filterBlogs = (keyword) =>
    blogs.filter((blog) =>
      blog.slug.toLowerCase().includes(keyword)
    );

  return (
    <div className="container mx-auto px-4 py-10">

      {/* ================= TOP SECTION ================= */}
      <div className="flex flex-col lg:flex-row gap-6 mb-16">

        {/* LEFT - SLIDER */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={blogs[currentIndex].bannerImage}
            alt={blogs[currentIndex].title}
            className="h-[350px] w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">
              {blogs[currentIndex].title}
            </h2>

            <p className="text-gray-600 mb-4">
              {blogs[currentIndex].description}
            </p>

            <Link
              to={`/blog/${blogs[currentIndex].slug}`}
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
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.bannerImage}
                alt={blog.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {blog.title}
                </h3>

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

      {/* ================= NAME CHANGE SECTION ================= */}
      <Section
        title="Name Change Policies"
        blogs={filterBlogs("name")}
      />

      {/* ================= CANCELLATION SECTION ================= */}
      <Section
        title="Cancellation Policies"
        blogs={filterBlogs("cancellation")}
      />

      {/* ================= REFUND SECTION ================= */}
      <Section
        title="Refund Policies"
        blogs={filterBlogs("refund")}
      />

    </div>
  );
};

export default Home;


/* ================= REUSABLE SECTION COMPONENT ================= */

const Section = ({ title, blogs }) => {
  if (!blogs.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={blog.bannerImage}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3">
                {blog.title}
              </h3>

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