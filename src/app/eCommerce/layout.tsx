import "../globals.css"; 
import { ReactNode } from "react";

export default function eCommerceSiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=  "eCommerce">
        <main>{children}</main>
      </body>
    </html>
  );
}
