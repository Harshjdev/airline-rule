import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import bannerimage from "../assets/Copilot.png";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Blog Not Found
      </div>
    );
  }

  // Exclude current blog from recommended
  const recommended = blogs
    .filter((b) => b.slug !== slug)
    .slice(0, 5);

  return (
    <>
      {/* Banner */}
      <Banner title={blog.title} image={bannerimage} />

      <div className="bg-gray-50 py-12">
        <div
          className="max-w-7xl mx-auto px-6 
                     grid grid-cols-1 
                     lg:grid-cols-[20%_60%_20%] 
                     gap-8"
        >
          {/* LEFT - QUICK LINKS (20%) */}
          <div className="h-fit sticky top-24">
            <Sidebar blog={blog} />
          </div>

          {/* CENTER - BLOG CONTENT (60%) */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* RIGHT - RECOMMENDED BLOGS (20%) */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-blue-700 mb-6">
              Recommended Blogs
            </h3>

            <div className="space-y-5">
              {recommended.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={item.bannerImage}
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