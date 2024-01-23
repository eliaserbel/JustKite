import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import CreateKiteSpot from "./pages/CreateKiteSpot";
import LogIn from "./pages/LogIn";

// layouts
import RootLayout from "./layouts/Rootlayout";

//path/URL and components/pages
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="addspot" element={<CreateKiteSpot />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<LogIn />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
