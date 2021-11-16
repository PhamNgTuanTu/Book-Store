import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, Col, Row } from "reactstrap";

function HighlightsAuthor(props) {
  const { data, loading, dataBooks } = props;
  return (
    <>
      {loading ? (
        <section className="Highlights-author">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="main-book-update mt-4">
                  <h4
                    className="tittle big wow jello animated"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                    data-wow-iteration={3}
                  >
                    Tác Giả Nổi Bật
                  </h4>
                  <div className="main-book-update-detail2">
                    <div
                      className="card-product is-loading d-flex p-0"
                      style={{ height: "250px" }}
                    >
                      <div className="border-radius-left d-flex align-items-center justify-content-center col-lg-4 col-md-12 col-sm-12 author-detail-img background-color h-100">
                        <div
                          className="image-product"
                          style={{ width: "65%", height: "180px" }}
                        ></div>
                      </div>
                      <div className="border-radius-right col-lg-5 col-md-12 col-sm-12 background-color">
                        <div className="author-detail-title">
                          <div className="content-product">
                            <span></span>
                            <p style={{ height: "100px" }}></p>
                            <p></p>
                          </div>
                        </div>
                      </div>
                      <div className="border-radius-right col-lg-3 col-md-12 col-sm-12 background-color">
                        <div className="author-detail-title">
                          <div className="content-product">
                            <p style={{ height: "50px" }}></p>
                            <p style={{ height: "10px" }}></p>
                            <p style={{ height: "50px" }}></p>
                            <p style={{ height: "10px" }}></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="Highlights-author">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="main-book-update mt-4">
                  <h4
                    className="tittle big wow jello animated"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                    data-wow-iteration={3}
                  >
                    Tác Giả Nổi Bật
                  </h4>
                  <div className="main-book-update-detail2 p-4">
                    <div className="book-update__content1">
                      <Row>
                        <Col
                          md="3"
                          className="d-flex align-items-start justify-content-center pt-3"
                        >
                          <Card inverse>
                            <CardImg
                              className="width-maxcontent"
                              alt={data && data.name}
                              src={`${process.env.REACT_APP_API_URL}/images/${
                                data && data.image
                              }`}
                              height="200px"
                            />
                          </Card>
                        </Col>
                        <Col md="9">
                          <Row>
                            <Col>
                              <div className="author-view1">
                                <div className="book-update__content-description">
                                  <div
                                    className="
                      book-update__content-title
                      book-update__content-title2
                    "
                                  >
                                    {data ? (
                                      <Link to={`/a${data.id}/${data.slug}`} title={`Tác Giả ${data.name}`}>
                                        {data.name}
                                      </Link>
                                    ) : null}

                                    <div id="desc_content-author">
                                      {parse(data && data.description)}
                                      <Link
                                        to={`/a${data.id}/${data.slug}`}
                                        className="view-author"
                                        title="xem tiểu sử tác giả"
                                      >
                                        Xem Thêm
                                        <i className="fas fa-angle-double-right" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <h5>
                                    <em style={{ color: "#fff" }}>
                                      Tác phẩm tiêu biểu:
                                    </em>
                                  </h5>
                                </Col>
                              </Row>
                              <Row>
                                {JSON.stringify(dataBooks) !== "[]" &&
                                dataBooks.length > 0
                                  ? dataBooks.map((val, i) => {
                                      return (
                                        <Col md="6" key={i} className="d-flex align-items-start justify-content-center mt-3">
                                          <img
                                            className="width-maxcontent"
                                            src={`${process.env.REACT_APP_API_URL}/images/${val.image}`}
                                            alt={val.name}
                                            height="100px"
                                            style={{
                                              width: "max-content",
                                            }}
                                          />
                                          <div className="ml-2">
                                            <Link
                                              to={`/chi-tiet/${val.slug}-i${val.id}`}
                                              className="link-product-author"
                                              title={val.name}
                                            >
                                              {val.name}
                                            </Link>
                                          </div>
                                        </Col>
                                      );
                                    })
                                  : null}
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>       
                    </div>
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

export default HighlightsAuthor;
