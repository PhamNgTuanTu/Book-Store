import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";

function Slider(props) {
  const { data, loading } = props;
  const [res, setRes] = useState();
  useEffect(() => {
    setRes({
      loop: true,
      margin: 0,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      items: 1,
      responsiveClass: true,
      responsive: {
        1000: {
          items: 2,
          nav: false,
        },
      },
    });
  }, [data]);
  const showSlider = (sliders) => {
    var result = null;
    if (sliders.length > 0) {
      result = sliders.map((slider, index) => {
        return (
          <div className="item" key={index}>
            <div className="ggd baner-top">
              <Link
                to={`/chi-tiet/${slider.book.slug}-i${slider.book.id}`}
                className="b-link-stripe b-animate-go"
              >
                <div className="gal-spin-effect vertical">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${slider.image}`}
                    alt="Đang tải ..."
                  />
                  <div className="gal-text-box">
                    <div className="info-gal-con">
                      <h4>{slider.name}</h4>
                      <span className="separator" />
                      <p>
                        {slider.start_date === slider.end_date
                          ? `Khuyến mãi áp dụng đến hết ${slider.end_date}`
                          : `Khuyến mãi áp dụng từ ${slider.start_date} đến ${slider.end_date} `}
                      </p>
                      <span className="separator" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  return (
    <>
      {loading ? (
        <section className="slider mt-4">
          <div className="container">
            <div className="row">
              <div
                className="
          col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
          gallery-grids
        "
              >
                <div
                  className="row"
                  style={{ position: "relative", zIndex: 0 }}
                >
                  <div className="card-product is-loading d-flex p-0">
                    <div className="col-lg-6 col-md-6 col-sm-12 author-detail-img background-color h-100">
                      <div
                        className="image-product"
                        style={{ width: "100%", height: "290px" }}
                      ></div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 author-detail-img background-color h-100 hiden-sliden-mobile">
                      <div
                        className="image-product"
                        style={{ width: "100%", height: "290px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="slider mt-4">
          <div className="container">
            <div className="row">
              <div
                //           className="
                //   col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
                //   gallery-grids big wow flipInX animated
                // "
                //           data-wow-duration="1s"
                //           data-wow-delay=".3s"
                className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
      gallery-grids"
              >
                <div
                  className="row"
                  style={{ position: "relative", zIndex: 0 }}
                >
                  <OwlCarousel className="owl-theme" {...res}>
                    {JSON.stringify(data) !== "[]" ? showSlider(data) : null}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Slider;
