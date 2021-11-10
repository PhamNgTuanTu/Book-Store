import React from "react";
import { Col } from "reactstrap";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row mt-3">
          <Col lg="6" md="12" sm="12">
            <h4 className="color-title d-flex align-items-center justify-content-center">
              Kết nối với chúng tôi
            </h4>
            <ul className="d-flex align-items-center justify-content-center">
              <li className="m-2 ic-footer">
                <a href="https://www.facebook.com/profile.php?id=100008627523436">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="m-2 ic-footer">
                <a href="https://www.messenger.com/t/100008627523436">
                  <i className="fab fa-facebook-messenger"></i>
                </a>
              </li>
              <li className="m-2 ic-footer">
                <a href="mailto:staciabook@gmail.com">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
              <li className="m-2 ic-footer">
                <a href="https://zalo.me/0937329048">
                  <img
                    className="img-zl"
                    src={
                      window.location.origin + "/assets/images/icon/zalo.png"
                    }
                    alt="Đang tải ..."
                    height="30px"
                  />
                </a>
              </li>
            </ul>
            <div className="book-shop-permision">
              <h2>
                <a href="http://online.gov.vn/?AspxAutoDetectCookieSupport=1">
                  book-shop
                </a>
              </h2>
            </div>
          </Col>
          <Col lg="6" md="12" sm="12">
            <div className="customer-book-shop">
              <h3 className="color-title">Chăm Sóc Khách Hàng</h3>
              <p style={{ lineHeight: 1.5, paddingBottom: 1.2 }}>
                Hotline:{" "}
                <a className="phone-tag text-color" href="tel:0937329048">
                  0937329048
                </a>
                <br />
                Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết)
                <br />
                Email hỗ trợ:{" "}
                <a href="mailto:staciabook@gmail.com">staciabook@gmail.com</a>
              </p>
            </div>
          </Col>
        </div>
        <div className="row m-0 background-color background-footer">
          <div
            className="
        mt-3
        p-0
        col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
      "
          >
            <div className="footer-book-shop-address">
              <div className="book-shop-address-content">
                <div className="logo-footer-book-shop">&nbsp;</div>
                <div className="text-book-shop-address">
                  <h3 className="color-title">
                    Website Kinh Doanh Sách Hàng Đầu Việt Nam
                  </h3>
                  <p>
                    Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 08/06/2021,
                    đăng ký thay đổi lần thứ 1 ngày 08/06/2021, cấp bởi Sở KHĐT
                    thành phố Hồ Chí Minh.
                  </p>
                  <p>
                    Địa Chỉ:&nbsp;Tầng 2, Số 355 TL.10, P.An Lạc A, Q.Bình Tân,
                    TPHCM.
                  </p>
                  <p>COPYRIGHT 2021 BY TÚ VÀ TRÍ .</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
