import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            AirlineRules
          </h2>
          <p className="text-gray-400 text-sm leading-6">
            Get the latest airline policies, flight change rules,
            cancellation guides, and travel tips in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white">Blog</Link>
            </li>
            <li>
              <Link to="/cancel-policy" className="hover:text-white">
                Cancellation Policy
              </Link>
            </li>
            <li>
              <Link to="/flight-change" className="hover:text-white">
                Flight Change
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Policies
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/reservation-policy" className="hover:text-white">
                Reservation Policy
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <p className="text-sm mb-4">
            Email: support@airlinerules.com
          </p>

          <div className="flex space-x-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-500 transition">
              <FaInstagram size={14} />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition">
              <FaYoutube size={14} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} AirlineRules. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
