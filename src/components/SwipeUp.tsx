"use client";

import React from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

const SwipeUp: React.FC = () => {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [, my] }) => {
      api.start({ y: down ? my : 0 });
      if (!down && my < -100) {
        // Trigger your scroll animation or any other action here
        console.log('Swipe Up Detected');
      }
    },
  });

  return (
    <animated.div
      {...bind()}
      className="swipe-up"
      style={{
        touchAction: 'none',
        y,
      }}
    >
      Swipe Up to Continue
    </animated.div>
  );
};

export default SwipeUp;
