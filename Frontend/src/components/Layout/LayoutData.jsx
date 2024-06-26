import { Outlet } from "react-router-dom";
import logoImg from "../../assets/dev.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdVideoCameraFront } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function LayoutData() {
  const [placeholder, setPlaceholder] = useState("Type to search...");
  const [searchTerm, setSearchTerm] = useState("");
  const [sideBarProperty, setSideBarProperty] = useState(true);
  const [windowSize, setWindowSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);
  const [avatarURI, setAvatarURI] = useState();

  const navigate = useNavigate();
  let jwt = localStorage.getItem("@JWT");

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", windowSizeHandler);

    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, []);

  let w = window.innerWidth;
  useEffect(() => {
    //console.log("WWWWW", w);
    if (w <= 768) {
      document.getElementById("sidebar").style.marginLeft = "-300px";
      document.getElementById("sidebar").style.width = "0px";
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("sidebar").style.transition =
        "transform 0.2s ease-in-out";
      // document.getElementById("main").style.marginLeft = "0px";
      document.getElementById("footer").style.marginLeft = "300px";
    } else {
      document.getElementById("sidebar").style.marginLeft = "0px";
      document.getElementById("sidebar").style.width = "300px";
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("sidebar").style.transition =
        "transform 0.2s ease-in-out";
      document.getElementById("footer").style.marginLeft = "100px";
    }
  }, [w]);

  const handlesidebar = () => {
    setSideBarProperty(!sideBarProperty);

    if (sideBarProperty === true) {
      document.getElementById("sidebar").style.marginLeft = "0px";
      document.getElementById("sidebar").style.width = "300px";
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("sidebar").style.transition =
        "transform 0.2s ease-in-out";
      document.getElementById("main").style.marginLeft = "300px";
    } else if (sideBarProperty === false) {
      document.getElementById("sidebar").style.marginLeft = "0px";
      document.getElementById("sidebar").style.width = "100px";
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("sidebar").style.transition =
        "transform 0.2s ease-in-out";
      document.getElementById("main").style.marginLeft = "0px";
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/users/current-user`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (response.data.success === true) {
          setAvatarURI(response.data.data.avatar);
        } else {
          toast.error("Unable to load your avatar");
        }
      } catch (error) {
        console.log("get user api is not working: ", error);
        if (error?.response?.statusText === "Unauthorized") {
          localStorage.clear();
          setTimeout(() => {
            toast.error("Token expired please login again into your account");
          }, 2000);
          window.location.reload()
        }
      }
    })();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <header
        id="header"
        className="header fixed-top d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <i
            className="fa-solid fa-bars toggle-sidebar-btn"
            style={{ fontSize: "25px", color: "#19A7CE" }}
            onClick={handlesidebar}
            color="red"
          ></i>
          <a href="index.html" className="logo d-flex align-items-center">
            <img src={logoImg} height={75} width={155} alt="" />
          </a>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center">
            <input
              type="text"
              name="query"
              placeholder={`${placeholder}`}
              value={searchTerm}
              onChange={(e) => console.log(e.target.value)}
              title="Enter search keyword"
              style={{ position: "relative" }}
            />
          </form>
        </div>

        <div>
          <button
            style={{
              width: 60,
              height: 40,
              borderRadius: 30,
              border: "none",
              background: "none",
            }}
            onClick={() => navigate("/profilepage")}
          >
            <img
              src={avatarURI}
              width="100%"
              height="100%"
              style={{ borderRadius: 30 }}
            />
          </button>
        </div>
      </header>

      {/*=========================SideBar Start========================*/}

      <aside
        id="sidebar"
        className="sidebar"
        style={{ backgroundColor: "#fff", borderRight: "1px solid #36454F" }}
      >
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to={"/"}>
              <MdHomeFilled color="#19A7CE" size="18" />
              <span className="ms-2" style={{ color: "black" }}>
                Home
              </span>
            </NavLink>
          </li>
          {/*<!-- End Home Nav -->*/}

          <li className="nav-item">
            <NavLink className="nav-link" to={"/home/dash"}>
              <FaUser color="#19A7CE" size="18" />
              <span className="ms-2" style={{ color: "black" }}>
                Your Channel
              </span>
            </NavLink>
          </li>
          {/*<!-- End Your Channel Nav -->*/}

          <li className="nav-item">
            <NavLink className="nav-link" to={"/home/dash"}>
              <RiChatHistoryFill color="#19A7CE" size="18" />
              <span className="ms-2" style={{ color: "black" }}>
                History
              </span>
            </NavLink>
          </li>
          {/*<!-- End History Nav -->*/}

          <li className="nav-item">
            <NavLink className="nav-link" to={"/home/dash"}>
              <MdVideoCameraFront color="#19A7CE" size="18" />
              <span className="ms-2" style={{ color: "black" }}>
                Your Video
              </span>
            </NavLink>
          </li>
          {/*<!-- End Your Video Nav -->*/}

          <li className="nav-item">
            <NavLink className="nav-link" to={"/home/dash"}>
              <AiFillLike color="#19A7CE" size="18" />
              <span className="ms-2" style={{ color: "black" }}>
                Liked Video
              </span>
            </NavLink>
          </li>
          {/*<!-- End Liked Video Nav -->*/}
        </ul>
      </aside>
      {/*=========================SideBar End==========================*/}

      <main id="main" className="main" style={{ backgroundColor: "#fff" }}>
        <div style={{minHeight: '590px'}}>

          <Outlet />
        </div>
      </main>

      {/*<!-- ======= Footer ======= -->*/}
      <footer
        id="footer"
        className="footer"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span style={{ cursor: "pointer", color: "#19A7CE" }}>
              Dev Anand
            </span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default LayoutData;
