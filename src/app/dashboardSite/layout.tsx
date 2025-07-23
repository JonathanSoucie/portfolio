import React from "react";
import "../globals.css"; 
import { ReactNode } from "react";

export default function dashboardSiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=  "dashboard">
        <main>{children}</main>
      </body>
    </html>
  );
}
