import React, { useEffect, useState } from "react";
import { useCart } from "react-hook-cart";
import { MetaTags } from "react-meta-tags";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import Footer from "../../components/Layout/Footer";
import HeaderLogo from "../../components/Layout/HeaderLogo";
import Info from "../../components/Layout/Info";
import LoginAndSignup from "../../components/Layout/Login";

Cart.propTypes = {};

function Cart(props) {
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

  const history = useHistory();
  const {
    totalItems,
    items,
    totalCost,
    removeItem,
    updateItemQuantity,
    clearCart,
  } = useCart();
  const { user } = useSelector((state) => state.user);
  const [modalAlert, setModalAlert] = useState(false);

  const toggleSubtrac = (id, sl) => {
    updateItemQuantity(id, sl - 1);
  };

  const toggleSum = (id, sl) => {
    updateItemQuantity(id, sl + 1);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleAlert = () => {
    setModalAlert(!modalAlert);
  };

  const handleContinue = () => {
    if (user?.token) {
      history.push("/dat-hang");
    } else {
      setModalAlert(true);
      setModal(true);
    }
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
      <MetaTags>
        <title>StaciaBook - Giỏ hàng</title>
      </MetaTags>
      <div>
        <div className="scroll-top" />
        <div id="progressbar" style={mystyle} />
        <div id="scrollPath" />
      </div>
      <Info />
      <HeaderLogo />
      <section className="grid-product mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {JSON.stringify(items) !== "[]" && items.length > 0 ? (
                <>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                      <h5>
                        <strong className="title-cart">GIỎ HÀNG</strong>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <Card body color="primary" outline>
                        <Row>
                          <Col>
                            <h6>Danh Sách Sản Phẩm</h6>
                          </Col>
                        </Row>
                        {items.map((val, i) => {
                          return (
                            <Row className="mt-3" key={i}>
                              <Col md="8">
                                <Row>
                                  <Col md="4" className="pr-0">
                                    <div className="d-flex align-items-center justify-content-center">
                                      <img
                                        style={{
                                          height: "150px",
                                          width: "auto",
                                        }}
                                        src={`${process.env.REACT_APP_API_URL}/images/${val.image}`}
                                        alt={val.name}
                                      />
                                    </div>
                                  </Col>
                                  <Col md="8">
                                    <div className="">
                                      <Link to={`/chi-tiet/${val.slug}-i${val.id}`}>{val.name}</Link>
                                      <div className="w-100">
                                        <hr className="main-hr" />
                                        <div className="d-flex align-items-center justify-content-start">
                                          <Button
                                            color="info"
                                            onClick={() =>
                                              toggleSubtrac(
                                                val.id,
                                                val.quantity
                                              )
                                            }
                                            disabled={
                                              Number(val.quantity) === 1
                                                ? true
                                                : false
                                            }
                                          >
                                            -
                                          </Button>
                                          <div className="mx-4">
                                            <span>{val.quantity}</span>
                                          </div>
                                          <Button
                                            color="info"
                                            onClick={() =>
                                              toggleSum(val.id, val.quantity)
                                            }
                                          >
                                            +
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                              <Col md="4">
                                <div className="d-flex align-items-center justify-content-end h-100">
                                  <span>{`${
                                    val.quantity
                                  } x ${val.price.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}`}</span>
                                  <span className="ml-2">
                                    <i
                                      className="fas fa-trash-alt"
                                      onClick={() => handleRemoveItem(val.id)}
                                    ></i>
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          );
                        })}
                        <Row className="mt-3">
                          <Col className="d-flex align-items-center justify-content-end">
                            <Button
                              color="danger"
                              outline
                              onClick={() => clearCart()}
                            >
                              Xóa tất cả
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col md="4" className="mt-3 mt-lg-0">
                      <Card color="success" outline style={{ border: "none" }}>
                        <CardHeader className="card-header-detail">
                          <h5>
                            <strong>Tóm tắt đơn hàng</strong>
                          </h5>
                        </CardHeader>
                        <CardBody className="card-body-border">
                          <Row>
                            <Col md="6">
                              <span>Số sản phẩm:</span>
                            </Col>
                            <Col md="6" style={{ textAlign: "end" }}>
                              <strong>{totalItems}</strong>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col md="5">
                              <span>Tạm tính:</span>
                            </Col>
                            <Col md="7" style={{ textAlign: "end" }}>
                              <strong>
                                {totalCost.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </strong>
                            </Col>
                          </Row>
                          <hr className="main-hr" />
                          <Row className="mt-3">
                            <Col md="12" style={{ textAlign: "center" }}>
                              <span className="mr-2">Tổng cộng:</span>
                              <strong className="color-total">
                                {totalCost.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </strong>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="d-flex align-items-center justify-content-center">
                    <Col md="6" className="mt-3">
                      <Button
                        color="secondary"
                        size="lg"
                        block
                        onClick={() => history.goBack()}
                      >
                        Quay lại
                      </Button>
                    </Col>
                    <Col md="6" className="mt-3">
                      <Button
                        color="success"
                        size="lg"
                        block
                        onClick={handleContinue}
                      >
                        Tiến hành đặt hàng
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                <Card body color="warning" outline>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                      <h3>Giỏ hàng rỗng !</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-end">
                      <Link to="#" className="return-home" onClick={() => history.goBack()}>
                        Quay lại
                      </Link>
                    </Col>
                  </Row>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
      <Alert
        color="warning"
        isOpen={modalAlert}
        toggle={toggleAlert}
        className="modal-alert modal-alert-cart big wow fadeInRight animated"
        data-wow-duration="0.3s"
      >
        Vui lòng đăng nhập để tiếp tục
      </Alert>
      <LoginAndSignup modal={modal} setModal={setModal} toggle={toggle} />
      <Footer />
    </>
  );
}

export default Cart;
