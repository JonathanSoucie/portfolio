import "../globals.css"; // or wherever your global styles are
import { GameProvider } from './context';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function MemoryGameLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="memory-game">
        <GameProvider>
          <div className="memory-game min-h-screen">
            <main>{children}</main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}