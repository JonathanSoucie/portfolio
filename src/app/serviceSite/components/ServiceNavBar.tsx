'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ServiceNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/serviceSite/home" },
    { name: "Book Crew", href: "/serviceSite/bookCrew" },
    { name: "My Dashboard", href: "/serviceSite/myDashboard" },
    { name: "Sign In / Sign Up", href: "/serviceSite/signIn" },
  ];

  return (
    <nav className= "backdrop-blur-sm px-8 flex justify-between items-center h-20">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-white text-lg font-bold tracking-wide">PIT CREW</span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-stretch h-full">
        {navItems.map(({ name, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`px-8 h-full flex items-end pb-4 transition-all duration-200 relative ${
                isActive
                  ? "text-white"
                  : "text-zinc-200 hover:text-orange-400"
              }`}
              style={{
                fontFamily: 'Roboto Condensed, sans-serif',
                fontWeight: '500',
                fontStyle: 'italic',
                fontSize: '18px',
                ...(isActive ? {
                  background: '#c2410c',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
                } : {})
              }}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}