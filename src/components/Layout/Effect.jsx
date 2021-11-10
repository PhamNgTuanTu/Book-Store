import React, { useState } from "react";

function Effect() {
  const [mystyle, setMyStyle] = useState({
    height: "0px",
  });

  // scroll to top
  var scroll_top = document.querySelector(".scroll-top");
  window.addEventListener("scroll", function () {
    scroll_top &&
      scroll_top.classList.toggle("active-scroll", window.scrollY > 500);
  });
  if (scroll_top) {
    scroll_top.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  // --scroll to top--

  /* progressbar */
  var totalHeight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function () {
    var progressHeight = (window.pageYOffset / totalHeight) * 100;
    setMyStyle({
      height: progressHeight + "%",
    });
  };
  /* --progressbar-- */

  // giỏ hàng
  window.addEventListener(
    "scroll",
    function () {
      var shopping_cart = document.querySelector(".shopping-cart");
      if (shopping_cart) {
        shopping_cart.classList.toggle(
          "active-scroll-shopping",
          window.scrollY > 1
        );
      }
    },
    []
  );
  // --giỏ hàng--

  return (
    <>
      <div>
        {/* <div id="preloder">
          <div className="loader" />
        </div> */}
        <div className="scroll-top" />
        <div id="progressbar" style={mystyle} />
        <div id="scrollPath" />
      </div>
    </>
  );
}

export default Effect;
