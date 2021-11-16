import React, { useEffect, useState } from "react";
import { useCart } from "react-hook-cart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  PopoverBody,
  Row,
  UncontrolledPopover,
} from "reactstrap";
import Swal from "sweetalert2";
import userApi from "../../Api/userApi";
import { logout } from "../../store/user";
import modalError from "../Modal/Error";
import LoginAndSignup from "./Login";

function Header(props) {
  const ditpatch = useDispatch();
  const history = useHistory();
  const { totalUniqueItems, items, totalCost, removeItem } = useCart();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const navMenu = document.querySelector(".nav-menu");
  const mediaSize = 991;
  const [isDisplay, setIsDiplay] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalUser, setModalUser] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleUser = () => setModalUser(!modalUser);

  const [isDisplayloading, setIsDisplayloading] = useState(false);
  const { dataTheLoai, dataTacGia } = useSelector((state) => ({
    dataTheLoai: state.home.dataMenuTheLoai,
    dataTacGia: state.home.dataMenuTacGia,
  }));

  const showSubMenus = (submenus) => {
    var result = null;
    if (submenus.length > 0) {
      result = submenus.map((submenu, index) => {
        return (
          <li key={index} className="menu-item">
            <Link title={submenu.name} to={`/c${submenu.id}/${submenu.slug}`}>
              {submenu.name}
            </Link>
          </li>
        );
      });
    }
    return result;
  };
  const showAuthors = (authors) => {
    var result = null;
    if (authors.length > 0) {
      result = authors.map((author, index) => {
        return (
          <li key={index} className="menu-item">
            <Link title={author.name} to={`/a${author.id}/${author.slug}`}>
              {author.name}
            </Link>
          </li>
        );
      });
    }
    return result;
  };
  const onClickMenu = (e) => {
    e.preventDefault();
    setIsDiplay(!isDisplay);
    document.body.classList.toggle("hidden-scrolling");
  };
  const onClickNav = (e) => {
    if (
      e.target.hasAttribute("data-toggle") &&
      window.innerWidth <= mediaSize
    ) {
      // ngăn chặn nhấp chuột
      e.preventDefault();
      const menuItemHasChildren = e.target.parentElement;
      // nếu menuItemHasChildren được mở ra, thì đóng
      if (menuItemHasChildren.classList.contains("active")) {
        collapseSubMenu();
      } else {
        // thu gọn menu mở rộng hiện có
        if (navMenu.querySelector(".menu-item-has-children.active")) {
          collapseSubMenu();
        }
        // mở rộng menu mới
        menuItemHasChildren.classList.add("active");
        const subMenu = menuItemHasChildren.querySelector(".sub-menu");
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";
      }
    }
  };
  const collapseSubMenu = () => {
    navMenu
      .querySelector(".menu-item-has-children.active .sub-menu")
      .removeAttribute("style");
    navMenu
      .querySelector(".menu-item-has-children.active")
      .classList.remove("active");
  };

  const funtionLogout = async () => {
    setIsDisplayloading(true);
    try {
      const response = await userApi.logOut();
      ditpatch(logout(response));
      setIsDisplayloading(false);
      setModalUser(false);
    } catch (error) {
      if (error.response.status === 422) {
        setIsDisplayloading(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 409) {
        setIsDisplayloading(false);
        modalError(error.response.data.message);
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Bạn Có Chắc Muốn Thoát ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, Vẫn Tiếp Tục",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        funtionLogout();
      }
    });
  };

  const handlePush = () => {
    history.push("/gio-hang");
  };

  const handelRemove = (id) => {
    removeItem(id);
  };

  useEffect(() => {
    setModal(false);
    return () => {
      setModal(false);
    };
  }, [pathname]);

  return (
    <header className="header">
      {isDisplayloading ? (
        <div id="preloder">
          <div className="loader" />
        </div>
      ) : (
        <div></div>
      )}

      <div className="container menu-in-mobile">
        <div className="header-main">
          <div className="logo">
            <Link to="/">
              <img
                className="box-logo-user"
                src={window.location.origin + "/assets/images/logo/logo.png"}
                alt="loading ..."
              />
            </Link>
          </div>
          <div className="menu-mini-mobile">
            <div className="menu-mini-mobile__left">
              <div className="open-nav-menu" onClick={onClickMenu}>
                <span />
              </div>
              <div
                className={isDisplay ? "menu-overlay active" : "menu-overlay"}
                onClick={onClickMenu}
              />
            </div>
            <div className="container-nav">
              <nav
                className={isDisplay ? "nav-menu open" : "nav-menu"}
                onClick={onClickNav}
              >
                <div className="close-nav-menu" onClick={onClickMenu}>
                  <img
                    src={
                      window.location.origin + "/assets/images/icon/close.svg"
                    }
                    alt="close"
                  />
                </div>
                <ul className="menu">
                  <li className="menu-item">
                    <Link to="/">Trang Chủ</Link>
                  </li>
                  <li className="menu-item d-lg-none d-xl-none">
                    <Link to="/trang-ca-nhan">Trang Cá Nhân</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/sach-ban-chay">Sách Bán Chạy</Link>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <Link
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-toggle="sub-menu"
                    >
                      Thể Loại <i className="plus" />
                    </Link>
                    <ul className="sub-menu">{showSubMenus(dataTheLoai)}</ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <Link
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-toggle="sub-menu"
                    >
                      Tác Giả <i className="plus" />
                    </Link>
                    <ul className="sub-menu">{showAuthors(dataTacGia)}</ul>
                  </li>
                </ul>
              </nav>
              {/* //navigation menu */}
              {/* giỏ hàng & login */}
              <div className="header-logo__right">
                {window.innerWidth > 479 ? (
                  <div
                    className={
                      JSON.stringify(items) !== "[]" && items.length > 0
                        ? "shopping-cart active-animation-cart active-scroll-shopping"
                        : "shopping-cart"
                    }
                    id="focusCart"
                  >
                    <a href="#!" className="icon-cart-a">
                      <i className="fas fa-shopping-cart" />
                      {/* thông báo giỏ hàng */}
                      {totalUniqueItems > 0 ? (
                        <span>{totalUniqueItems}</span>
                      ) : null}

                      {/* //thông báo giỏ hàng */}
                    </a>
                  </div>
                ) : (
                  <div
                    className="shopping-cart "
                    id="focusCart"
                    onClick={() => history.push("/gio-hang")}
                  >
                    <a href="#!" className="icon-cart-a">
                      <i className="fas fa-shopping-cart" />
                      {/* thông báo giỏ hàng */}
                      {totalUniqueItems > 0 ? (
                        <span>{totalUniqueItems}</span>
                      ) : null}

                      {/* //thông báo giỏ hàng */}
                    </a>
                  </div>
                )}
                <>
                  {window.innerWidth > 479 ? (
                    <div className="header-login">
                      {/* đăng nhập */}
                      <div className="login-logout">
                        {user?.token ? (
                          <div className="ic-user-same">
                            <i
                              className="fas fa-user-circle box-icon-user"
                              onClick={toggleUser}
                            ></i>
                            <div
                              className={
                                modalUser
                                  ? "user-same-sub active-user-same-sub "
                                  : "user-same-sub "
                              }
                            >
                              <Card outline color="info">
                                <CardBody className="p-0">
                                  <Row>
                                    <Col>
                                      <div className="w-100 sub-li">
                                        <Link
                                          to="/trang-ca-nhan"
                                          className="text-color"
                                        >
                                          <i
                                            className="fa fa-user-circle mr-2"
                                            aria-hidden="true"
                                          ></i>
                                          Thông tin cá nhân
                                        </Link>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div className="w-100 sub-li">
                                        <Link
                                          to="/xem-don-hang"
                                          className="text-color"
                                        >
                                          <i className="far fa-list-alt mr-2"></i>
                                          Xem đơn hàng
                                        </Link>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div className="w-100 sub-li sub-li3">
                                        <Link
                                          to="#"
                                          onClick={handleLogout}
                                          className="text-color"
                                        >
                                          <i
                                            className="fa fa-power-off mr-2"
                                            aria-hidden="true"
                                          ></i>
                                          Đăng xuất
                                        </Link>
                                      </div>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </div>
                            {modalUser ? (
                              <div
                                className="turn-menu"
                                onClick={toggleUser}
                              ></div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="ic-user-same">
                            <span
                              onClick={toggle}
                              className="text-login cur-pointer"
                            >
                              Đăng nhập/ đăng ký
                            </span>
                          </div>
                        )}
                      </div>
                      {/* //đăng nhập */}
                    </div>
                  ) : (
                    <>
                      {user?.token ? (
                        <div className="header-login">
                          {/* đăng nhập */}
                          <div className="login-logout">
                            <Link to="/trang-ca-nhan" className="text-color">
                              <div className="ic-user-same">
                                <i className="fas fa-id-card"></i>
                              </div>
                            </Link>
                          </div>
                          {/* //đăng nhập */}
                        </div>
                      ) : (
                        <div className="header-login" onClick={toggle}>
                          {/* đăng nhập */}
                          <div className="login-logout">
                            <div className="ic-user-same">
                              <i className="fas fa-id-card"></i>
                            </div>
                          </div>
                          {/* //đăng nhập */}
                        </div>
                      )}
                    </>
                  )}
                </>
              </div>
              {/* //giỏ hàng & login */}
            </div>
          </div>
        </div>
      </div>
      <LoginAndSignup
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        setModalUser={setModalUser}
      />
      <UncontrolledPopover
        placement="left"
        target="focusCart"
        trigger="click"
        className="hide-cart-mobile"
      >
        <PopoverBody>
          <div className="body-cart-modal">
            <div className="container-cart">
              {items.map((val, i) => {
                return (
                  <div key={i} style={{ borderBottom: "1px dashed #1e2832" }}>
                    <Row className="row-cart-small position-relative m-0">
                      <Col
                        md="10"
                        className="d-flex align-items-center pt-2 pb-2 px-0"
                      >
                        <img
                          className="pl-2"
                          style={{
                            height: "50px",
                            maxWidth: "40px",
                            objectFit: "cover"
                          }}
                          src={`${process.env.REACT_APP_API_URL}/images/${val.image}`}
                          alt={val.name}
                        />
                        <div className="pl-2">
                          <span className="name-dots-cart">{val.name}</span>
                          <span>{`${val.quantity} x ${val.price.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}`}</span>
                        </div>
                      </Col>
                      <div
                        className="ic-remove-items"
                        onClick={() => handelRemove(val.id)}
                      >
                        <i className="far fa-times-circle" />
                      </div>
                    </Row>
                  </div>
                );
              })}
            </div>
            {JSON.stringify(items) !== "[]" && items.length > 0 ? (
              <Row className="mt-3">
                <Col
                  md="6"
                  className="d-flex align-items-center justify-content-center"
                >
                  <h5 className="mr-2">
                    Tổng cộng:{" "}
                    <strong>
                      {totalCost.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </h5>
                </Col>
                <Col
                  md="6"
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button color="success" onClick={handlePush}>
                    Xem giỏ hàng
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="p-4">
                  <h5>Giỏ hàng rỗng</h5>
                </Col>
              </Row>
            )}
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </header>
  );
}

export default Header;
