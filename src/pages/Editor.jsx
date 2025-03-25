import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

function Editor() {
  const [content, setContent] = useState('manish');

  const handleSave = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/save-to-drive',
        { content },
        { withCredentials: true }
      )
      alert('Saved to Google Drive: ' + res.data.link)
    } catch (err) {
      console.error(err)
      alert('Failed to save.')
    }
  }

  return (
    <div style={{ margin: '50px auto', width: '80%' }}>
      <h2>Create Your Letter</h2>
      {/* <ReactQuill theme="snow" value={content} onChange={setContent} /> */}
      <button onClick={handleSave} style={{ marginTop: '20px' }}>
        Save to Google Drive
      </button>
    </div>
  )
}

export default Editor
