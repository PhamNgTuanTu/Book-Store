import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import ModalCart from "../Cart/ModalCart";

function percentage(num, per) {
  return (Number(num) / 100) * Number(per);
}
function BookIsDisCount(props) {
  const { data, loading } = props;

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
      {loading ? (
        <section className="book-of-author">
          <div className="container">
            <div className="row">
              <div className="col-12 px-0">
                <div className="main-book-update mt-4">
                  <h4
                    className="tittle big wow jello animated"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                    data-wow-iteration={3}
                  >
                    Sách Đang Khuyến Mãi
                  </h4>
                  <div className="main-book-update-detail">
                    <div
                      className="card-product is-loading d-flex p-0"
                      style={{ height: "250px" }}
                    >
                      <div className="border-radius-left d-flex align-items-center justify-content-center col-lg-4 col-md-4 col-sm-6 author-detail-img background-color h-100">
                        <div
                          className="image-product"
                          style={{ width: "65%", height: "180px" }}
                        ></div>
                      </div>
                      <div className="border-radius-right col-lg-8 col-md-12 col-sm-12 background-color">
                        <div className="author-detail-title">
                          <div className="content-product">
                            <span></span>
                            <p style={{ height: "100px" }}></p>
                            <p></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="book-of-author">
          <div className="container">
            <div className="row">
              <div className="col-12 px-0">
                <div className="main-book-update mt-4">
                  <h4
                    className="tittle big wow jello animated"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                    data-wow-iteration={3}
                  >
                    Sách Đang Khuyến Mãi
                  </h4>
                  {JSON.stringify(data) !== "[]"
                    ? data.map((val, i) => {
                        return (
                          <div className="main-book-update-detail" key={i}>
                            <div className="book-update__content">
                              <img
                                src={`${process.env.REACT_APP_API_URL}/images/${val.image.front_cover}`}
                                alt={val.name}
                                height="210px"
                                width="auto"
                              />
                              <div className="book-update__content-description pt-4">
                                <div className="book-update__content-title">
                                  <Link to={`/chi-tiet/${val.slug}-i${val.id}`}>
                                    {val.name}
                                  </Link>
                                  <h5>{val.author.name}</h5>
                                  <div id="desc_content">
                                    {parse(val.description)}
                                  </div>
                                </div>
                                <div className="book-update__content-price">
                                  <div className="content-price_sale">
                                    {Number(val.discount > 0) ? (
                                      <span className="discount">
                                        -{val.discount}%
                                      </span>
                                    ) : null}
                                    <span>
                                      {Number(val.unit_price).toLocaleString(
                                        "it-IT",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </span>
                                    <span>
                                      {(
                                        Number(val.unit_price) -
                                        percentage(val.unit_price, val.discount)
                                      ).toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </span>
                                  </div>
                                  <Button color="primary" onClick={toggle} className="mr-lg-4">
                                    Mua Ngay
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <ModalCart
        modal={modal}
        setModal={setModal}
        data={JSON.stringify(data) !== "[]" && data.length > 0 ? data[0] : null}
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

export default BookIsDisCount;
