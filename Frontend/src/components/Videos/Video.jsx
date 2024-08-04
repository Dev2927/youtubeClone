import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { FaLocationArrow } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

function Video() {
  let jwt = localStorage.getItem("@JWT");
  let userId = localStorage.getItem("@ID");
  const location = useLocation();
  const inputRef = useRef(null);

  const [singleVideoData, setSingleVideoData] = useState();
  const [loading, setLoading] = useState(false);
  const [likedVideo, setLikedVideo] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const ID = location.state && location.state.ID ? location.state.ID : null;

  useEffect(() => {
    showVideo();
    showAllComments();
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
        setSingleVideoData();
      }
    } catch (error) {
      toast.error("Something wrong please try again or restart your page");
      console.error("Error fetching video by ID:", error);
      setSingleVideoData();
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
      });
      // console.log("this is res of comments : ", response?.data?.data.comments);
      if (response.data.success === true) {
        let newComments = response?.data?.data.comments.map((item) => ({
          ...item,
          isRights: item.owner === userId,
        }));
        setCommentData(newComments);
      } else {
        setCommentData([]);
      }
    } catch (error) {
      console.log("error while fetching comments : ", error);
      setCommentData([]);
    }
  };

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
      } else {
        setLikedVideo([]);
      }
    } catch (error) {
      console.log("All like videos api is not working : ", error);
      setLikedVideo([]);
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

  const handlePostComment = async () => {
    let obj = {};
    if (commentToggle) {
      obj = {
        newContent: comment,
      };
    }else{
      obj = {
        comment: comment,
      };
    }

    try {
      const response = commentToggle ? await axios.patch(`/api/v1/comments/c/${ID}`, obj, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }) : await axios.post(`/api/v1/comments/${ID}`, obj, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      console.log("res of add comment : ", response.data);
      if (response.data.success === true) {
        showAllComments();
        setComment("");
      } else {
        toast.error("Unable to add comment");
      }
    } catch (error) {
      toast.error("Unable to add comment");
      console.log("post comment api is not working : ", error);
    }
  };

  const handleCommentDelete = async (id) => {
    const isConfirm = window.confirm("Do you want to delete this comment?");
    if (!isConfirm) return;

    try {
      const response = await axios.delete(`/api/v1/comments/c/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.data.success === true) {
        toast.success("Comment deleted");
        showAllComments();
      } else {
        toast.error("Unable to delete comment");
      }
    } catch (error) {
      console.log("comment delete api is not working : ", error);
      toast.error("Unable to delete comment");
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
                    (item, i) =>
                      item?.alreadyLiked && (
                        <button
                          style={{ border: "none", background: "none" }}
                          onClick={handleToggleLike}
                          key={i}
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
          <div className="card-body m-0 p-0">
            {commentData.length > 0 ? (
              commentData.map((item, ind) => (
                <div
                  className="d-flex gap-2 col-md-12 align-items-center"
                  key={ind}
                >
                  <ul className="list-group list-group-flush px-3 w-100">
                    <li
                      className="list-group-item col-md-10"
                      // style={{ borderBottom: "1px solid" }}
                    >
                      <div className="d-flex align-items-center gap-1">
                        <CiCircleCheck className="text-success" />
                        <strong>{item.ownerDetails.username}</strong>
                      </div>
                      <span className="ps-4">{item.content}</span>
                    </li>
                  </ul>
                  {item.isRights && (
                    <>
                      <button
                        style={{ border: "none", background: "none" }}
                        className="col-md-1"
                        onClick={() => {
                          window.scroll(0, 500);
                          inputRef.current.focus();
                          setComment(item.content);
                          setCommentToggle(true);
                        }}
                      >
                        <FaEdit color="darkBlue" />
                      </button>
                      <button
                        style={{ border: "none", background: "none" }}
                        className="col-md-1"
                        onClick={() => handleCommentDelete(item._id)}
                      >
                        <FaTrash color="red" />
                      </button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-3">
                <span className="card-title">No Comments yet</span>
              </div>
            )}
          </div>
          <div className="card-footer d-flex gap-2">
            <input
              className="form-control"
              placeholder="Add a comment..."
              style={{ width: "80%" }}
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              ref={inputRef}
            />
            <button
              style={{ border: "none", background: "none" }}
              onClick={handlePostComment}
            >
              <FaLocationArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
