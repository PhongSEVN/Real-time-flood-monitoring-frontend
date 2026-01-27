import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "@/components/base/lazyLoad";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";

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
      <ProtectedRoute>
        <LazyLoad>
          <DefaultLayout />
        </LazyLoad>
      </ProtectedRoute>
    ),
    children: [...dashboardRoutes],
  },
  ...authRoutes,
]);

export default routers;
