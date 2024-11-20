import { useEffect, useState } from "react";
import ReactGA from "react-ga";

export const useAnalytics = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("mint.bidify.cloud")) {
      ReactGA.initialize("UA-220300937-2");
    }
    setInitialized(true);
  }, []);

  return {
    initialized,
  };
};
