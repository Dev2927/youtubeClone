import React, { useEffect, useState } from "react";
import axios from "axios";
import noVideo from "../../assets/noVideo.png";
import noImage from "../../assets/noImage.jpg";
import { useNavigate } from "react-router-dom";

function ShowAllVideo() {
  const [allVideos, setAllVideos] = useState([]);

  const navigate = useNavigate()

  let jwt = localStorage.getItem("@JWT");
  

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/videos/`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        // console.log(
        //   "Response of Get All videos api: ",
        //   response.data.data.videos
        // );
        if (response.data.success === true) {
          setAllVideos(response.data?.data?.videos);
        } else {
          setAllVideos([]);
        }
      } catch (error) {
        console.log("Get All videos api is not working: ", error);
      }
    })();
  }, []);

  return (
    <div style={{ marginLeft: "150px" }} className="mt-4">
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
          onClick={() => navigate('/upload/videos')}
        >
          Upload
        </button>
      </div>

      {allVideos.length > 0 ? (
        <>
          <div className="col-lg-12 mt-4">
            <div className="row">
              {allVideos &&
                allVideos.map((item, i) => (
                  <div
                    className="col-xxl-4 col-md-6"
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    key={i}
                    onClick={() => navigate('/video')}
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
                            }}
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
                          <div className="ps-3 mt-2">
                            <h6 className="p-1 card-title fw-bold ">{item.title}</h6>
                            <span className="mt-2 p-1">
                              {item.description}
                            </span>{" "}
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
    </div>
  );
}

export default ShowAllVideo;
