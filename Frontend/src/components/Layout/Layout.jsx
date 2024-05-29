import { Outlet } from 'react-router-dom'
import LayoutData from './LayoutData';

function Layout() {

    

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-footer fixed-header">
        <div
          className="spinner"
        >
          <div className="center-div">
            <div className="inner-div">
              <div className="loader"></div>
            </div>
          </div>
        </div>

        <LayoutData />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
