import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [sendBody, setSendBody] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const requiredFields = ["email", "password"];
    const errors = {};

    requiredFields.forEach((field) => {
      if (!sendBody[field]) {
        errors[field] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/users/login`, sendBody);
      console.log("response: ", response.data);
      if (response.data.success === true) {
        setLoading(false);
        localStorage.setItem("@ID", response.data.data?.user?._id);
        localStorage.setItem("@UNAME", response.data.data?.user?.username);
        localStorage.setItem("@FNAME", response.data.data?.user?.fullName);
        localStorage.setItem("@EMAIL", response.data.data?.user?.email);
        localStorage.setItem("@AVATAR", response.data.data?.user?.avatar);
        localStorage.setItem(
          "@COVERIMAGE",
          response.data.data?.user?.coverImage
        );
        localStorage.setItem("@IsLoggedIn", "true");
        generateAccessRefreshToken(response.data?.data?.refreshToken);
      } else {
        setLoading(false);
        localStorage.clear();
        toast.error("please enter valid information");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.statusText);
      console.log("Login API is not working", error?.message);
    }
  };

  const generateAccessRefreshToken = async (refreshToken) => {
    try {
      const res = await axios.post(`/api/v1/users/refresh-token`, refreshToken);
      console.log('Response of generate access token: ', res.data)
      if (res.data.success === true) {
        localStorage.setItem("@JWT", res.data.data.accessToken);
        window.location.reload();
      } else {
        toast.error("Unable to login");
        localStorage.clear();
      }
    } catch (error) {
      toast.error(error?.response?.statusText);
      console.log("Access Refresh API is not working: ", error?.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSendBody({
      ...sendBody,
      [name]: value,
    });
    setError({
      ...error,
      [name]: false,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your username & password to login
                      </p>
                    </div>

                    <div className="row g-3 needs-validation">
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Email
                        </label>
                        <div className="input-group has-validation">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            @
                          </span>
                          <input
                            type="text"
                            name="email"
                            className={`form-control ${
                              error.email ? "is-invalid" : ""
                            }`}
                            id="youremail"
                            required
                            onChange={handleInput}
                            value={sendBody.email}
                          />
                          <div className="invalid-feedback">
                            Please enter your email.
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className={`form-control ${
                            error.password ? "is-invalid" : ""
                          }`}
                          id="yourPassword"
                          required
                          onChange={handleInput}
                          value={sendBody.password}
                          onKeyDown={handleKeyDown}
                        />
                        <div className="invalid-feedback">
                          Please enter your password!
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                            value="true"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleLogin}
                        >
                          {loading ? (
                            <div
                              className="spinner-border text-light"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have account?{" "}
                          <Link to="/signup">Create an account</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="credits">
                  Designed by{" "}
                  <a
                    href="https://dev2907portfolio.netlify.app/"
                    target="_blank"
                  >
                    Dev Anand
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
