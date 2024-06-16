import React, { useState } from "react";
import { Link } from "react-router-dom";
import uploadNoVideo from "../../assets/uploadNoVideo.png";
import uploadNoPhoto from "../../assets/uploadNoPhoto.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function UploadVideos() {
  const [sendBody, setSendBody] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });
  const [error, setError] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });

  let jwt = localStorage.getItem("@JWT");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSendBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError({
      ...error,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSendBody((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
    setError({
      ...error,
      [name]: null,
    });
  };

  const validateInput = () => {
    const obj = {};

    for (let key in error) {
      if (sendBody[key] === "" || sendBody[key] === null) {
        obj[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    setError(obj);

    return Object.keys(obj).length === 0;
  };

  const handleUpload = async () => {
    if (validateInput() === false) {
      return;
    }

    const formData = new FormData();
    formData.append("title", sendBody.title);
    formData.append("description", sendBody.description);
    formData.append("videoFile", sendBody.videoFile);
    if (sendBody.thumbnail) {
      formData.append("thumbnail", sendBody.thumbnail);
    }
    try {
      const response = await axios.post(`/api/v1/videos/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Response of upload video: ", response.data);
      if (response.data.success === true) {
        toast.success("Video uploaded successfully");
        setSendBody({
          title: "",
          description: "",
          videoFile: null,
          thumbnail: null,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Upload API is not working: ", error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div style={{ marginLeft: "150px" }} className="mt-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="pagetitle d-flex justify-content-between">
        <div>
          <h1>Uploads</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Videos</Link>
              </li>
              <li className="breadcrumb-item active">Upload</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row gap-5">
        <div className="card col-md-5" style={{ height: 300 }}>
          <div className="card-header">Set your video details</div>
          <div className="card-body">
            <form className="row g-3 mt-3">
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${
                      error.title ? "is-invalid" : ""
                    }`}
                    id="floatingName"
                    placeholder="Your Title"
                    name="title"
                    value={sendBody.title}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{error.title}</div>
                  <label htmlFor="floatingName">Your Title</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className={`form-control ${
                      error.description ? "is-invalid" : ""
                    }`}
                    placeholder="Your Description"
                    id="floatingTextarea"
                    style={{ height: "100px" }}
                    name="description"
                    value={sendBody.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="invalid-feedback">{error.description}</div>
                  <label htmlFor="floatingTextarea">Your Description</label>
                </div>
              </div>
            </form>
          </div>
          <button className="logoutButton mt-5" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <div className="card col-md-6">
          <div className="card-header">Select video and thumbnail</div>
          <div className="card-body mt-3">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div style={{ height: 400 }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="card-title">Upload Video</div>
                      <div className="">
                        <input
                          className={`form-control ${
                            error.videoFile ? "is-invalid" : ""
                          }`}
                          type="file"
                          id="formFileVideo"
                          name="videoFile"
                          accept="video/*"
                          onChange={handleFileChange}
                        />
                        <div className="invalid-feedback">
                          {error.videoFile}
                        </div>
                      </div>
                    </div>
                    {sendBody.videoFile ? (
                      <video
                        className="d-block w-100 mt-2"
                        controls
                        height="100%"
                        width="100%"
                        autoPlay
                      >
                        <source
                          src={URL.createObjectURL(sendBody.videoFile)}
                          type={sendBody.videoFile.type}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={uploadNoVideo}
                        className="d-block w-100 mt-2"
                        alt="Upload Video"
                        height="100%"
                        width="100%"
                      />
                    )}
                  </div>
                </div>
                <div className="carousel-item">
                  <div style={{ height: 400 }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="card-title">Upload Thumbnail</div>
                      <div className="">
                        <input
                          className={`form-control ${
                            error.thumbnail ? "is-invalid" : ""
                          }`}
                          type="file"
                          id="formFilePhoto"
                          name="thumbnail"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <div className="invalid-feedback">
                          {error.thumbnail}
                        </div>
                      </div>
                    </div>
                    <img
                      src={
                        sendBody.thumbnail
                          ? URL.createObjectURL(sendBody.thumbnail)
                          : uploadNoPhoto
                      }
                      className="d-block w-100 mt-2"
                      alt="Upload Photo"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideos;
