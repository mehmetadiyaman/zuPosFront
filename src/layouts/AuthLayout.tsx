import * as React from "react";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <CssBaseline enableColorScheme />
      {/* Auth sayfaları için sidebar ve navbar olmadan sadece content */}
      <React.Suspense fallback={<div>Loading...</div>}>
        {children || <Outlet />}
      </React.Suspense>
    </>
  );
}
