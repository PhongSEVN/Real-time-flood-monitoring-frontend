import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { queryClient } from "./config/queryClient.ts";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { GOOGLE_CLIENT_ID } from "./utils/constants.ts";
import routers from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00B4DB",
          fontFamily: "Roboto, sans-serif",
        },
      }}
    >
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={routers} />
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  </StrictMode>
);
