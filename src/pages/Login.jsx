import API_URL from "../const/const.js";
function Login() {
  const handleLogin = () => {
    window.open(`${API_URL}/auth/google`, "_self");
  };

  console.log("import.meta.env.MODE: ", import.meta.env.MODE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Please login to your account
        </p>

        {/* Google Login Button */}
        <button
          onClick={handleLogin}
          className="w-full cursor-pointer flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">
            Log in with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <hr className="w-1/3 border-gray-300" />
          <span>or</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
