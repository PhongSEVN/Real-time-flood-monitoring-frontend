import LazyLoad from "@/components/base/lazyLoad";
import React from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const HumanResourcesPage = React.lazy(
  () => import("@/pages/humanResources/pages/ListHumanResource")
);

export const humanResourceRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="human-resources" />,
  },
  {
    path: "human-resources",
    element: (
      <LazyLoad>
        <HumanResourcesPage />
      </LazyLoad>
    ),
  },
];
