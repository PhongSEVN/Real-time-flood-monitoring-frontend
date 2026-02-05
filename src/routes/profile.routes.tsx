import LazyLoad from "@/components/base/lazyLoad";
import React from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const ProfileManagerPage = React.lazy(
  () => import("@/pages/profile/pages/index")
);
const ProfilePage = React.lazy(
  () => import("@/pages/profile/pages/DetailProfile")
);

export const profileRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="profile-manager" />,
  },
  {
    path: "profile-manager",
    element: (
      <LazyLoad>
        <ProfileManagerPage />
      </LazyLoad>
    ),
    children: [
      {
        path: "detail",
        element: (
          <LazyLoad>
            <ProfilePage />
          </LazyLoad>
        ),
      },
    ],
  },
];
