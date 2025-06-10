'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '/about' },
  { name: 'Work', href: '/work' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-card border-b border-gray-800 text-white">
      <div className="font-raleway text-2xl">Jonathan Soucie</div>
      <div className="flex gap-8">
        {links.map((link) => {
          const isActive = active === link.href;
          return (
            <div key={link.href} className="text-center">
              <Link
                href={link.href}
                className={`no-underline font-raleway font-medium ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
              <div
                className={`mx-auto mt-1 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
