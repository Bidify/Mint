import React from "react";
import ReactGa from "react-ga";
import { useLocation } from "react-router-dom";

export const Wrapper = (props) => {
  const location = useLocation();

  React.useEffect(() => {
    if (props.initialized) {
      ReactGa.pageview(location.pathname + location.search);
    }
  }, [props.initialized, location]);
  return <></>;
};
