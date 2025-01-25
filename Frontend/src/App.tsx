import "./App.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Route";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster />
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
