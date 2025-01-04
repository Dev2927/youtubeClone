import { SidebarDemo } from "./Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderState } from "./layout.interface";
import loader from '../assets/loader.gif'

function Layout() {
  const navigate = useNavigate();
  let refreshToken = localStorage.getItem("@token");
  let isVisible = useLoaderState((state) => state.isVisible);

  useEffect(() => {
    if (refreshToken) {
      navigate("/Dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="overflow-hidden w-full h-screen">
      {isVisible && (
        <div className="loader">
          <img src={loader} alt="loading..." width={200} height={200} />
        </div>
      )}
      <SidebarDemo />
    </div>
  );
}

export default Layout;
