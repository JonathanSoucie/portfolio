import "../globals.css"; // or wherever your global styles are
import { ReactNode } from "react";
import ServiceNavBar from "@/app/serviceSite/components/ServiceNavBar";

export default function ServiceSiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=  "service-site">
        <ServiceNavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
