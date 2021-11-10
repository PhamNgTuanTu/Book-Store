import $ from "jquery";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Col, Row } from "reactstrap";
import Raiting from "./Raiting";

InfoDetailBook.propTypes = {};

function InfoDetailBook(props) {
  const toggleTransition = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    window.$("#container-tile .list-tittle a").click(function () {
      var position = $(this).parent().position();
      var width = $(this).parent().width();
      $("#container-tile .slider").css({
        left: position.left,
        width: width,
      });
    });
  }, []);
  useEffect(() => {
    var actWidth = window
      .$("#container-tile .list-tittle")
      .find(".active")
      .parent("li")
      .width();
    var actPosition = window
      .$("#container-tile .list-tittle .active")
      .position();
    $("#container-tile .slider").css({
      left: +actPosition.left,
      width: actWidth,
    });

    window.$("document").ready(function () {
      window.$(".tab-slider--body").hide();
      window.$(".tab-slider--body:first").show();
    });

    window.$(".list-tittle li").click(function () {
      $(".tab-slider--body").hide();
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).show();
    });
  }, []);
  var { result } = props;
  return (
    <section className="info-detail-book">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div id="container-tile">
              <ul className="nav list-tittle">
                <div className="slider" />
                <li rel="introduce-book" className="view-add">
                  <Link
                    to=""
                    id="add-active"
                    className="active"
                    data-toggle="tab"
                    onClick={toggleTransition}
                  >
                    Giới Thiệu Sách
                  </Link>
                </li>
                <li rel="detail-info-book" className="view-add">
                  <Link to="" data-toggle="tab" onClick={toggleTransition}>
                    Thông Tin Chi Tiết
                  </Link>
                </li>
                <li rel="review-book" className="view-add">
                  <Link to="" data-toggle="tab" onClick={toggleTransition}>
                    Đánh Giá Bình Luận
                  </Link>
                </li>
              </ul>
            </div>
            <div id="container-content">
              <div className="tab-slider--body" id="introduce-book">
                <h5>Giới Thiệu Sách</h5>
                <div>
                  <h6 className="title-book-info mb-0">{result.name}</h6>
                  <Row>
                    <Col>
                      <div className="mt-2 mx-3 mb-2" id="text-full">
                        {parse(result.description)}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="tab-slider--body" id="detail-info-book">
                <h5>Thông Tin Chi Tiết</h5>
                <div className="row justify-content-between">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-sm-2">
                    <ul className="list-info-book-pay">
                      <li>
                        <span>Tác giả:</span>
                        <Link
                          to={`/a${result.author.id}/${result.author.slug}`}
                        >
                          {result.author.name}
                        </Link>
                      </li>
                      <li>
                        <span>Nhà phát hành:</span>
                        <Link to="#">{result.supplier}</Link>
                      </li>
                      <li>
                        <span>Khối lượng:</span>
                        <span>{`${result.weight} gam`}</span>
                      </li>
                      <li>
                        <span>Định dạng:</span>
                        <span>{result.format}</span>
                      </li>
                      <li>
                        <span>Năm phát hành:</span>
                        <span>{result.release_date}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-sm-2">
                    <ul className="list-info-book-pay">
                      <li>
                        <span>Nhà xuất bản:</span>
                        <Link to="#">{result.publisher}</Link>
                      </li>
                      <li>
                        <span>Mã Sản phẩm:</span>
                        <span>{result.code}</span>
                      </li>
                      <li>
                        <span>Ngôn ngữ:</span>
                        <span>{result.language}</span>
                      </li>
                      <li>
                        <span>Kích thước:</span>
                        <span>{result.size}</span>
                      </li>
                      <li>
                        <span>Số trang:</span>
                        <span>{result.num_pages}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="tab-slider--body" id="review-book">              
                <Raiting data={result}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoDetailBook;
