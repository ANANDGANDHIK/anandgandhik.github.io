"use client";

import React from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

const SwipeUp: React.FC<{ onSwipeUp: () => void }> = ({ onSwipeUp }) => {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [, my] }) => {
      api.start({ y: down ? my : 0 });
      if (!down && my < -100) {
        // Trigger the onSwipeUp action
        onSwipeUp();
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
