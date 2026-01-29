import LazyLoad from "@/components/base/lazyLoad/index";
import React from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DashboardPage = React.lazy(() => import("@/pages/dashboarch/pages"));
const ReflectionPage = React.lazy(() => import("@/pages/reflection/pages"));
const HumanResourcesPage = React.lazy(
  () => import("@/pages/humanResources/pages")
);
const ResidentsPage = React.lazy(() => import("@/pages/residents/pages"));
const VerificationPage = React.lazy(() => import("@/pages/verification/pages"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "dashboard",
    element: (
      <LazyLoad>
        <DashboardPage />
      </LazyLoad>
    ),
  },

  {
    path: "reflection",
    element: (
      <LazyLoad>
        <ReflectionPage />
      </LazyLoad>
    ),
  },
  {
    path: "human-resources",
    element: (
      <LazyLoad>
        <HumanResourcesPage />
      </LazyLoad>
    ),
  },
  {
    path: "residents",
    element: (
      <LazyLoad>
        <ResidentsPage />
      </LazyLoad>
    ),
  },
  {
    path: "verification",
    element: (
      <LazyLoad>
        <VerificationPage />
      </LazyLoad>
    ),
  },
];
