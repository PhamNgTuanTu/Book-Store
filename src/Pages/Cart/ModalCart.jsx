import React from "react";
import { useCart } from "react-hook-cart";
import { Button, Col, Modal, ModalBody, Row } from "reactstrap";

ModalCart.propTypes = {};
function percentage(num, per) {
  return (Number(num) / 100) * Number(per);
}
function ModalCart(props) {
  const { modal, setModal, data, setModalAlert, setMes, setActiveAlert } =
  props;

  const { addItem } = useCart();
  const toggle = () => {
    setModal(!modal);
  };

  const priceBooks = (data) => {
    let total = 0;
    if (data) {
      let disCount = percentage(data.unit_price, data.discount);
      let priceUnit = data.unit_price;
      total = Number(priceUnit) - Number(disCount);
    }
    return Number(total);
  };

  const themVaoGio = () => {
    const arString = data.size && data.size.split(" ");
    const getHeight = arString.slice(0, 1)[0];
    const getWidth = arString.slice(-2)[0];
    addItem({
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: priceBooks(data),
      unit_price: Number(data.unit_price),
      image: data.image.front_cover,
      weight: Number(data.weight),
      height: Number(getHeight),
      width: Number(getWidth),
      length: 10,
    });
    setModal(false);
    setActiveAlert(2);
    setModalAlert(true);
    setMes("Thêm vào giỏ hàng thành công");
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered={true}
        contentClassName={
          data && Number(data.quantity) > 0 ? "cart-modal" : "cart-modal-warning"
        }
      >
        <ModalBody className="p-0">
          <button className="close-cart-modal" onClick={toggle}>
            <span aria-hidden="true">×</span>
          </button>
          <div
            className={
              data && Number(data.quantity) > 0
                ? "header-cart-modal"
                : "header-cart-modal-warning"
            }
          >
            {data && Number(data.quantity) > 0 ? (
              <span>Thêm sách vào giỏ hàng</span>
            ) : (
              <span>Sách tạm hết hàng</span>
            )}
          </div>
          <div className="body-cart-modal">
            <Row>
              <Col
                md="8"
                className="mt-3 mb-3 d-flex align-items-center justify-content-between"
              >
                <img
                  style={{ height: "100px", width: "auto" }}
                  src={`${process.env.REACT_APP_API_URL}/images/${data && data.image.front_cover}`}
                  alt={data && data.name}
                />
                <span className="pl-2">{data && data.name}</span>
              </Col>
              <Col
                md="4"
                className="d-flex align-items-center justify-content-end"
              >
                <div className="mr-3">
                  <span>{`${1} x ${priceBooks(data && data).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="footer-cart">
                  <h5 className="mr-2">
                    Tổng tạm tính:{" "}
                    <strong>
                      {Number(1 * priceBooks(data && data)).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="footer-cart-btn">
                  <span className="ml-2 footer-cart-continue" onClick={toggle}>
                    Tiếp tục mua hàng
                  </span>
                  {Number(data && data.quantity) > 0 ? (
                    <Button
                      color="success"
                      className="mr-2"
                      onClick={themVaoGio}
                    >
                      Thêm vào giỏ
                    </Button>
                  ) : (
                    <Button color="warning" className="mr-2" onClick={toggle}>
                      Đóng
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalCart;
