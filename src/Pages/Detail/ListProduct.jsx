import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

ListProduct.propTypes = {};

function ListProduct(props) {
  const { data } = props;
  function percentage(num, per) {
    return (Number(num) / 100) * Number(per);
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <section className="detail-book">
      <div className="container pb-0-mobile">
        <Row className="mt-4">
          <Col>
            <div className="detail-book__service-tittle">
              <h5>
                <strong>Sách cùng loại</strong>
              </h5>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="custom-border-carousel">
            <Carousel responsive={responsive}
            infinite={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            autoPlay={true}
            >
              {data ? (
                data.map((val, i) => {
                  return (
                    <Row key={i} className="m-2">
                      <div className="col-12 p-3">
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
                                {Number(val.unit_price).toLocaleString(
                                  "it-IT",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </span>
                              <span
                                className={
                                  Number(val.discount) > 0 ? "strong" : "strong"
                                }
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
                    </Row>
                  );
                })
              ) : (
                <div></div>
              )}
            </Carousel>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ListProduct;
