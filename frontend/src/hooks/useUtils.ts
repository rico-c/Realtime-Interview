import { useState, useEffect } from "react";

export const useRunShortCut= () => {
  const [os, setOs] = useState('win');
  useEffect(() => {
    const mac = /macintosh|mac os x/i.test(navigator.userAgent);
    const result = mac ? "mac" : "win";
    setOs(result);
  }, [])
  return os;
};
