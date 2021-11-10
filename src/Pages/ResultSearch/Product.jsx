import React from "react";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

function Product(props) {
  function percentage(num, per) {
    return (Number(num) / 100) * Number(per);
  }
  const { data, loading } = props;
  const dataLoop = [0, 0, 0, 0];
  return (
    <>
      {loading ? (
        <Row>
          {dataLoop.map((val, i) => {
            return (
              <div
                key={i}
                className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-3 mb-3 "
              >
                <div className="card-products">
                  <div className="card-product is-loading">
                    <div className="image-product"></div>
                    <div className="content-product">
                      <span></span>
                      <p></p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
      ) : (
        <Row>
          {JSON.stringify(data) !== "[]" && data.length > 0
            ? data.map((val, i) => {
                return (
                  <div
                    key={i}
                    className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-3 mb-3"
                  >
                    <div className="grid-item">
                      <Link
                        to={`/chi-tiet/${val.slug}-i${val.id}`}
                        className="full-item"
                      ></Link>
                      <div className="grid-product-item__header">
                        <div className="item__header-img">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/images/${val.image}`}
                            alt="Đang tải ..."
                            width="120px"
                            height="160px"
                          />
                          {Number(val.discount > 0) ? (
                            <span className="discount discount-grid">
                              -{val.discount}%
                            </span>
                          ) : null}
                        </div>
                        <div className="product-item__header-info">
                          <Link
                            title={val.name}
                            to=""
                            style={{ textAlign: "center" }}
                            className="text-color"
                          >
                            {val.name}
                          </Link>
                          <h6>{val.author}</h6>
                        </div>
                        <div className="grid-product-item__price flex-column">
                          <span
                            className={
                              Number(val.discount) > 0
                                ? "line-through"
                                : "d-none"
                            }
                          >
                            {Number(val.unit_price).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                          <span
                            className={Number(val.discount) > 0 ? "strong" : "strong mt-40" }
                          >
                            {(
                              Number(val.unit_price) -
                              percentage(val.unit_price, val.discount)
                            ).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </Row>
      )}
    </>
  );
}

export default Product;
