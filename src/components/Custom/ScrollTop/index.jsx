import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WOW from "wowjs";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    new WOW.WOW({
      mobile: false,
      live: false,
    }).init();
  }, [pathname]);


  return null;
}
