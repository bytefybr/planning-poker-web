"use client";

import { useEffect, useState } from "react";

import ReactGA from "react-ga4";

const Analytics = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      ReactGA.initialize("G-G9BLNE49SS");
      setIsInitialized(false);
    }
  }, [isInitialized]);

  return null;
};

export default Analytics;
