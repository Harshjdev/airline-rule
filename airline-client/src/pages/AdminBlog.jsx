import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

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

  const baseUrl =
    import.meta.env.VITE_API_URL ||
    "https://airline-rule.onrender.com";

  const inputStyle =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const buttonPrimary =
    "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

      await axios.post(`${baseUrl}/api/blogs`, formData);

      alert("Blog Created Successfully 🚀");

      setForm({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
      });
      setQuickLinks([""]);
      setImage(null);
    } catch (err) {
      alert("Error creating blog");
    }
  };

  const handlePageSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(pageForm).forEach((key) =>
        formData.append(key, pageForm[key])
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
  navigate("/"); };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= BLOG ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-6">Create Blog</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <ReactQuill
              value={form.content}
              onChange={(value) =>
                setForm({ ...form, content: value })
              }
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
                      setQuickLinks(
                        quickLinks.filter((_, i) => i !== index)
                      )
                    }
                    className="bg-red-500 text-white px-3 rounded-lg"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setQuickLinks([...quickLinks, ""])
                }
                className="bg-gray-200 px-4 py-1 rounded-lg"
              >
                + Add Link
              </button>
            </div>

            <button type="submit" className={buttonPrimary}>
              Create Blog
            </button>
          </form>
        </div>

        {/* ================= LOGO ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">Upload Logo</h2>

          <form onSubmit={handleLogoSubmit} className="space-y-4">
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
            />

            {logo && (
              <img
                src={URL.createObjectURL(logo)}
                className="h-20"
              />
            )}

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

            <button className={buttonPrimary}>
              Update Phone
            </button>
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
              onChange={(e) =>
                setPageImage(e.target.files[0])
              }
            />

            {pageImage && (
              <img
                src={URL.createObjectURL(pageImage)}
                className="h-24"
              />
            )}

            <ReactQuill
              value={pageForm.content}
              onChange={(value) =>
                setPageForm({ ...pageForm, content: value })
              }
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