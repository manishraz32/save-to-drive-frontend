import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Editor() {
  const [user, setUser] = useState(null);
  const [letter, setLetter] = useState("");
  const [showEditor, setShowEditor] = useState(true);
  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/save-to-drive",
        { content: letter },
        { withCredentials: true }
      );
      alert("Saved to Google Drive: " + res.data.link);
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  const getUserDetail = async () => {
    try {
      const { data } = await axios.get("/profile", { withCredentials: true });
      setUser(data);
    } catch (error) {
      console.log("Error fetching user:", error);
      console.log("Something went wrong while fetching user details.");
    }
  };

  const getUsersAllDocument = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/letters", {
        withCredentials: true,
      });
      console.log("docs ", data);
    } catch (error) {
      console.log("Error while fetching users", error);
    }
  };

  useEffect(() => {
    getUserDetail();
    getUsersAllDocument();
    const savedDraft = localStorage.getItem("savedDrft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setLetter(parsedDraft);
      } catch (error) {
        console.error("Failed to parse saved draft from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("savedDrft", JSON.stringify(letter));
    }, 5000);
    return () => clearInterval(timer);
  }, [letter]);

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <Header />
      {/* <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <div className="flex gap-2">
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
      </header> */}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {user && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2">
              Welcome, {user?.displayName} 👋
            </h2>
            <img
              src={user?.photos?.[0]?.value}
              alt="Profile"
              className="mx-auto rounded-full w-24 h-24 object-cover border-4 border-blue-500"
            />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex w-full justify-between gap-2 items-center py-2">
            <div className="flex gap-4 items-center">
              <h3 className="text-xl font-semibold text-center text-gray-800">
                Write your letter ✍️
              </h3>
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition cursor-pointer"
              >
                {showEditor ? "Show Preview" : "Show Editor"}
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSave()}
                className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition cursor-pointer"
              >
                Save to Drive
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition cursor-pointer">
                Save to Draft
              </button>
            </div>
          </div>
          {showEditor ? (
            <ReactQuill
              theme="snow"
              value={letter}
              onChange={setLetter}
              className="custom-quill-editor"
            />
          ) : (
            <div className="mt-4">
              <h4 className="text-lg font-medium">Preview:</h4>
              <div
                className="border mt-2 p-4 bg-gray-50 rounded h-fit overflow-auto max-h-[280px]"
                dangerouslySetInnerHTML={{ __html: letter }}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
      {/* <footer className="bg-blue-600 text-white text-center py-4">
        © {new Date().getFullYear()} My Dashboard. All rights reserved.
      </footer> */}
    </div>
  );
}

export default Editor;
