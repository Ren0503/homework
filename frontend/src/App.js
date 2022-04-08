import * as React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";
import SoftDelete from "./pages/SoftDelete";
const Admin = React.lazy(() => import("./pages/Admin"));
const User = React.lazy(() => import("./pages/User"));
const Signin = React.lazy(() => import("./pages/Signin"));

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <React.Suspense fallback={<Loading />}>
              <Signin />
            </React.Suspense>
          }
        />
        <Route
          path="admin"
          element={
            <React.Suspense fallback={<Loading />}>
              <Admin />
            </React.Suspense>
          }
        >
          <Route
            index
            path=":page"
            element={
              <React.Suspense fallback={<Loading />}>
                <Admin />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path="user"
          element={
            <React.Suspense fallback={<Loading />}>
              <User />
            </React.Suspense>
          }
        >
          <Route
            path=":page"
            element={
              <React.Suspense fallback={<Loading />}>
                <User />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path="deleted"
          element={
            <React.Suspense fallback={<Loading />}>
              <SoftDelete />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
