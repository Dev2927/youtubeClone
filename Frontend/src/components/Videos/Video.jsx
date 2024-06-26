import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Video() {
  const [singleVideoData, setSingleVideoData] = useState();
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const ID = location.state && location.state.ID ? location.state.ID : null;
  let jwt = localStorage.getItem("@JWT");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/videos/${ID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("Response of single video: ", response.data);
        if (response.data.success === true) {
          setSingleVideoData(response.data.data);
          setLoading(false);
        } else {
          setSingleVideoData();
          setLoading(false);
        }
      } catch (error) {
        console.log("get video by id is not working: ", error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ marginLeft: "150px" }} className="mt-4">
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
            <div className="d-flex w-100 align-items-center justify-content-center" style={{height: '100%'}}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="card-header">{singleVideoData?.title}</div>
              <div className="card-body">
                <h5 className="card-title">{singleVideoData?.description}</h5>
                <video
                  className="d-block w-100 mt-2"
                  controls
                  height="90%"
                  width="100%"
                  autoPlay
                >
                  {console.log(singleVideoData?.videoFile.url)}
                  <source
                    src={singleVideoData?.videoFile?.url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="card-footer mt-5"></div>
            </>
          )}
        </div>
        <div className="card col-md-4">
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">Card with header and footer</h5>
            Ut in ea error laudantium quas omnis officia. Sit sed praesentium
            voluptas. Corrupti inventore consequatur nisi necessitatibus modi
            consequuntur soluta id. Enim autem est esse natus assumenda. Non
            sunt dignissimos officiis expedita. Consequatur sint repellendus
            voluptas. Quidem sit est nulla ullam. Suscipit debitis ullam iusto
            dolorem animi dolorem numquam. Enim fuga ipsum dolor nulla quia ut.
            Rerum dolor voluptatem et deleniti libero totam numquam nobis
            distinctio. Sit sint aut. Consequatur rerum in.
          </div>
          <div className="card-footer">Footer</div>
        </div>
      </div>
    </div>
  );
}

export default Video;
