import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // ✅ Handle image properly
  const imageUrl = blog.bannerImage
    ? blog.bannerImage.startsWith("data:") // base64
      ? blog.bannerImage
      : `https://airline-rule.onrender.com${blog.bannerImage}` // multer image
    : "https://via.placeholder.com/400x250?text=No+Image";

  const navtoBlog = () => {
    navigate(`/blog/${blog.slug}`);
    console.log("blog card clicked");
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
      onClick={navtoBlog}
    >
      <img
        src={imageUrl}
        alt={blog.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {blog.title}
        </h2>

        <p className="text-gray-600 mb-4">{blog.description}</p>

        <Link
          to={`/blog/${blog.slug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
