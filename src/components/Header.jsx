import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold text-blue-700">
          AirlineRules
        </div>

        <nav className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/cancel-policy" className="hover:text-blue-600">Cancellation Policy</Link>
          <Link to="/flight-change" className="hover:text-blue-600">Flight Change</Link>
          <Link to="/reservation-policy" className="hover:text-blue-600">Reservation Policy</Link>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <button className="bg-blue-600 p-2 rounded text-white ">+919348948393489</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
