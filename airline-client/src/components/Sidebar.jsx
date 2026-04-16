const Sidebar = ({ blog }) => {
  // ✅ Remove empty / whitespace-only links
  const validLinks = blog?.quickLinks?.filter(
    (link) => link && link.trim() !== "",
  );

  // ✅ Hide sidebar if no valid links
  if (!validLinks || validLinks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">Quick Links</h3>

      <ul className="space-y-3 text-gray-700">
        {validLinks.map((link, index) => (
          <li key={index} className="hover:text-blue-600 cursor-pointer">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
