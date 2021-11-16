import PropTypes from "prop-types";
import React from "react";
import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

View.propTypes = {
  data: PropTypes.object,
};
View.defaultProps = {
  data: null,
};

function View(props) {
  const { modal, setModal, arrChoose, onUpdateClick, onDeleteClickShip } =
    props;
  const toggle = () => setModal(!modal);

  const handelDeleteShip = (id) => {
    if (onDeleteClickShip) onDeleteClickShip(id);
  };

  const handleUpdateStatus = (id, status) => {
    if (onUpdateClick) onUpdateClick(id, status);
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Xem chi tiết đơn hàng
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="12">
            <Table borderless>
              <tbody>
                <tr>
                  <th scope="row">Tên</th>
                  <td>{arrChoose ? arrChoose.name : null}</td>
                </tr>
                <tr>
                  <th scope="row">Số điện thoại</th>
                  <td>{arrChoose ? arrChoose.phone : null}</td>
                </tr>
                <tr>
                  <th scope="row">Địa chỉ</th>
                  <td>{arrChoose ? arrChoose.address : null}</td>
                </tr>
                <tr>
                  <th scope="row">Ghi chú</th>
                  <td>{arrChoose ? arrChoose.note : null}</td>
                </tr>
                {arrChoose ? (
                  <tr>
                    <th scope="row">Trạng thái đơn</th>
                    {Number(arrChoose.status) === 3 ? (
                      <td>
                        <Badge color="light">Đang vận chuyển</Badge>
                      </td>
                    ) : null}
                    {Number(arrChoose.status) === 4 ? (
                      <td>
                        <Badge color="success">Hoàn thành</Badge>
                      </td>
                    ) : null}
                  </tr>
                ) : null}
                <tr>
                  <th scope="row">Thời gian tạo</th>
                  <td>{arrChoose ? arrChoose.created_at : null}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th colSpan="6">Chi tiết đơn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">#</th>
                  <th scope="row">Tên sách</th>
                  <th scope="row">Số lượng</th>
                  <th scope="row">Giá khuyến mãi</th>
                  <th scope="row">Giá gốc</th>
                  <th scope="row">Tổng cộng</th>
                </tr>
                {arrChoose && typeof arrChoose.items !== "undefined"
                  ? arrChoose.items.map((val, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td style={{ minWidth: "200px" }}>{val.book}</td>
                          <td>{val.quantity}</td>
                          <td>
                            {Number(val.sale_price).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>
                            {Number(val.unit_price).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>
                            {(
                              Number(val.sale_price) * Number(val.quantity)
                            ).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                        </tr>
                      );
                    })
                  : null}
                <tr>
                  <th scope="row" colSpan="5">
                    Phí vận chuyển
                  </th>
                  <td>
                    {arrChoose && typeof arrChoose.shipping_fee !== "undefined"
                      ? Number(arrChoose.shipping_fee).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : null}
                  </td>
                </tr>
                <tr>
                  <th scope="row" colSpan="5">
                    Tổng thành tiền
                  </th>
                  <td>
                    <h5>
                      {arrChoose &&
                      typeof arrChoose.shipping_fee !== "undefined"
                        ? Number(arrChoose.total_payment).toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )
                        : null}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {arrChoose ? (
          <Row>
            <Col
              md="12"
              className="d-flex align-items-center justify-content-end "
            >
              <>
                {Number(arrChoose.status) === 4 ||
                Number(arrChoose.status) === 5 ? null : (
                  <>
                    <Button
                      color="danger"
                      className="mr-2"
                      onClick={() => handelDeleteShip(arrChoose.id)}
                    >
                      Giao hàng thất bại
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => handleUpdateStatus(arrChoose.id, 4)}
                    >
                      Hoàn tất đơn hàng
                    </Button>
                  </>
                )}
              </>
            </Col>
          </Row>
        ) : null}
      </ModalBody>
    </Modal>
  );
}

export default View;
