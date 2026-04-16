import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import bannerimage from "../assets/Copilot.png";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/blogs/${slug}`);

      setBlog(res.data.blog);
      setRecommended(res.data.recommended || []);
    } catch (err) {
      console.error(err);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!blog) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000); // redirect after 2 sec

      return () => clearTimeout(timer);
    }
  }, [blog, navigate]);

  /* ================= IMAGE HELPER ================= */
  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/300";

    return img.startsWith("data:") ? img : `${baseUrl}${img}`;
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return <NotFound />;
  }

  return (
    <>
      {/* Banner */}
      <Banner title={blog.title} image={bannerimage} />

      <div className="bg-gray-50 py-12">
        <div
          className="max-w-7xl mx-auto px-6 
                    
                     gap-8"
        >
          {/* LEFT - SIDEBAR */}
          <div className="h-fit my-5 top-24">
            <Sidebar blog={blog} />
          </div>

          {/* CENTER - BLOG CONTENT */}
          <div className="bg-white p-8 rounded-xl shadow-md overflow-hidden">
            {/* Description */}
            {blog.description && (
              <p className="text-gray-600 mb-6 text-lg">{blog.description}</p>
            )}

            {/* Content */}
            <div
              className="prose max-w-none break-words"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* RIGHT - RECOMMENDED BLOGS */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-blue-700 mb-6">
              Recommended Blogs
            </h3>

            <div className="space-y-5">
              {recommended.map((item) => (
                <Link
                  key={item._id}
                  to={`/blog/${item.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={getImage(item.bannerImage)}
                      alt={item.title}
                      className="w-20 h-16 object-cover rounded-md"
                    />
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
