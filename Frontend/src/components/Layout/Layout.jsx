import LayoutData from './LayoutData';
import Login from '../Auth/Login';

function Layout() {

  const loggedIn = localStorage.getItem('@IsLoggedIn')  

  return (
    <>
        {loggedIn == 'true' ? <LayoutData /> : <Login />}
    </>
  );
}

export default Layout;
