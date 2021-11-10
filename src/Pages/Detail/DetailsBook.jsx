import parse from "html-react-parser";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import ModalCart from "../Cart/ModalCart";

function DetailBook(props) {
  const viewAdd = (e) => {
    e.preventDefault();
    var width = document.querySelector(
      "#container-tile .list-tittle a:nth-child(1)"
    ).offsetWidth;
    $("#container-tile .slider").css({
      left: 0,
      width: width,
    });
    $("#container-tile .list-tittle a").removeClass("active");
    $("#add-active").addClass("active");
    $(".tab-slider--body").hide();
    $(".tab-slider--body:first").show();
    $("html, body").animate(
      {
        scrollTop: $("#introduce-book").offset().top - 200,
      },
      700
    );
  };
  function percentage(num, per) {
    return (num / 100) * per;
  }
  var { result } = props;

  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [activeAlert, setActiveAlert] = useState(0);
  const [mes, setMes] = useState("");

  const toggleAlert = () => {
    setModalAlert(!modalAlert);
    setMes("Sách đã hết hàng !");
    setActiveAlert(1);
  };

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalAlert) {
        setModalAlert(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [modalAlert]);

  return (
    <>
      <section className="detail-book">
        <div className="container pb-0-mobile">
          <div className="row background-pc justify-content-lg-around">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 order-0-pc background-mobile ">
              <div className="book-img">
                <div className="book-inner">
                  <div
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API_URL}/images/${result.image.front_cover})`,
                    }}
                    className="front face"
                  />
                  <div className="side">
                    <span id="text-side">{result.name}</span>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API_URL}/images/${result.image.back_cover})`,
                    }}
                    className="back face"
                  />
                </div>
                <div className="note">
                  <span>* Nhấp Vào Sản Phẩm Để Xem Chi Tiết</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 order-2-pc order-1-tablet background-mobile">
              <div className="box-pay">
                <div className="detail-book__pay-info">
                  <h5>Thông Tin Thanh Toán</h5>
                </div>
                <div className="detail-book__pay-info-content">
                  <div className="pay-info-content-price1">
                    <span>Giá Bìa : </span>
                    <span>
                      {Number(result.unit_price).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="pay-info-content-price2">
                    <span>Giá Bán : </span>
                    <span>
                      {(
                        result.unit_price -
                        percentage(result.unit_price, result.discount)
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="pay-info-content-price3">
                    <span>Tiết Kiệm : </span>
                    <div className="pay-info-content-price3-right">
                      <span>
                        {percentage(
                          result.unit_price,
                          result.discount
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="text-in-brackets">
                        {result.discount}%
                      </span>
                    </div>
                  </div>
                  <div className="pay-info-content-quality">
                    <span>Chất Lượng Sách : </span>
                    <div className="pay-info-content-quality-right position-relative caption-hover">
                      <span className="quality-A">
                        Loại A
                        <i className="fas fa-question-circle">
                          <div className="caption">
                            <p>
                              Sách mới 100% do từ NXB hoặc Nhà Phát Hành chuyển
                              qua
                            </p>
                            <Link to="#">Chi tiết </Link>
                          </div>
                        </i>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="detail-book__pay-now"
                  style={
                    Number(result.quantity) === 0 ? { color: "red" } : null
                  }
                >
                  <div className="detail-book__service-list-item detail-book__pay-now-end">
                    <i
                      className={
                        Number(result.quantity) === 0
                          ? "far fa-times-circle"
                          : "fas fa-check-circle"
                      }
                      style={
                        Number(result.quantity) === 0 ? { color: "red" } : null
                      }
                    />
                    <p>
                      {Number(result.quantity) > 0
                        ? `Còn ${result.quantity} sản phẩm`
                        : " HẾT HÀNG"}
                    </p>
                  </div>
                  {Number(result.quantity) > 0 ? (
                    <button
                      className="btn btn-effect btn-1 btn-add-cart"
                      onClick={toggle}
                    >
                      <i className="fas fa-shopping-cart" /> Thêm vào giỏ hàng
                    </button>
                  ) : (
                    <button
                      className="btn btn-effect btn-2 btn-add-cart"
                      onClick={toggleAlert}
                    >
                      <i className="far fa-times-circle" /> Tạm hết hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mt-30-mobile order-1-pc">
              <div className="detail-book__info">
                <div className="detail-book__name">
                  <h3>{result.name}</h3>
                </div>
                <div className="detail-book__author">
                  <span>Tác giả : </span>
                  <Link
                    to={`/a${result.author.id}/${result.author.slug}`}
                    style={{ color: "#0062cc !important" }}
                  >
                    {result.author.name}
                  </Link>
                </div>
                <div className="detail-book__publishing-company">
                  <span>Nhà xuất bản : </span>
                  <Link to="#">{result.publisher}</Link>
                </div>
                <div className="detail-book__release-company">
                  <span>Nhà phát hành : </span>
                  <Link to="#">{result.supplier}</Link>
                </div>
                <div className="detail-book__content">
                  <div id="desc_content">{parse(result.description)}</div>
                  <Link
                    to=""
                    id="view-add"
                    className="a-not-link"
                    onClick={viewAdd}
                  >
                    Xem thêm
                    <i className="fas fa-angle-double-right ml-1" />
                  </Link>
                </div>
              </div>
              <div
                className="detail-book__service big wow fadeInUp animated"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="detail-book__service-tittle">
                  <h5>Thông tin kèm theo</h5>
                </div>
                <div className="detail-book__service-list">
                  <div className="detail-book__service-list-item">
                    <i className="fas fa-check-circle" />
                    <p>
                      Có dịch vụ kèm theo bọc sách plastic cao cấp cho sách này
                    </p>
                  </div>
                  <div className="detail-book__service-list-item">
                    <i className="fas fa-check-circle" />
                    <p>
                      Hỗ trợ đổi trả sách trong 7 ngày nếu có lỗi từ nhà sản
                      xuất
                    </p>
                  </div>
                  <div className="detail-book__service-list-item">
                    <i className="fas fa-check-circle" />
                    <p>Hỗ trợ dịch vụ gói quà</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalCart
        modal={modal}
        setModal={setModal}
        data={result}
        setModalAlert={setModalAlert}
        setMes={setMes}
        setActiveAlert={setActiveAlert}
      />
      <Alert
        color={activeAlert === 1 ? "warning" : "success"}
        isOpen={modalAlert}
        toggle={toggleAlert}
        className="modal-alert big wow fadeInRight animated"
        data-wow-duration="0.3s"
      >
        {mes}
      </Alert>
    </>
  );
}

export default DetailBook;
