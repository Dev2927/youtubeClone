import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

function Video() {
  let jwt = localStorage.getItem("@JWT");
  let userId = localStorage.getItem("@ID");
  const location = useLocation();

  const [singleVideoData, setSingleVideoData] = useState();
  const [loading, setLoading] = useState(false);
  const [sendBody, setSendBody] = useState({
    videoFile: null,
  });
  const [likedVideo, setLikedVideo] = useState([]);
  const [commentData, setCommentData] = useState([])

  const ID = location.state && location.state.ID ? location.state.ID : null;

  console.log("this is videoID : ", ID);

  useEffect(() => {
    showVideo();
    showAllComments()
  }, [ID, jwt]);

  const showVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/videos/${ID}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // console.log("Res of video : ", response.data);
      if (response.data.success === true) {
        setSingleVideoData({
          ...response.data.data,
          showPublish: response.data.data.videoOwner == userId,
        });
        allLikeVideos();
      } else {
        toast.error("Unable to show your video");
        setSingleVideoData(null);
      }
    } catch (error) {
      toast.error("Something wrong please try again or restart your page");
      console.error("Error fetching video by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const showAllComments = async () => {
    try {
      const response = await axios.get(`/api/v1/comments/${ID}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      console.log('this is res of comments : ', response)
    } catch (error) {
      console.log('error while fetching comments : ', error)
    }
  }

  const allLikeVideos = async () => {
    try {
      const response = await axios.get(`/api/v1/likes/videos`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.data.success === true) {
        const likedVideos = response.data.data.filter((item) =>
          item.likedBy.some((user) => user._id === ID)
        );
        const videosWithAlreadyLiked = likedVideos.map((video) => ({
          ...video,
          alreadyLiked: true,
        }));
        setLikedVideo(videosWithAlreadyLiked);
      }
    } catch (error) {
      console.log("All like videos api is not working : ", error);
    }
  };

  const handlePublishStatus = async () => {
    try {
      const response = await axios.patch(
        `/api/v1/videos/toggle/publish/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.data.success === true) {
        if (response.data.data.isPublished) {
          toast.success("Video is ready to watched");
        } else {
          toast.success("Video is removed from all videos");
        }
        showVideo();
      } else {
        toast.error("Unable to publish / unpublish your video");
      }
    } catch (error) {
      toast.error("Something wrong please try again or restart your page");
      console.log("publish api is not working : ", error);
    }
  };

  const handleToggleLike = async () => {
    try {
      const response = await axios.post(`/api/v1/likes/toggle/v/${ID}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("this is response of like video api : ", response.data);
      if (response.data.success === true) {
        showVideo();
      } else {
        toast.error("Unable to like video");
      }
    } catch (error) {
      console.log("Error in like video api : ", error);
    }
  };

  return (
    <div style={{ marginLeft: "150px" }} className="mt-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="pagetitle d-flex justify-content-between">
        <div>
          <h1>Video</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Videos</a>
              </li>
              <li className="breadcrumb-item active">Video</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row gap-5">
        <div className="card col-md-7 m-0 p-0">
          {loading ? (
            <div
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="card-header">{singleVideoData?.title}</div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{singleVideoData?.description}</h5>
                  {singleVideoData?.showPublish && (
                    <div className="form-check form-switch d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={singleVideoData?.isPublished}
                        onChange={handlePublishStatus}
                      />
                      <label
                        className="form-check-label card-title mt-2"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Publish Video
                      </label>
                    </div>
                  )}
                </div>
                <video
                  className="d-block w-100 mt-2"
                  controls
                  height="90%"
                  width="100%"
                >
                  <source
                    src={singleVideoData?.videoFile?.url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="card-footer mt-5 d-flex justify-content-end">
                {likedVideo.length == 0 && (
                  <button
                    style={{ border: "none", background: "none" }}
                    onClick={handleToggleLike}
                    className=""
                  >
                    <BiSolidLike size={25} />
                  </button>
                )}
                {likedVideo?.length > 0 &&
                  likedVideo.map(
                    (item) =>
                      item?.alreadyLiked && (
                        <button
                          style={{ border: "none", background: "none" }}
                          onClick={handleToggleLike}
                        >
                          <BiSolidLike color="red" size={25} />
                        </button>
                      )
                  )}
              </div>
            </>
          )}
        </div>
        <div className="card col-md-4 m-0 p-0">
          <div className="card-header">Comment Section</div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item disabled" aria-disabled="true">
                A disabled item
              </li>
            </ul>
          </div>
          <div className="card-footer">Footer</div>
        </div>
      </div>
      {/* <div className="modal fade" id="largeModalForUpdateVideo" tabIndex="1-">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Video</h5>
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
                style={{
                  height: 300,
                  width: 700
                }}
              >
                {sendBody.videoFile ? (
                  <video
                    className="d-block w-100 mt-2"
                    controls
                    height="100%"
                    width="100%"
                  >
                    <source
                      src={URL.createObjectURL(sendBody.videoFile)}
                      type={sendBody.videoFile.type}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <video
                    className="d-block w-100 mt-2"
                    controls
                    height="100%"
                    width="100%"
                  >
                    <source
                      src={singleVideoData?.videoFile?.url}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                 )}
              </div>
              <div>
                <input
                  className="form-control"
                  type="file"
                  id="formFileVideo"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleUpdateVideoFileChange}
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
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Video;
