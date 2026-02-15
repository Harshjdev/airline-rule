import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={blog.bannerImage}
        alt={blog.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {blog.title}
        </h2>

        <p className="text-gray-600 mb-4">
          {blog.description}
        </p>

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
