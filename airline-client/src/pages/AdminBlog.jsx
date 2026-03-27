import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [phone, setPhone] = useState("");
  const [pageForm, setPageForm] = useState({
    title: "",
    slug: "",
    content: "",
  });

  const [pageImage, setPageImage] = useState(null);
  const [quickLinks, setQuickLinks] = useState([""]);
  const [editId, setEditId] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const baseUrl =
    import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  const inputStyle =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const buttonPrimary =
    "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (e) =>
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("quickLinks", JSON.stringify(quickLinks));

      if (image) formData.append("bannerImage", image);

      if (editId) {
        // ✅ UPDATE
        await axios.put(`${baseUrl}/api/blogs/${editId}`, formData);
        alert("Blog Updated ✅");
      } else {
        // ✅ CREATE
        await axios.post(`${baseUrl}/api/blogs`, formData);
        alert("Blog Created 🚀");
      }

      // Reset form
      setForm({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
      });
      setQuickLinks([""]);
      setImage(null);
      setEditId(null);
    } catch (err) {
      alert("Error saving blog");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${baseUrl}/api/blogs/${id}`);
      alert("Blog Deleted ❌");

      // optional: refresh list
      fetchBlogs();
    } catch (err) {
      alert("Error deleting blog");
    }
  };
  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      description: blog.description || "",
      content: blog.content || "",
      category: blog.category || "",
    });

    setQuickLinks(
      blog.quickLinks && blog.quickLinks.length > 0 ? blog.quickLinks : [""],
    );

    setEditId(blog._id);

    // ✅ Reset image input but show preview separately
    setImage(null);

    // ✅ Scroll to form (better UX)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(pageForm).forEach((key) =>
        formData.append(key, pageForm[key]),
      );

      if (pageImage) formData.append("bannerImage", pageImage);

      await axios.post(`${baseUrl}/api/pages`, formData);

      alert("Page Saved Successfully 🚀");

      setPageForm({ title: "", slug: "", content: "" });
      setPageImage(null);
    } catch (err) {
      alert("Error saving page");
    }
  };

  const handleLogoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", logo);
    await axios.post(`${baseUrl}/api/settings/logo`, formData);
    alert("Logo Updated ✅");
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/api/settings/phone`, { phone });
    alert("Phone Updated ✅");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* ================= BLOG ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">All Blogs</h2>

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border p-4 rounded-lg mb-3 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-500">{blog.slug}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setForm({
                        title: "",
                        slug: "",
                        description: "",
                        content: "",
                        category: "",
                        bannerImage: "",
                      });
                      setQuickLinks([""]);
                      setImage(null);
                    }}
                    className="bg-orange-400 text-white px-4 rounded-lg "
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-6">
            {editId ? "Edit Blog ✏️" : "Create Blog"}
          </h2>

          <form
            key={editId || "create"}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <input
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <textarea
              name="description"
              placeholder="Short Description"
              value={form.description}
              onChange={handleChange}
              className={inputStyle}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">Select Category</option>
              <option value="cancellation">Cancellation</option>
              <option value="name-change">Name Change</option>
              <option value="refund">Refund</option>
            </select>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
            {editId &&
              !image &&
              blogs.find((b) => b._id === editId)?.bannerImage && (
                <img
                  src={`${baseUrl}${blogs.find((b) => b._id === editId).bannerImage}`}
                  className="h-32 mt-2 rounded"
                />
              )}

            <ReactQuill
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
              modules={modules}
              className="bg-white"
            />

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>

              {quickLinks.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={link}
                    onChange={(e) => {
                      const updated = [...quickLinks];
                      updated[index] = e.target.value;
                      setQuickLinks(updated);
                    }}
                    className={inputStyle}
                    placeholder={`Link ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setQuickLinks(quickLinks.filter((_, i) => i !== index))
                    }
                    className="bg-red-500 text-white px-3 rounded-lg"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setQuickLinks([...quickLinks, ""])}
                className="bg-gray-200 px-4 py-1 rounded-lg"
              >
                + Add Link
              </button>
            </div>

            <button type="submit" className={buttonPrimary}>
              {editId ? "Update Blog" : "Create Blog"}
            </button>
          </form>
        </div>

        {/* ================= LOGO ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">Upload Logo</h2>

          <form onSubmit={handleLogoSubmit} className="space-y-4">
            <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
            {logo && <img src={URL.createObjectURL(logo)} className="h-20" />}

            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Upload Logo
            </button>
          </form>
        </div>

        {/* ================= PHONE ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">Update Phone</h2>

          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className={inputStyle}
            />

            <button className={buttonPrimary}>Update Phone</button>
          </form>
        </div>

        {/* ================= PAGE CMS ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">Create Page</h2>

          <form onSubmit={handlePageSubmit} className="space-y-4">
            <input
              name="title"
              value={pageForm.title}
              onChange={handlePageChange}
              placeholder="Title"
              className={inputStyle}
            />

            <input
              name="slug"
              value={pageForm.slug}
              onChange={handlePageChange}
              placeholder="Slug"
              className={inputStyle}
            />

            <input
              type="file"
              onChange={(e) => setPageImage(e.target.files[0])}
            />

            {pageImage && (
              <img src={URL.createObjectURL(pageImage)} className="h-24" />
            )}

            <ReactQuill
              value={pageForm.content}
              onChange={(value) => setPageForm({ ...pageForm, content: value })}
              modules={modules}
            />

            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
              Save Page
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminBlog;
