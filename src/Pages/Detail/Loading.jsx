import React from "react";

Loading.propTypes = {};

function Loading(props) {
  return (
    <>
      <section className="detail-book">
        <div className="container pb-0-mobile">
          <div
            className="row background-pc pt-0 justify-content-lg-around card-product is-loading"
            style={{ background: "#f7f7f7" }}
          >
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 order-0-pc background-mobile pt-0">
              <p className="detail-book_load"></p>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 order-2-pc order-1-tablet background-mobile pt-0">
              <p className="detail-book_load"></p>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mt-30-mobile order-1-pc pt-0">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Loading;
