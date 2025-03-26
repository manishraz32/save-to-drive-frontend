import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState();

  console.log(location.pathname);

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  
  useEffect(() => {
    setCurrentPath();
  }, [location.pathname])
  

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/editor")}
            className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            create Letter
          </button>
          <button
            onClick={() => navigate("/alldocs")}
            className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
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
