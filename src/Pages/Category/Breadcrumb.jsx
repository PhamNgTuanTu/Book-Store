import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb(props) {
  const { data, loading } = props;
  return (
    <section className="breadcrumb-cate">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {data ? (
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
                  <Link to={`/c${data.id}/${data.slug}`}>
                    <i className="fas fa-align-center" />
                    <span style={{ marginLeft: 10 }}> Thể Loại</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/c${data.id}/${data.slug}`}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="fas fa-book" />
                    <span style={{ marginLeft: 10 }}>
                      {data.name && !loading ? data.name : "Đang tải ..."}
                    </span>
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;
