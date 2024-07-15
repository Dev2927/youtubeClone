import React, { useEffect, useState } from "react";
import axios from "axios";
import noVideo from "../../assets/noVideo.png";
import noImage from "../../assets/noImage.jpg";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

function ShowAllVideo() {
  const [allVideos, setAllVideos] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);

  const navigate = useNavigate();

  let jwt = localStorage.getItem("@JWT");
  let id = localStorage.getItem("@ID");

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setScreenLoading(true);
    try {
      const response = await axios.get(`/api/v1/videos/`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(
        "Response of Get All videos api: ",
        response.data.data.videos
      );
      if (response.data.success === true) {
        const videos = response.data?.data?.videos.map((video) => {
          return {
            ...video,
            isDeleteIcon: video.videoOwner === id,
          };
        });
        setAllVideos(videos);
        setScreenLoading(false);
      } else {
        setAllVideos([]);
        setScreenLoading(false);
      }
    } catch (error) {
      console.log("Get All videos api is not working: ", error);
      setScreenLoading(false);
    }
  };

  const handleDeleteButton = async (videoId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!userConfirmed) {
      return;
    }
    setScreenLoading(true)
    try {
      const response = await axios.delete(`/api/v1/videos/${videoId}`);
      console.log("This is delete api res : ", response);
      if (response.data.success === true) {
        toast.success("Video Deleted");
        getVideos();
        setScreenLoading(false)
      } else {
        toast.error("Unable to delete please try again later");
        setScreenLoading(false)
      }
    } catch (error) {
      console.log("Delete api is not working : ", error);
      setScreenLoading(false)
    }
  };

  return (
    <div style={{ marginLeft: "150px" }} className="mt-4">
      {screenLoading ? (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <MutatingDots
            visible={true}
            width="100"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <>
          <div className="pagetitle d-flex justify-content-between">
            <div>
              <h1>Dashboard</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </nav>
            </div>
            <button
              className="logoutButton"
              onClick={() => navigate("/upload/videos")}
            >
              Upload
            </button>
          </div>

          {allVideos.length > 0 ? (
            <>
              <div className="col-md-12 mt-4">
                <div className="row">
                  {allVideos &&
                    allVideos.map((item, i) => (
                      <div
                        className="col-xxl-4 col-md-6"
                        style={{
                          border: "none",
                          background: "none",
                        }}
                        key={i}
                      >
                        <div className="card info-card sales-card">
                          <div className="card-body m-0 p-0">
                            <div
                              className="col-lg-12"
                              style={{ overflow: "hidden" }}
                            >
                              <div
                                className=""
                                style={{
                                  borderBottom: "1px solid gray",
                                  overflow: "hidden",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  navigate("/video", {
                                    state: { ID: item._id },
                                  })
                                }
                              >
                                {item.thumbnail.url ? (
                                  <img
                                    src={item.thumbnail.url}
                                    width="100%"
                                    style={{
                                      height: 160,
                                      overflow: "hidden",
                                      borderRadius: 3,
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={noImage}
                                    width="100%"
                                    style={{ height: 160 }}
                                  />
                                )}
                              </div>
                              <div className="ps-3 py-1 mt-2 d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 className="p-1 card-title fw-bold ">
                                    {item.title}
                                  </h6>
                                  <span className="mt-2 p-1">
                                    {item.description}
                                  </span>{" "}
                                </div>
                                {item.isDeleteIcon && (
                                  <button
                                    style={{
                                      border: "none",
                                      background: "none",
                                    }}
                                    onClick={() => handleDeleteButton(item._id)}
                                    className=""
                                  >
                                    <MdDelete color="red" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center"
            >
              <img src={noVideo} width="40%" height="40%" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShowAllVideo;
