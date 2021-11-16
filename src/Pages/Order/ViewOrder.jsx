import { FastField, Form, Formik } from "formik";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Container,
  Modal,
  ModalBody,
  Row,
  Table
} from "reactstrap";
import Swal from "sweetalert2";
import * as Yup from "yup";
import orderAPI from "../../Api/orderAPI";
import reviewAPI from "../../Api/reviewAPI";
import textAriaField from "../../components/Custom/Custom-field/textAriaField";
import Effect from "../../components/Layout/Effect";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Info from "../../components/Layout/Info";
import Search from "../../components/Layout/Search";
import {
  setDataOrderProfile,
  setLoadingOrder,
  setPageOder,
  setStatusOder
} from "../../store/order";
import { login } from "../../store/user";
import Breadcrumb from "./Breacump";

ViewOrder.propTypes = {};

function ViewOrder(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const [modal, setModal] = useState({});
  const [modalReview, setModalReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const { totalPage, curentPage, data } = useSelector((state) => ({
    totalPage: state.orders.totalPage,
    curentPage: state.orders.curentPage,
    data: state.orders.dataOrder,
  }));

  const [name, setName] = useState("");
  const [id, setID] = useState(0);
  const initialValues = { comment: "", rating: "" };
  const validationSchema = Yup.object().shape({
    rating: Yup.string().required("Vui lòng chọn số sao"),
    comment: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .min(1, "Vui lòng nhập lớn hơn 1 kí tự")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
  });

  const toggleReview = (id, name) => {
    setName(name);
    setID(id);
    setModalReview(!modalReview);
  };

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const arr = {
        order_detail_id: id,
        rating: Number(values.rating),
      };
      await reviewAPI.postReview({ ...values, ...arr });
      setSubmitting(false);
      setModalReview(false);
    } catch (error) {
      if (error.response.status === 422) {
        Swal.fire({
          text: `Sách "${name}" chỉ được tạo 1 đánh giá trên mỗi hóa đơn`,
          icon: "error",
        });
        setSubmitting(false);
        setModalReview(false);
      }
    }
  };


  const LoadData = async () => {
    try {
      setLoading(true);
      let response = null;
      if (JSON.stringify(parsed) !== "{}") {
        response = await orderAPI.getOrderPage(parsed.page);
      } else {
        response = await orderAPI.getOrder();
      }
      dispatch(setDataOrderProfile(response.data));
      dispatch(setPageOder(response.meta));
      dispatch(setLoadingOrder(false));
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Phiên đăng nhập đã hết hạn !",
          text: "Vui lòng đăng nhập lại hệ thống",
          showDenyButton: true,
          showConfirmButton: false,
          denyButtonText: `Đăng xuất`,
        }).then((result) => {
          if (result.isDenied) {
            dispatch(login({}));
            history.push("/");
          }
        });
      }
    }
  };

  const totalPageCount = Math.ceil(totalPage / 10);

  const funtionUpdateOrder = async (id) => {
    setLoading(true);
    try {
      await orderAPI.editOrder(id);
      dispatch(setStatusOder(0, id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleHuyDon = (id) => {
    Swal.fire({
      title: `Bạn Có Chắc Muốn Hủy Đơn Hàng #${id} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, Vẫn Tiếp Tục",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        funtionUpdateOrder(id);
      }
    });
  };

  const toggle = (id) => {
    setModal((preState) => ({
      ...preState,
      [id]: !modal[id],
    }));
  };

  const displayClassname = (stt) => {
    let result = "";
    if (stt === 1) {
      result = "tick-order--dang-cho";
    } else if (stt === 2) {
      result = "tick-order--da-xac-nhan";
    } else if (stt === 3) {
      result = "tick-order--dang-van-chuyen";
    } else if (stt === 4) {
      result = "tick-order--hoan-thanh";
    } else {
      result = "tick-order--da-huy";
    }
    return result;
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    let pageIndex = page.selected;
    setPage(Number(pageIndex) + 1);
    const url = `${pathname}?page=${Number(pageIndex) + 1}`;
    history.push(url);
  };

  useEffect(() => {
    LoadData();
    // eslint-disable-next-line
  }, [page]);
  return (
    <>
      <MetaTags>
        <title>StaciaBook - Xem đơn hàng</title>
      </MetaTags>
      <Effect />
      <Info />
      <Header />
      <Search />
      <section className="book-new-update">
        <Container>
          <Row>
            <Col>
              <Breadcrumb />
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <Card
                  body
                  outline
                  color="primary"
                  style={{ paddingBottom: "70px" }}
                >
                  <div className="card-product is-loading d-flex p-0">
                    <div className="col-lg-12 col-md-12 col-sm-12 background-color">
                      <div className="author-detail-title">
                        <div className="content-product">
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card body outline color="primary" className="mb-3">
                  {JSON.stringify(data) !== "[]" && data.length > 0 ? (
                    <>
                      {data.map((val, i) => {
                        return (
                          <div key={i}>
                            <Row>
                              <Col>
                                <h5
                                  className={`pl-3 tick-order ${displayClassname(
                                    Number(val.status)
                                  )}`}
                                  onClick={() => toggle(i)}
                                >
                                  {Number(val.status) === 1 ? (
                                    <i className="far fa-paper-plane mr-2"></i>
                                  ) : null}
                                  {Number(val.status) === 2 ? (
                                    <i className="fas fa-check-circle mr-2"></i>
                                  ) : null}
                                  {Number(val.status) === 3 ? (
                                    <i className="fas fa-shipping-fast mr-2"></i>
                                  ) : null}
                                  {Number(val.status) === 4 ? (
                                    <i className="fas fa-thumbs-up mr-2"></i>
                                  ) : null}
                                  {Number(val.status) === 5 ||
                                  Number(val.status) === 0 ||
                                  Number(val.status) === 6 ? (
                                    <i className="fas fa-ban mr-2"></i>
                                  ) : null}
                                  <strong>Đơn hàng #{val.id}</strong>
                                  <i
                                    className={
                                      modal[i]
                                        ? "fas fa-chevron-circle-right icon-open-order active-icon-open-order"
                                        : "fas fa-chevron-circle-right icon-open-order"
                                    }
                                  ></i>
                                </h5>
                              </Col>
                            </Row>
                            <Collapse isOpen={modal[i]}>
                              <Card>
                                <CardBody>
                                  <Row>
                                    <Col>
                                      <h6>
                                        Người nhận:{" "}
                                        <em className="ml-2">{val.name}</em>
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h6>
                                        Địa chỉ:{" "}
                                        <em className="ml-2">{val.address}</em>
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h6>
                                        Số điện thoại:{" "}
                                        <em className="ml-2">{val.phone}</em>
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h6>
                                        Ghi chú:{" "}
                                        <em className="ml-2">{val.note}</em>
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h6>
                                        Trạng thái đơn:{" "}
                                        <em className="ml-2">
                                          {Number(val.status) === 1 ? (
                                            <Badge color="warning">
                                              Chờ xác nhận
                                            </Badge>
                                          ) : null}
                                          {Number(val.status) === 2 ? (
                                            <Badge color="primary">
                                              Đã xác nhận
                                            </Badge>
                                          ) : null}
                                          {Number(val.status) === 3 ? (
                                            <Badge color="primary">
                                              Đang vận chuyển
                                            </Badge>
                                          ) : null}
                                          {Number(val.status) === 4 ? (
                                            <Badge color="success">
                                              Hoàn thành
                                            </Badge>
                                          ) : null}
                                          {Number(val.status) === 5 ||
                                          Number(val.status) === 6 ||
                                          Number(val.status) === 0 ? (
                                            <Badge color="danger">Đã hủy</Badge>
                                          ) : null}
                                        </em>
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h6>
                                        Ngày tạo:{" "}
                                        <em className="ml-2">
                                          {val.created_at}
                                        </em>
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <Table borderless responsive size="lg">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Tên sách</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th>Tạm tính</th>
                                            <th
                                              className={
                                                Number(val.status) === 4
                                                  ? ""
                                                  : "d-none"
                                              }
                                            ></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {val.items.map((x, i) => {
                                            return (
                                              <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td
                                                  style={{ minWidth: "200px" }}
                                                >
                                                  {x.book}
                                                </td>
                                                <td
                                                  style={{ minWidth: "100px" }}
                                                >
                                                  {x.quantity}
                                                </td>
                                                <td
                                                  style={{ minWidth: "70px" }}
                                                >
                                                  {Number(
                                                    x.sale_price
                                                  ).toLocaleString("it-IT", {
                                                    style: "currency",
                                                    currency: "VND",
                                                  })}
                                                </td>
                                                <td
                                                  style={{ minWidth: "70px" }}
                                                >
                                                  {(
                                                    Number(x.sale_price) *
                                                    Number(x.quantity)
                                                  ).toLocaleString("it-IT", {
                                                    style: "currency",
                                                    currency: "VND",
                                                  })}
                                                </td>
                                                <td
                                                  style={{ minWidth: "70px" }}
                                                  className={
                                                    Number(val.status) === 4
                                                      ? ""
                                                      : "d-none"
                                                  }
                                                >
                                                  <Button
                                                    color="info"
                                                    onClick={() =>
                                                      toggleReview(x.id, x.book)
                                                    }
                                                    outline
                                                    title="Đánh giá/ nhận xét"
                                                  >
                                                    <i className="fas fa-star-half-alt"></i>
                                                  </Button>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                          <tr>
                                            <td
                                              colSpan="4"
                                              style={{ textAlign: "end" }}
                                            >
                                              <h6>Phí Vận chuyển</h6>
                                            </td>
                                            <td
                                              className="text-center vertical-align-text"
                                              style={{ minWidth: "70px" }}
                                            >
                                              <strong>
                                                {Number(
                                                  val.shipping_fee
                                                ).toLocaleString("it-IT", {
                                                  style: "currency",
                                                  currency: "VND",
                                                })}
                                              </strong>
                                            </td>
                                          </tr>
                                          <tr
                                            style={{
                                              borderBottom: "1px solid",
                                            }}
                                          >
                                            <td
                                              colSpan="4"
                                              style={{ textAlign: "end" }}
                                            >
                                              <h6>Tổng cộng</h6>
                                            </td>
                                            <td
                                              className="text-center vertical-align-text"
                                              style={{ minWidth: "70px" }}
                                            >
                                              <strong>
                                                {Number(
                                                  val.total
                                                ).toLocaleString("it-IT", {
                                                  style: "currency",
                                                  currency: "VND",
                                                })}
                                              </strong>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="4"
                                              style={{ textAlign: "end" }}
                                            >
                                              <h6>Tổng thành tiền</h6>
                                            </td>
                                            <td className="text-center vertical-align-text">
                                              <strong
                                                style={{ color: "#f22872" }}
                                              >
                                                {Number(
                                                  val.total_payment
                                                ).toLocaleString("it-IT", {
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
                                  <Row
                                    className={
                                      Number(val.status) === 1 ? "" : "d-none"
                                    }
                                  >
                                    <Col>
                                      <Button
                                        color="warning"
                                        onClick={() => handleHuyDon(val.id)}
                                        disabled={loading}
                                      >
                                        {loading
                                          ? "Vui lòng chờ ..."
                                          : "Hủy đơn"}
                                      </Button>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <h5>Bạn chưa có đơn hàng !</h5>
                  )}
                </Card>
              )}
            </Col>
          </Row>
          {JSON.stringify(data) !== "[]" && data.length > 0 ? (
            <Row>
              <Col className="d-flex align-items-baseline justify-content-center">
                <div className="mr-2">
                  <span>{`Trang ${curentPage}/${totalPageCount}`}</span>
                </div>
                <div>
                  <ReactPaginate
                    pageCount={totalPageCount}
                    forcePage={curentPage - 1}
                    onPageChange={handlePageChange}
                    disabledClassName="d-none"
                    previousLabel=""
                    nextLabel=""
                    breakLabel="..."
                    breakClassName="break-me"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    subContainerClassName="pgn"
                    breakLinkClassName="page__dots"
                    containerClassName="page mt-4"
                    pageClassName="page__numbers"
                    pageLinkClassName="page__numbers-link"
                    previousClassName="page__btn"
                    previousLinkClassName="page__btn page__numbers-link page__btn-link-pre"
                    nextClassName="page__btn"
                    nextLinkClassName="page__btn page__numbers-link page__btn-link-next"
                    activeClassName="active"
                  />
                </div>
              </Col>
            </Row>
          ) : null}
        </Container>
      </section>
      <Footer />
      <Modal isOpen={modalReview} toggle={toggleReview} centered>
        <ModalBody>
          <button
            className="close"
            onClick={toggleReview}
            style={{
              position: "absolute",
              top: 0,
              right: 5,
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
          <h6>{name}</h6>
          <Row className="mt-4">
            <Col>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize
              >
                {(formikProps) => {
                  const { errors, touched } = formikProps;
                  return (
                    <Form>
                      <Row>
                        <Col>
                          <div className="d-flex align-items-center justify-content-center flex-column">
                            <h4 className="text-center">
                              Vui lòng chọn đánh giá
                            </h4>
                            <span className="star__container mb-3">
                              <FastField
                                type="radio"
                                name="rating"
                                value="1"
                                id="star-1"
                                className="star__radio visuhide"
                              />
                              <FastField
                                type="radio"
                                name="rating"
                                value="2"
                                id="star-2"
                                className="star__radio visuhide"
                              />
                              <FastField
                                type="radio"
                                name="rating"
                                value="3"
                                id="star-3"
                                className="star__radio visuhide"
                              />
                              <FastField
                                type="radio"
                                name="rating"
                                value="4"
                                id="star-4"
                                className="star__radio visuhide"
                              />
                              <FastField
                                type="radio"
                                name="rating"
                                value="5"
                                id="star-5"
                                className="star__radio visuhide"
                              />

                              <label className="star__item" htmlFor="star-1">
                                <span className="visuhide">1 star</span>
                              </label>
                              <label className="star__item" htmlFor="star-2">
                                <span className="visuhide">2 stars</span>
                              </label>
                              <label className="star__item" htmlFor="star-3">
                                <span className="visuhide">3 stars</span>
                              </label>
                              <label className="star__item" htmlFor="star-4">
                                <span className="visuhide">4 stars</span>
                              </label>
                              <label className="star__item" htmlFor="star-5">
                                <span className="visuhide">5 stars</span>
                              </label>
                            </span>
                            {errors["rating"] && touched["rating"] && (
                              <div className="invalid-raiting">
                                {errors["rating"]}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col md="12">
                          <FastField
                            name="comment"
                            component={textAriaField}
                            label=""
                            placeholder="Chia sẻ thêm thông tin sản phẩm"
                            type="text"
                            autoFocus={true}
                            rows={5}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md="6">
                          <Button
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                            block
                          >
                            {isSubmitting ? "Vui lòng chờ ..." : "Gửi đánh giá"}
                          </Button>
                        </Col>
                        <Col md="6">
                          <Button
                            color="warning"
                            type="reset"
                            block
                            onClick={toggleReview}
                          >
                            Hủy
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ViewOrder;
