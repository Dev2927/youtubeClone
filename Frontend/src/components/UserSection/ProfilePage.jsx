import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import coverImage from "../../assets/coverImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";

function ProfilePage() {
  const [data, setData] = useState();
  const [sendBody, setSendBody] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState({
    email: "",
    fullName: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [sendBodyForPassword, setSendBodyForPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errorPass, setErrorPass] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [sendBodyForAvatar, setSendBodyForAvatar] = useState({
    avatar: null,
  });
  const [sendBodyForCover, setSendBodyForCover] = useState({
    coverImage: null,
  });

  let jwt = localStorage.getItem("@JWT");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/users/current-user`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("Response of profile: ", response.data);
        if (response.data.success === true) {
          setData(response.data.data);
          setSendBody({
            fullName: response.data.data.fullName,
            username: response.data.data.username,
            email: response.data.data.email,
          });
        } else {
          toast.error("Unable to load your profile details");
        }
      } catch (error) {
        toast.error(error?.response?.statusText);
        console.log("get user api is not working: ", error);
      }
    })();
  }, []);

  const handleInputDetails = (e) => {
    const { name, value } = e.target;
    setSendBody({
      ...sendBody,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  const validateInput = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const obj = {};

    for (let key in error) {
      if (sendBody[key] === "" || sendBody[key] === null) {
        obj[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    if (sendBody.email !== "" && !emailRegex.test(sendBody.email)) {
      obj.email = `Email is not valid`;
    }

    setError(obj);

    return Object.keys(obj).length === 0;
  };

  const handleEditDetails = async () => {
    if (validateInput() === false) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/v1/users/update-account`,
        sendBody,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Response of Edit user: ", response.data);
      if (response.data.success === true) {
        toast.success(response?.data?.message);
        setLoading(false);
      } else {
        toast.error(response?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleInputPasswordChange = (e) => {
    const { name, value } = e.target;

    setSendBodyForPassword({
      ...sendBodyForPassword,
      [name]: value,
    });
    setErrorPass({
      ...errorPass,
      [name]: "",
    });
  };

  const validateInputForPass = () => {
    const passwrdRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const obj = {};

    for (let key in errorPass) {
      if (
        sendBodyForPassword[key] === "" ||
        sendBodyForPassword[key] === null
      ) {
        obj[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    if (
      sendBodyForPassword.newPassword !== "" &&
      !passwrdRegex.test(sendBodyForPassword.newPassword)
    ) {
      obj.newPassword = `Password must have eight characters, one small letter, one capital letter, one number, and one special character.`;
    } else if (
      sendBodyForPassword.newPassword !== "" &&
      sendBodyForPassword.newPassword.length < 8
    ) {
      obj.newPassword = `Password must be at least 8 characters long.`;
    }

    setErrorPass(obj);

    return Object.keys(obj).length === 0;
  };

  const handlePassChange = async () => {
    if (validateInputForPass() === false) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `/api/v1/users/change-password`,
        sendBodyForPassword,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Response of Pass Change: ", response.data);
      if (response.data.success === true) {
        toast.success(response?.data?.message);
        setLoading(false);
      } else {
        toast.error(response?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`/api/v1/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Res of logout: ", res.data);
      if (res.data.success === true) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log("LOGOUT API is not working: ", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleFileChangeForAvatar = (e) => {
    const { name, files } = e.target;
    setSendBodyForAvatar((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleFileChangeForCover = (e) => {
    const { name, files } = e.target;
    setSendBodyForCover((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleUpdateCoverImage = async () => {
    const formData = new FormData();
    formData.append("coverImage", sendBodyForCover.coverImage);
    try {
      const response = await axios.patch(
        `/api/v1/videos/cover-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Response of update cover image: ", response.data);
    } catch (error) {
      console.log("update cover image API is not working: ", error?.message);
    }
  };

  const handleUpdaterAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", sendBodyForAvatar.avatar);
    try {
      const response = await axios.patch(
        `/api/v1/videos/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Response of update of avatar: ", response.data);
    } catch (error) {
      console.log("update cover image API is not working: ", error?.message);
    }
  };

  return (
    <main id="main" className="main">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="pagetitle d-flex justify-content-between">
        <div>
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>

        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center m-0">
                <img
                  src={data?.avatar}
                  alt="Profile"
                  className="rounded-circle"
                />
                <h2>{data?.username}</h2>
                <h3>{data?.fullName}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Edit Profile
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <div className="p-0 m-0" style={{ position: "relative" }}>
                      <img
                        src={coverImage}
                        alt="no img"
                        width="100%"
                        height="100%"
                      />

                      <div
                        style={{
                          height: 130,
                          width: 130,
                          position: "absolute",
                          bottom: 1,
                          top: 150,
                        }}
                      >
                        <img
                          src={data?.avatar}
                          alt="no img"
                          width="100%"
                          height="100%"
                          style={{ borderRadius: 200 }}
                        />
                      </div>
                    </div>

                    <h5 className="card-title mt-5">Profile Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Full Name</div>
                      <div className="col-lg-9 col-md-8">{data?.fullName}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Username</div>
                      <div className="col-lg-9 col-md-8">{data?.username}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">{data?.email}</div>
                    </div>
                    <div className="">
                      <button
                        className="logoutButton"
                        data-bs-toggle="modal"
                        data-bs-target="#largeModalForAvatar"
                      >
                        Edit Avatar
                      </button>
                      <button
                        className="logoutButton"
                        data-bs-toggle="modal"
                        data-bs-target="#largeModalForCoverImage"
                      >
                        Edit Coverimage
                      </button>
                    </div>
                  </div>

                  {/* ------------------------------------- Modal For EDIT Details ------------------------------------------- */}
                  <div
                    className="tab-pane fade profile-edit pt-3"
                    id="profile-edit"
                  >
                    <div>
                      <div className="row mb-3">
                        <label
                          for="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Full Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="fullName"
                            type="text"
                            className={`form-control ${
                              error.fullName ? "is-invalid" : ""
                            }`}
                            id="fullName"
                            value={sendBody.fullName}
                            onChange={handleInputDetails}
                          />
                          <div className="invalid-feedback">
                            {error.fullName}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Username"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Username
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="username"
                            type="text"
                            className={`form-control ${
                              error.username ? "is-invalid" : ""
                            }`}
                            id="username"
                            value={sendBody.username}
                            onChange={handleInputDetails}
                          />
                          <div className="invalid-feedback">
                            {error.username}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Email"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="email"
                            type="text"
                            className={`form-control ${
                              error.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            value={sendBody.email}
                            onChange={handleInputDetails}
                          />
                          <div className="invalid-feedback">{error.email}</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary"
                          onClick={handleEditDetails}
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
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------- Modal For Save Password ------------------------------------------- */}
                  <div
                    className="tab-pane fade pt-3"
                    id="profile-change-password"
                  >
                    <div>
                      <div className="row mb-3">
                        <label
                          for="currentPassword"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Current Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="oldPassword"
                            type="password"
                            className={`form-control ${
                              errorPass.oldPassword ? "is-invalid" : ""
                            }`}
                            id="currentPassword"
                            value={sendBodyForPassword.oldPassword}
                            onChange={handleInputPasswordChange}
                          />
                          <div className="invalid-feedback">
                            {errorPass.oldPassword}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="newPassword"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          New Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="newPassword"
                            type="password"
                            className={`form-control ${
                              errorPass.newPassword ? "is-invalid" : ""
                            }`}
                            id="newPassword"
                            value={sendBodyForPassword.newPassword}
                            onChange={handleInputPasswordChange}
                          />
                          <div className="invalid-feedback">
                            {errorPass.newPassword}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary"
                          onClick={handlePassChange}
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
                            "Change Password"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="largeModalForAvatar" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Avatar</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body d-flex justify-content-center align-items-center gap-4"
              style={{ flexDirection: "column" }}
            >
              <div
                className=""
                style={{
                  height: 200,
                  width: 200,
                }}
              >
                {sendBodyForAvatar.avatar ? (
                  <img
                    src={URL.createObjectURL(sendBodyForAvatar.avatar)}
                    alt="Upload cover image of your choice"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: 200 }}
                  />
                ) : (
                  <img
                    src={data?.avatar}
                    alt="Upload cover image of your choice"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: 200 }}
                  />
                )}
              </div>
              <div className="">
                <input
                  className="form-control"
                  type="file"
                  id="formFilePhoto"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChangeForAvatar}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdaterAvatar}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="largeModalForCoverImage" tabindex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Cover Image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body d-flex justify-content-center align-items-center gap-4"
              style={{ flexDirection: "column" }}
            >
              <div
                className=""
                style={{
                  height: 300,
                  width: 700,
                }}
              >
                {sendBodyForCover.coverImage ? (
                  <img
                    src={URL.createObjectURL(sendBodyForCover.coverImage)}
                    alt="Upload cover image of your choice"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: 20 }}
                  />
                ) : (
                  <img
                    src={data?.coverImage}
                    alt="Upload cover image of your choice"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: 200 }}
                  />
                )}
              </div>
              <div className="">
                <input
                  className="form-control"
                  type="file"
                  id="formFilePhoto"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleFileChangeForCover}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateCoverImage}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
