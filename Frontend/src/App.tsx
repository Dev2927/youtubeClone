import "./App.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Route";
<<<<<<< HEAD
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster />
      <RouterProvider router={Routes} />
    </>
  );
=======

function App() {
  return <RouterProvider router={Routes} />;
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
}

export default App;
