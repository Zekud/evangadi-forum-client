import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../Config/axiosConfig";
import NavBar from "../components/NavBar";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Footer from "../components/Footer";
import { Snackbar } from "../ContextApi/SnackBarContext";
import ClipLoader from "react-spinners/ClipLoader";
function Login() {
  const { handleClick, setData, setError } = useContext(Snackbar);
  const [userName, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
    passwordRef.current.type = showPassword ? "password" : "text";
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    setError("");
    setData("");
    if (!loginEmail || !loginPassword) {
      setLoginError("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axiosConfig.post("/users/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data.msg);
      handleClick();
      setLoading(false);
    }
  }

  function toggleLogin() {
    setShowLogin(!showLogin);
  }
  async function handleRegister(e) {
    e.preventDefault();
    setRegisterError("");
    setError("");
    setData("");
    setRegisterLoading(true);
    if (!userName || !firstName || !lastName || !email || !password) {
      setRegisterError("All fields are required");
      setRegisterLoading(false);
      return;
    }
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      setRegisterLoading(false);
      return;
    }
    try {
      const { data } = await axiosConfig.post("/users/register", {
        username: userName,
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });
      // alert(data.msg + "Please Login");

      setData(data?.msg + ". Please Login");
      handleClick();
      toggleLogin();
    } catch (error) {
      // console.log(error);
      // alert(error.response.data.msg);
      setError(error.response?.data?.msg);
      handleClick();
      setRegisterLoading(false);
    }
  }
  return (
    <>
      <NavBar />
      <div className="w-full p-10 h-full flex-col items-center gap-10 md:flex md:flex-row md:items-center  ">
        <div className="form w-full h-[500px] flex flex-col gap-4 border-[1px] m-2 shadow-[0_0_5px_0] rounded-lg mx-auto p-10 items-center">
          {showLogin ? (
            <>
              <h1 className="text-4xl text-tertiary font-bold my-2">
                Login to your account
              </h1>
              <p className="my-3">
                Don't have an account?
                <span className="text-secondary font-bold pl-1 text-lg">
                  <button onClick={toggleLogin}>Create your account</button>
                </span>
              </p>
              {loginError && <p className="text-red-400">{loginError}</p>}
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-8 w-full "
              >
                <input
                  type="email"
                  name="loginEmail"
                  id="loginEmail"
                  // required
                  value={loginEmail}
                  placeholder="Enter your email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                />
                <div className="relative">
                  <input
                    ref={passwordRef}
                    type="password"
                    name="loginPassword"
                    id="loginPassword"
                    // required
                    value={loginPassword}
                    placeholder="Enter your password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? (
                      <MdVisibilityOff size={25} onClick={togglePassword} />
                    ) : (
                      <MdVisibility size={25} onClick={togglePassword} />
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn bg-primary hover:bg-secondary w-full py-2 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl text-tertiary font-bold">
                Join the Network
              </h1>
              <p>
                Already have an account?
                <span className="text-secondary font-bold pl-1 text-lg">
                  <button onClick={toggleLogin}>Login</button>
                </span>
              </p>
              {registerError && <p className="text-red-400">{registerError}</p>}
              <form
                onSubmit={handleRegister}
                className="flex flex-col gap-3 w-full "
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  required
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                />
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={firstName}
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                  />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={lastName}
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                />
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={passwordRef}
                    required
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border-[1px] border-gray-400 focus:border-b-2 focus:border-b-secondary  outline-none rounded-lg"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? (
                      <MdVisibilityOff size={25} onClick={togglePassword} />
                    ) : (
                      <MdVisibility size={25} onClick={togglePassword} />
                    )}
                  </span>
                </div>

                <p className="text-sm text-gray-400 text-center">
                  {" "}
                  I agree to the{" "}
                  <span className="text-secondary">
                    <a href="#">terms</a>
                  </span>{" "}
                  and{" "}
                  <span className="text-secondary">
                    <a href="#">privacy policy</a>
                  </span>
                </p>
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-secondary w-full py-2 text-white rounded-md"
                  disabled={registerLoading}
                >
                  {registerLoading ? (
                    <ClipLoader color="#ffffff" size={20} />
                  ) : (
                    "Agree and Join"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-secondary mt-6 md:mt-0">About</h3>
          <h1 className="text-5xl font-bold login-gradient py-2 ">
            Evangadi Networks
          </h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Weather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <a
            href="#"
            className="p-3 mt-3 text-white text-lg bg-secondary hover:bg-primary transition-all duration-200 rounded-md w-[max-content] text-center"
          >
            How it works
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
