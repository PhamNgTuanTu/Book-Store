import React from "react";
import { Link } from "react-router-dom";

Breadcrumb.propTypes = {};

function Breadcrumb(props) {
  var { result, loading } = props;
  const refreshPage = () => {
    window.location.reload();
  };
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
                  {window.innerWidth > 479 ? " Trang chủ" : ""}
                </Link>
              </li>
              <li>
                <Link to="#" onClick={refreshPage}>
                  <i
                    className="fas fa-file-invoice"
                    style={{ marginRight: 5 }}
                  />
                  {window.innerWidth > 479 ? " Thông tin" : ""}
                </Link>
              </li>
              <li>
                <Link
                  to="/trang-ca-nhan"
                  onClick={refreshPage}
                  style={{ marginRight: 5 }}
                >
                  <i className="fas fa-user" />
                  <p className={window.innerWidth > 479 ? "" : "ml-0"}>
                    {loading ? "Đang tải ..." : result.name}
                  </p>
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
