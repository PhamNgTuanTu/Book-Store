import React from "react";
import { MetaTags } from "react-meta-tags";
import Footer from "../../components/Layout/Footer";
import HeaderLogo from "../../components/Layout/HeaderLogo";
import Info from "../../components/Layout/Info";

GioiThieu.propTypes = {};

function GioiThieu(props) {
  return (
    <>
      <MetaTags>
        <title>StaciaBook - Giới thiệu StaciaBook</title>
      </MetaTags>
      <Info />
      <HeaderLogo />
      <section className="grid-product mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ol class="gradient-list">
                <li>
                  <h5>
                    Website hàng đầu trong việc cung cấp những tựa sách hay.
                  </h5>
                </li>
                <li>
                  <h5>
                    Cung cấp hệ thống mua bán sách online dễ dàng và nhanh
                    chóng.
                  </h5>
                </li>
                <li>
                  <h5>Liên tục cập nhật các loại sách mới.</h5>
                </li>
                <li>
                  <h5>Giao diện thanh thiện với người dùng.</h5>
                </li>
                <li>
                  <h5>Giao hàng nhanh chóng, tiết kiệm.</h5>
                </li>

                <li>
                  <h5>Nhân viên hỗ trợ 24/7</h5>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default GioiThieu;
