const Sidebar = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">Quick Links</h3>

      <ul className="space-y-3 text-gray-700">
        {blog.quickLinks && blog.quickLinks.length > 0 ? (
          blog.quickLinks.map((link, index) => (
            <li key={index} className="hover:text-blue-600 cursor-pointer">
              {link}
            </li>
          ))
        ) : (
          <li>No links available</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
