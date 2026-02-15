const Sidebar = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">
        Quick Links
      </h3>

      <ul className="space-y-3 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">
          What is {blog.title}?
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          Rules & Regulations
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          24 Hour Cancellation
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          How To Cancel?
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
