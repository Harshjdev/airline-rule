import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const AdminBlog = () => {
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
  const baseUrl = import.meta.env.VITE_API_URL || "https://airline-rule.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePageChange = (e) => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // append form fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // ✅ ADD QUICK LINKS
      formData.append("quickLinks", JSON.stringify(quickLinks));

      // image
      if (image) {
        formData.append("bannerImage", image);
      }

      await axios.post(`${baseUrl}/api/blogs`, formData);

      alert("Blog Created Successfully 🚀");

      // reset form
      setForm({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
      });

      setQuickLinks([""]); // ✅ reset links
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };
  const handlePageSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(pageForm).forEach((key) => {
        formData.append(key, pageForm[key]);
      });

      if (pageImage) {
        formData.append("bannerImage", pageImage);
      }

      await axios.post(`${baseUrl}/api/pages`, formData);

      alert("Page Saved Successfully 🚀");

      setPageForm({
        title: "",
        slug: "",
        content: "",
      });

      setPageImage(null);
    } catch (err) {
      console.error(err);
      alert("Error saving page");
    }
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
  const handleLogoSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("logo", logo);

    await axios.post(`${baseUrl}/api/settings/logo`, formData);

    alert("Logo Updated ✅");
  };
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${baseUrl}/api/settings/phone`, {
      phone,
    });

    alert("Phone Updated ✅");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Create Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {/* SLUG */}
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Category</option>
          <option value="cancellation">Cancellation</option>
          <option value="name-change">Name Change</option>
          <option value="refund">Refund</option>
        </select>

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

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
                type="text"
                value={link}
                onChange={(e) => {
                  const updated = [...quickLinks];
                  updated[index] = e.target.value;
                  setQuickLinks(updated);
                }}
                className="w-full border p-2 rounded"
                placeholder={`Link ${index + 1}`}
              />

              <button
                type="button"
                onClick={() => {
                  const updated = quickLinks.filter((_, i) => i !== index);
                  setQuickLinks(updated);
                }}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setQuickLinks([...quickLinks, ""])}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            + Add Link
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Blog
        </button>
      </form>
      {/* ================= LOGO UPLOAD SECTION ================= */}
      <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Upload Header Logo</h2>

        <form onSubmit={handleLogoSubmit} className="space-y-4">
          {/* LOGO INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
            className="w-full"
            required
          />
          {/* PREVIEW */}
          {logo && (
            <img
              src={URL.createObjectURL(logo)}
              alt="Preview"
              className="h-20 object-contain"
            />
          )}

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Upload Logo
          </button>
        </form>
      </div>
      {/* PHONE FORM */}
      <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Update Phone</h2>

        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Phone
          </button>
        </form>
      </div>
      {/* ================= PAGE CMS SECTION ================= */}
      <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Create / Update Page</h2>

        <form onSubmit={handlePageSubmit} className="space-y-4">
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Page Title"
            value={pageForm.title}
            onChange={handlePageChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* SLUG */}
          <input
            type="text"
            name="slug"
            placeholder="Slug (e.g. cancellation-policy)"
            value={pageForm.slug}
            onChange={handlePageChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* BANNER IMAGE */}
          <input
            type="file"
            onChange={(e) => setPageImage(e.target.files[0])}
            className="w-full"
          />

          {/* PREVIEW */}
          {pageImage && (
            <img
              src={URL.createObjectURL(pageImage)}
              alt="Preview"
              className="h-24 object-cover"
            />
          )}

          {/* CONTENT EDITOR */}
          <ReactQuill
            value={pageForm.content}
            onChange={(value) => setPageForm({ ...pageForm, content: value })}
            modules={modules}
            className="bg-white"
          />

          <button className="bg-purple-600 text-white px-6 py-2 rounded">
            Save Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminBlog;
