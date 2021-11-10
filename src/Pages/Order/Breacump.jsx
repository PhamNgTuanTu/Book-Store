import React from "react";
import { Link } from "react-router-dom";

Breadcrumb.propTypes = {};

function Breadcrumb(props) {
  return (
    <section className="breadcrumb-cate">
      <div className="container">
        <div className="row">
          <div className="col-12 p-0">
            <ul id="breadcrumb">
              <li>
                <Link to="/">
                  <i
                    className="fa fa-home"
                    aria-hidden="true"
                    style={{ marginRight: 5 }}
                  />
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/xem-hoa-don">
                  <i
                    className="fas fa-file-invoice"
                    style={{ marginRight: 5 }}
                  />
                  Thông tin hóa đơn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;
