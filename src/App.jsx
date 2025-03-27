import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import Dashboard from "./pages/Editor";
import AllDocs from "./pages/AllDocs";
import "react-quill/dist/quill.snow.css";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/alldocs" element={<AllDocs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
