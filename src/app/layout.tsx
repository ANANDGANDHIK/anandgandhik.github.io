"use client";

import '../styles/globals.css';
import RotateDevice from '../components/RotateDevice';
import SwipeUp from '../components/SwipeUp';
import { isMobile } from '../utils/detectMobile';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="screen-orientation" content="landscape" />
        <title>My 3D Portfolio</title>
      </head>
      <body>
        <RotateDevice />
        {isClient && isMobile() && <SwipeUp />}
        {children}
      </body>
    </html>
  );
}
