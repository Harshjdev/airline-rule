import { blogs } from "../data/blogs";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">
          Latest Flight Blogs
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
