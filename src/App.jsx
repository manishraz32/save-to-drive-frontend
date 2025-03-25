import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Editor from './pages/Editor'
import Dashboard from './pages/Dashboard'
import 'react-quill/dist/quill.snow.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
