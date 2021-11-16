import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

function percentage(num, per) {
  return (num / 100) * per;
}
function BookNewUpdate(props) {
  const { data, loading } = props;
  const dataLoad = [0, 0, 0, 0];

  return (
    <>
      {loading ? (
        <section className="book-new-update">
          <div className="container">
            <div className="row">
              <div className="col-12 p-0">
                <div className="main-book-list-product position-relative">
                  <h4
                    className="tittle pt-2 big wow jello animated"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                    data-wow-iteration={3}
                  >
                    Sách Mới Cập Nhật
                  </h4>
                  <div className="view-all">
                    <Link to="/tat-ca-sach" className="text-color">
                      Xem Tất Cả
                      <i className="fas fa-angle-double-right" />
                    </Link>
                  </div>
                  <div className="main-book-product">
                    {dataLoad.map((val, i) => {
                      return (
                        <Row key={i} className="mt-3">
                          <Col>
                            <div
                              className="card-product is-loading d-flex pt-0 pb-0"
                              style={{ background: "#f7f7f7" }}
                            >
                              <div className="col-lg-4 col-md-4 col-sm-4 author-detail-img background-color h-100">
                                <div
                                  className="image-product"
                                  style={{ width: "100%", height: "150px" }}
                                ></div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-8 background-color">
                                <div className="author-detail-title">
                                  <div className="content-product">
                                    <span></span>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="book-new-update">
          <div className="container">
            <div className="row">
              <div className="col-12 p-0">
                <div className="main-book-list-product position-relative">
                  <h4
                    className="tittle pt-2 big wow jello animated"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                    data-wow-iteration={3}
                  >
                    Sách Mới Cập Nhật
                  </h4>
                  <div className="view-all" >
                  <Link to="/tat-ca-sach" className="text-color" title="xem tất cả sách">
                      Xem Tất Cả
                      <i className="fas fa-angle-double-right" />
                    </Link>
                  </div>
                  <div className="main-book-product">
                    {data.map((product) => (
                      <div
                        key={product.id}
                        className="product"
                      >
                        <Link
                          to={`/chi-tiet/${product.slug}-i${product.id}`} title={product.name}
                          className="full-item"
                        >
                          {" "}
                        </Link>
                        <div className="book-product__detail">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/images/${product.image}`}
                            alt="Đang tải ..."
                            width={135}
                            height={181}
                          />
                          <div className="book-product__detail-content">
                            <a title={product.name} href="detail">
                              {product.name}
                            </a>
                            <h6>{product.author}</h6>
                            <div className="hide-content">
                              {parse(product.description)}
                            </div>
                          </div>
                        </div>
                        <div className="book-product__content-price">
                          <div className="book-product__content-price_sale position-relative ">
                            <div className="book-product-left">
                              {Number(product.discount) > 0 ? (
                                <span className="discount">
                                  -{product.discount}%
                                </span>
                              ) : null}
                            </div>
                            <div className="book-product-right">
                              <span
                                className={
                                  Number(product.discount) > 0
                                    ? "line-through"
                                    : "strong"
                                }
                              >
                                {Number(product.unit_price).toLocaleString(
                                  "it-IT",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </span>
                              {Number(product.discount) > 0 ? (
                                <span
                                  className={
                                    Number(product.discount) > 0 ? "strong" : ""
                                  }
                                >
                                  {(
                                    Number(product.unit_price) -
                                    percentage(
                                      Number(product.unit_price),
                                      product.discount
                                    )
                                  ).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default BookNewUpdate;
