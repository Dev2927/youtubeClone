import { Outlet } from "react-router-dom";
/*import Layout from "./components/Layout/Layout";*/

const App = () => {

    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
    
export default App;
