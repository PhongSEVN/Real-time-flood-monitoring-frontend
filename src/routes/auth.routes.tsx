import LazyLoad from "@/components/base/lazyLoad/index";
import React from "react";
import type { RouteObject } from "react-router-dom";

const LoginPage = React.lazy(() => import("@/pages/auth/login/pages"));
const RegisterPage = React.lazy(() => import("@/pages/auth/register/pages"));
const ResetPasswordPage = React.lazy(
  () => import("@/pages/auth/resetPassword/pages")
);
const PolicyPage = React.lazy(() => import("@/pages/auth/policy"));

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <LazyLoad>
        <LoginPage />
      </LazyLoad>
    ),
  },
  {
    path: "/register",
    element: (
      <LazyLoad>
        <RegisterPage />
      </LazyLoad>
    ),
  },
  {
    path: "/reset",
    element: (
      <LazyLoad>
        <ResetPasswordPage />
      </LazyLoad>
    ),
  },
  {
    path: "/policy",
    element: (
      <LazyLoad>
        <PolicyPage />
      </LazyLoad>
    ),
  },
];
