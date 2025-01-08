import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

export const useAnalytics = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("mint.bidify.cloud")) {
      ReactGA.initialize("G-T27Q5WB84F");
      ReactGA.send({
        hitType: "pageview",
        page: "/",
        title: "Bidify Mint Page",
      });
    }
    setInitialized(true);
  }, []);

  return {
    initialized,
  };
};
