import React, { useState } from "react";
import { useCart } from "react-hook-cart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Card, CardBody, Col, Row, Table } from "reactstrap";
import orderAPI from "../../Api/orderAPI";
import modalError from "../../components/Modal/Error";
import { setDataOrder, setLoadingOrder } from "../../store/order";

PaneAccess.propTypes = {};

function PaneAccess(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setActiveTab, dataFormSubmit } = props;
  const { items, totalCost, clearCart } = useCart();
  const { feeShip, dataOrder } = useSelector((state) => ({
    feeShip: state.address.feeShip,
    dataOrder: state.orders.data,
  }));

  const [loading, setLoading] = useState(false);

  const handelEnd = () => {
    history.push("/");
  };

  const handleSubmit = async () => {
    if (JSON.stringify(dataFormSubmit) !== "[]") {
      setLoading(true);
      try {
        const response = await orderAPI.postOrder(dataFormSubmit);
        console.log("response: ", response);
        dispatch(setDataOrder(response.data));
        dispatch(setLoadingOrder(false));
        setLoading(false);
        window.scrollTo(0, 0);
        clearCart();
      } catch (error) {
        if (error.response.status === 409) {
          modalError(error.response.data.message);
          setLoading(false);
        }
        setLoading(false);
      }
    }
  };

  return (
    <>
      {JSON.stringify(dataOrder) !== "[]" ? (
        <Card className="mt-4">
          <Row>
            <Col>
              <div className="loop-wrapper">
                <h2 className="text-center mt-3">Đặt hàng thành công !</h2>
                <h2 className="text-center">
                  <i
                    className="far fa-check-circle"
                    style={{ fontSize: "70px" }}
                  ></i>
                </h2>
                <div className="mountain"></div>
                <div className="hill"></div>
                <div className="tree"></div>
                <div className="tree"></div>
                <div className="tree"></div>
                <div className="rock"></div>
                <div className="truck"></div>
                <div className="wheels"></div>
              </div>
              <div className="text-center p-3">
                <span>
                  Chúng tôi đã tiếp nhận đơn hàng của bạn. Nhân viên của
                  StaciaBook sẽ sớm liên hệ với bạn để xác nhận đơn hàng.
                </span>
              </div>
              <div style={{ textAlign: "end", padding: "0 10px 10px 0" }}>
                <span>
                  <em>Hoặc liên hệ : </em>
                  <a className="phone-tag" href="tel:0937329048">
                    0937329048
                  </a>{" "}
                  -{" "}
                  <a className="email-tag" href="mailto:staciabook@gmail.com">
                    staciabook@gmail.com
                  </a>{" "}
                  <em>để được tư vấn</em>
                </span>
              </div>
              <div className="text-center p-3">
                <Button color="info" block onClick={handelEnd}>
                  Tiếp tục mua hàng
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Card body outline color="primary" className="mt-4">
          <h5>Xác nhận đặt hàng</h5>
          <CardBody>
            {JSON.stringify(items) !== "[]" && items.length > 0 ? (
              <>
                {JSON.stringify(dataFormSubmit) !== "[]" ? (
                  <Row>
                    <Col md="10">
                      <h6>
                        Tên khách hàng:{" "}
                        <strong className="ml-2">{dataFormSubmit.name}</strong>
                      </h6>
                      <h6>
                        Số điện thoại:{" "}
                        <strong className="ml-2">{dataFormSubmit.phone}</strong>
                      </h6>
                      <h6>
                        Địa chỉ:{" "}
                        <strong className="ml-2">
                          {dataFormSubmit.address}
                        </strong>
                      </h6>
                      <h6>
                        ghi chú:{" "}
                        <span className="ml-2">{dataFormSubmit.note}</span>
                      </h6>
                    </Col>
                    <Col
                      md="2"
                      className="d-flex align-items-start justify-content-center"
                    >
                      <Button
                        color="primary"
                        outline
                        onClick={() => setActiveTab(1)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </Button>
                    </Col>
                  </Row>
                ) : null}

                <Row className="mt-3">
                  <Col md="12">
                    <Table borderless responsive hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th className="text-center">Hình ảnh</th>
                          <th className="text-center">Tên sách</th>
                          <th className="text-center">Số lượng</th>
                          <th className="text-center">Đơn giá</th>
                          <th className="text-center">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((val, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row" className="vertical-align-text">
                                {i + 1}
                              </th>
                              <td className="text-center">
                                <img
                                  style={{
                                    height: "100px",
                                    width: "auto",
                                  }}
                                  src={`${process.env.REACT_APP_API_URL}/images/${val.image}`}
                                  alt={val.name}
                                />
                              </td>
                              <td
                                className="text-center vertical-align-text"
                                style={{ minWidth: "200px" }}
                              >
                                {val.name}
                              </td>
                              <td
                                className="text-center vertical-align-text"
                                style={{ minWidth: "100px" }}
                              >
                                {val.quantity}
                              </td>
                              <td
                                className="text-center vertical-align-text"
                                style={{ minWidth: "70px" }}
                              >
                                {Number(val.price).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </td>
                              <td
                                className="text-center vertical-align-text"
                                style={{ minWidth: "70px" }}
                              >
                                {(Number(val.price) * Number(val.quantity)).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan="5" style={{ textAlign: "end" }}>
                            <h6>Phí Vận chuyển</h6>
                          </td>
                          <td className="text-center vertical-align-text">
                            <strong>
                              {feeShip.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" style={{ textAlign: "end" }}>
                            <h5>Tổng cộng</h5>
                          </td>
                          <td className="text-center vertical-align-text">
                            <strong>
                              {(feeShip + totalCost).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md="6">
                    <div className="form-group form-group-btn d-flex align-items-baseline justify-content-center">
                      <Button
                        type="reset"
                        className="mr-3"
                        block
                        onClick={() => setActiveTab(2)}
                      >
                        Trở lại
                      </Button>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group form-group-btn d-flex align-items-baseline justify-content-center">
                      <Button
                        color="primary"
                        type="button"
                        disabled={loading}
                        block
                        onClick={handleSubmit}
                      >
                        {loading
                          ? "Vui lòng chờ trong giây lát ..."
                          : "Tiến hành đặt hàng"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </>
            ) : null}
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default PaneAccess;
