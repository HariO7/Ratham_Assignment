import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./page/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
