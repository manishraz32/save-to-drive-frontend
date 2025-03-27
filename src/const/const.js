const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000" 
    : "https://save-to-drive-backend.onrender.com";

export default API_URL;
