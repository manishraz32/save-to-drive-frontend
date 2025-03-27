import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import API_URL from "../const/const.js";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState(null);


  const logout = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      if (res.statusText == "OK") {
        toast.success("Logout successfully");
        navigate("/");
      } else {
        toast.error("Faild to logout");
      }
    } catch {
      toast.error("Faild to logout");
    }
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);


  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/editor")}
            className={`cursor-pointer  text-blue-600 px-4 py-2 rounded hover:bg-blue-100 ${
              currentPath == "/editor" ? "bg-blue-300" : "bg-white"
            }`}
          >
            create Letter
          </button>
          <button
            onClick={() => navigate("/alldocs")}
            className={`cursor-pointer text-blue-600 px-4 py-2 rounded hover:bg-blue-100 ${
              currentPath == "/alldocs" ? "bg-blue-300" : "bg-white"
            }`}
          >
            All Documents
          </button>
          <button
            onClick={logout}
            className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
