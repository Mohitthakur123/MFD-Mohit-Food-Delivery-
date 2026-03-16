import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
