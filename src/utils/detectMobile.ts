export const isMobile = () => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
    return false;
  };
  