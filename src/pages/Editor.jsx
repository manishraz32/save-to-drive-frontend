import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommonDialog from "../components/CommonDialog";
import toast from "react-hot-toast";

function Editor() {
  const [user, setUser] = useState(null);
  const [letter, setLetter] = useState("");
  const [showEditor, setShowEditor] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDocSaving, setIsDocSaving] = useState(false);

  const handleSubmit = async (data) => {
    await handleSave(data);
  };

  const handleSave = async (data) => {
    setIsDocSaving(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/save-to-drive",
        {
          fileName: data?.docName,
          content: letter,
        },
        { withCredentials: true }
      );
      handeSaveDraft();
      setIsDocSaving(false);
      localStorage.setItem("savedDrft", JSON.stringify(""));
      setLetter("");
      alert("Saved to Google Drive: " + res.data.link);
    } catch (err) {
      console.error(err);
      setIsDocSaving(false);
      alert("Failed to save.");
    }
  };

  const getUserDetail = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      setUser(data);
    } catch {
      console.log("Something went wrong while fetching user details.");
    }
  };

  const handeSaveDraft = () => {
    localStorage.setItem("lastDraft", JSON.stringify(letter));
    toast.success("draft is successfully saved");
  };

  const handleLastDraft = () => {
    let lastDraft = JSON.parse(localStorage.getItem("lastDraft"));
    if (!lastDraft) {
      toast.error("Faild to retrive last draft");
    } else {
      setLetter(lastDraft);
      toast.success("Last draft retrived successfully");
    }
  };

  useEffect(() => {
    getUserDetail();
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <CommonDialog
        loading={isDocSaving}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Document Name"
        description="Enter your google docs name to save in google drive."
      />
      <Header />
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {user && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2">
              Welcome, {user?.displayName} 👋
            </h2>
            <img
              src={user?.profilePic}
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
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition cursor-pointer"
              >
                Save to Drive
              </button>
              <button
                onClick={() => handleLastDraft()}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition cursor-pointer"
              >
                Retrive Last Draft
              </button>
              <button
                onClick={() => handeSaveDraft()}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition cursor-pointer"
              >
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
    </div>
  );
}

export default Editor;
