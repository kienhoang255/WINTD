import React, { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import config from "../config";

const Routes = () => {
  //List route
  const routes = [
    {
      path: config.routes.home,
      component: React.lazy(() => import("../view/home")),
    },
    {
      path: config.routes.login,
      component: React.lazy(() => import("../view/login")),
    },
    {
      path: config.routes.signup,
      component: React.lazy(() => import("../view/signup")),
    },
    {
      path: config.routes.signUpSentEmail,
      component: React.lazy(() => import("../view/signup/SendEmail")),
    },
    {
      path: config.routes.board,
      component: React.lazy(() => import("../view/user")),
    },
  ];

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {routes.map((e, key) => (
          <Route
            key={key}
            path={e.path.path}
            element={
              <Suspense fallback={"..."}>
                <e.component />
              </Suspense>
            }
          ></Route>
        ))}
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
