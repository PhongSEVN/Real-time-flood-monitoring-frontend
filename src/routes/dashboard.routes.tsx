import LazyLoad from "@/components/base/lazyLoad/index";
import React from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DashboardPage = React.lazy(() => import("@/pages/dashboarch/pages"));
const FloodMapPage = React.lazy(() => import("@/pages/floodMap/pages"));
const RainMapPage = React.lazy(() => import("@/pages/rainMap/pages"));
const StationsPage = React.lazy(() => import("@/pages/stations/pages"));
const AlertsPage = React.lazy(() => import("@/pages/alerts/pages"));
const ReportsPage = React.lazy(() => import("@/pages/reports/pages"));
const DamagesPage = React.lazy(() => import("@/pages/damages/pages"));
const ProfilePage = React.lazy(() => import("@/pages/profile/index"));

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
    path: "flood-map",
    element: (
      <LazyLoad>
        <FloodMapPage />
      </LazyLoad>
    ),
  },
  {
    path: "rain-map",
    element: (
      <LazyLoad>
        <RainMapPage />
      </LazyLoad>
    ),
  },
  {
    path: "stations",
    element: (
      <LazyLoad>
        <StationsPage />
      </LazyLoad>
    ),
  },
  {
    path: "alerts",
    element: (
      <LazyLoad>
        <AlertsPage />
      </LazyLoad>
    ),
  },
  {
    path: "reports",
    element: (
      <LazyLoad>
        <ReportsPage />
      </LazyLoad>
    ),
  },
  {
    path: "damages",
    element: (
      <LazyLoad>
        <DamagesPage />
      </LazyLoad>
    ),
  },
  {
    path: "profile",
    element: (
      <LazyLoad>
        <ProfilePage />
      </LazyLoad>
    ),
  },
];
