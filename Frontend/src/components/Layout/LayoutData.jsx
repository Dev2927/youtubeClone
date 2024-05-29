import { Outlet } from "react-router-dom";
import logoImg from "../../assets/dev.png";
import profileImg from "../../assets/img2.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdVideoCameraFront } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

function LayoutData() {

  const [placeholder, setPlaceholder] = useState("Type to search...");
  const [searchTerm, setSearchTerm] = useState("");
  const [sideBarProperty, setSideBarProperty] = useState(true);
  const [windowSize, setWindowSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);

  const navigate = useNavigate();

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
      document.getElementById("main").style.marginLeft = "0px";
      document.getElementById("footer").style.marginLeft = "300px";
    } else {
      document.getElementById("sidebar").style.marginLeft = "0px";
      document.getElementById("sidebar").style.width = "300px";
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("sidebar").style.transition =
        "transform 0.2s ease-in-out";
      document.getElementById("main").style.marginLeft = "100px";
      document.getElementById("footer").style.marginLeft = "100px";
    }
  }, [w]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
      document.getElementById("main").style.marginLeft = "100px";

      //document.getElementById('sidebar').style.
    }
  };

  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
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
          <form
            className="search-form d-flex align-items-center"
          >
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

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="me-3">
              <span
                className=" nav-link nav-profile d-flex align-items-center pe-0 show"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "35px" }}
                />
                <span
                  className="d-none d-md-block dropdown-toggle ps-2"
                  style={{ color: "#19A7CE" }}
                >
                  Admin
                </span>
              </span>

              <ul
                className=" dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
                style={{
                  position: "absolute",
                  inset: " 0px 0px auto auto",
                  margin: "0px",
                  transform: "translate3d(-16px, 38px, 0px)",
                }}
                data-popper-placement="bottom-end"
              >
                <li className="dropdown-header">
                  <h6>Admin</h6>
                  <span></span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li onClick={logout}>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      {/*=========================SideBar Start========================*/}

      <aside
        id="sidebar"
        className="sidebar"
        style={{ backgroundColor: "#fff", borderRight: "1px solid #36454F" }}
      >
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to={"/login"}>
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
        <div
          style={{ minHeight: "570px", backgroundColor: "#fff" }}
          className="main2"
        >
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
