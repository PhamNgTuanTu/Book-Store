import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

function HeaderLogo(props) {
  return (
    <header>
      <div className="container menu-in-mobile">
        <Row>
          <Col
            md="12"
            className="d-flex align-items-center justify-content-center"
          >
            <Link to="/">
              <img
                className="img-cart"
                src={window.location.origin + "/assets/images/logo/logo.png"}
                alt="loading ..."
              />
            </Link>
          </Col>
        </Row>
      </div>
    </header>
  );
}

export default HeaderLogo;
