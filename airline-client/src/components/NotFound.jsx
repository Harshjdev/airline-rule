import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ autoRedirect = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoRedirect, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      {autoRedirect && (
        <p className="text-gray-500 mt-2">Redirecting to homepage...</p>
      )}
    </div>
  );
};

export default NotFound;
