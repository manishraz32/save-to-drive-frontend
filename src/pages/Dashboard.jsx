import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get("/profile", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => window.location.href = "/")
  }, [])

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self")
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      {user && (
        <>
          <p>Name: {user?.displayName}</p>
          <img src={user?.photos?.[0].value} alt="profile" />
          <br />
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  )
}

export default Dashboard
