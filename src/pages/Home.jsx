function Home() {
    const handleLogin = () => {
      window.open("http://localhost:5000/auth/google", "_self")
    }
  
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Login with Google</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
  
  export default Home
  