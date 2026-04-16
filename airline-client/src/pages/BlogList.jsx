import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";
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
  /* ================= IMAGE HELPER ================= */
  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/400x250";
    return img.startsWith("data:") ? img : `${baseUrl}${img}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">
          Latest Flight Blogs
        </h1>

        {loading ? (
          <div className="text-center text-lg font-medium">
            <Loader />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500">No blogs found</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
