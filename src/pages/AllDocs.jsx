import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react"; // Optional icon library
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import API_URL from "../const/const.js";

const AllDocuments = () => {
  const [documents, setDocuments] = useState(null);
  const getUsersAllDocument = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/letters`, {
        withCredentials: true,
      });
      setDocuments(data.documents);
    } catch (error) {
      console.log("Error while fetching users", error);
    }
  };

  useEffect(() => {
    getUsersAllDocument();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            📄 All Letters
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {documents?.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {doc.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Last modified: {new Date(doc.modifiedTime).toLocaleString()}
                </p>
                <a
                  href={doc.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  View Document
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllDocuments;
