import { Outlet, useNavigate } from 'react-router-dom'
import LayoutData from './LayoutData';
import Login from '../Auth/Login';

function Layout() {

  const navigate = useNavigate()
  const loggedIn = localStorage.getItem('@IsLoggedIn')  

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

        {loggedIn == 'true' ? <LayoutData /> : <Login />}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
