import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "@/components/base/lazyLoad";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";
import { humanResourceRoutes } from "./humanResource.routes";
import { profileRoutes } from "./profile.routes";

const OverviewSplash = React.lazy(() => import("@/pages/overview/pages"));

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <LazyLoad>
        <OverviewSplash />
      </LazyLoad>
    ),
  },
  {
    path: "/app",
    element: (
      <LazyLoad>
        <DefaultLayout />
      </LazyLoad>
    ),
    children: [...dashboardRoutes, ...humanResourceRoutes, ...profileRoutes],
  },
  ...authRoutes,
]);

export default routers;
