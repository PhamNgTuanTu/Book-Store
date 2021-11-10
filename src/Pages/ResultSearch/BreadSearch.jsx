import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb(props) {
  return (
    <section className="breadcrumb-cate">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul id="breadcrumb">
              <li>
                <Link to="/">
                  <i
                    className="fa fa-home"
                    aria-hidden="true"
                    style={{ marginRight: 10 }}
                  />
                  <span className="pgn-home" style={{ marginLeft: 10 }}>
                    Trang Chủ
                  </span>
                </Link>
              </li>
              <li>
                <Link to={`/ket-qua-tim-kiem`}>
                  <i className="fas fa-search" />
                  <span style={{ marginLeft: 10 }}> Tìm kiếm</span>
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
