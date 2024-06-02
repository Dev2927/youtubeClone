import React, { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [sendBody, setSendBody] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
    avatar: null,
    coverImage: null,
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateInput = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwrdRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const obj = {};

    for (let key in error) {
      if (sendBody[key] === "" || sendBody[key] === null) {
        obj[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    if (sendBody.email !== "" && !emailRegex.test(sendBody.email)) {
      obj.email = `Email is not valid`;
    }

    if (sendBody.password !== "" && !passwrdRegex.test(sendBody.password)) {
      obj.password = `Password must have eight characters, one small letter, one capital letter, one number, and one special character.`;
    } else if (sendBody.password !== "" && sendBody.password.length < 8) {
      obj.password = `Password must be at least 8 characters long.`;
    }

    setError(obj);

    return Object.keys(obj).length === 0;
  };

  const handleSignup = async () => {
    if (validateInput() === false) {
      return;
    }

    const formData = new FormData();
    formData.append("email", sendBody.email);
    formData.append("password", sendBody.password);
    formData.append("fullName", sendBody.fullName);
    formData.append("username", sendBody.username);
    formData.append("avatar", sendBody.avatar);
    if (sendBody.coverImage) {
      formData.append("coverImage", sendBody.coverImage);
    }
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response of singup: ", response.data);
      if (response.data.success === true) {
        setLoading(false);
        toast.success(response.data?.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setSendBody({
        ...sendBody,
        [name]: files[0],
      });
    } else {
      setSendBody({
        ...sendBody,
        [name]: value,
      });
    }

    setError({
      ...error,
      [name]: false,
    });
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
                        Create an Account
                      </h5>
                      <p className="text-center small">
                        Enter your personal details to create account
                      </p>
                    </div>

                    <div>
                      <div className="col-12 mt-2">
                        <label htmlFor="yourName" className="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className={`form-control ${
                            error.fullName ? "is-invalid" : ""
                          }`}
                          id="yourName"
                          onChange={handleInput}
                          value={sendBody.fullName}
                        />
                        <div className="invalid-feedback">{error.fullName}</div>
                      </div>

                      <div className="col-12 mt-2">
                        <label htmlFor="yourEmail" className="form-label">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${
                            error.email ? "is-invalid" : ""
                          }`}
                          id="yourEmail"
                          onChange={handleInput}
                          value={sendBody.email}
                        />
                        <div className="invalid-feedback">{error.email}</div>
                      </div>

                      <div className="col-12 mt-2">
                        <label htmlFor="yourUsername" className="form-label">
                          Username
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
                            name="username"
                            className={`form-control ${
                              error.username ? "is-invalid" : ""
                            }`}
                            id="yourUsername"
                            onChange={handleInput}
                            value={sendBody.username}
                          />
                          <div className="invalid-feedback">
                            {error.username}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mt-2">
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
                          onChange={handleInput}
                          value={sendBody.password}
                        />
                        <div className="invalid-feedback">{error.password}</div>
                      </div>

                      <div className="col-12 mt-2">
                        <label htmlFor="avatar" className="form-label">
                          Avatar
                        </label>
                        <input
                          className={`form-control ${
                            error.avatar ? "is-invalid" : ""
                          }`}
                          type="file"
                          name="avatar"
                          id="avatar"
                          onChange={handleInput}
                        />
                        <div className="invalid-feedback">{error.avatar}</div>
                      </div>

                      <div className="col-12 mt-2">
                        <label htmlFor="coverImage" className="form-label">
                          Cover Image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          name="coverImage"
                          id="coverImage"
                          onChange={handleInput}
                        />
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleSignup}
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
                            "Create Account"
                          )}
                        </button>
                      </div>
                      <div className="col-12 mt-3">
                        <p className="small mb-0">
                          Already have an account?{" "}
                          <Link to="/login">Log in</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="credits">
                  Designed by{" "}
                  <a href="https://dev2907portfolio.netlify.app/">Dev Anand</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;
