import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <div className="text-center py-20">Blog Not Found</div>;
  }

  return (
    <>
      <Banner title={blog.title} image={blog.bannerImage} />

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="md:col-span-1">
            <Sidebar blog={blog} />
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-md">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogDetails;
