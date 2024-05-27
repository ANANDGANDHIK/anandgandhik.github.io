// vite.config.js
export default {
  // ...
  build: {
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('three')) {
          return 'three-chunk';
        } else if (id.includes('@tweenjs/tween.js')) {
          return 'tweenjs-chunk';
        } else if (id.includes('gsap')) {
          return 'gsap-chunk';
        }
      },
      // ...
    },
  },
};
