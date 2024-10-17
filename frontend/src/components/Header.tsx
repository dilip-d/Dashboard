import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold italic cursor-pointer"
        onClick={() => navigate("/")}
      >
        Patient Management System
      </h1>
      <button
        onClick={toggleMenu}
        className="block sm:hidden focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div className={`hidden sm:flex items-center`}>
        {isAuthenticated && (
          <>
            <button
              onClick={() => navigate("/authorization-list")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Authorization List
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-blue-700 bg-opacity-75 z-10"
          onClick={toggleMenu}
        />
      )}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-500 shadow-lg transition-transform duration-300 ease-in-out z-20 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {isAuthenticated && (
            <>
              <button
                onClick={() => {
                  navigate("/authorization-list");
                  toggleMenu();
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mb-2 w-full"
              >
                Authorization List
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
