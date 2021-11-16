import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import shipperApi from "../../Api/shipperApi";
import Footer from "../../components/Layout/Footer";
import HeaderLogo from "../../components/Layout/HeaderLogo";
import Info from "../../components/Layout/Info";
import modalError from "../../components/Modal/Error";
import { logout, setDataShip, setStatusOder } from "../../store/ship";
import View from "./ModalView";
import modalSuccess from "../../components/Modal/Success";
import InputSearch from "../../components/Custom/search/inputSearch";

ViewDetail.propTypes = {};

const optionTrangThai = [{ value: 1, label: "Đang vận chuyển" }];

let statusFilter = () => {};
let nameFilter = () => {};
let orderIdFilter = () => {};
let phoneFilter = () => {};

function ViewDetail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { storeData } = useSelector((state) => ({
    storeData: state.shipper.dataShip,
  }));

  const [modal, setModal] = useState(false);
  const [arrChoose, setArrChoose] = useState([]);
  const [params, setParams] = useState({
    name: "",
    phone: "",
    status: "",
    order: "",
  });

  const loadData = async () => {
    try {
      const res = await shipperApi.getOrderShip();
      dispatch(setDataShip(res.data));
    } catch (error) {
      if (error.response.status === 401) {
        modalError(error.response.data.message);
      }
      if (error.response.status === 422) {
        modalError(error.response.data.message);
      }
    }
  };

  const functionLogout = async () => {
    setLoading(true);
    try {
      const res = await shipperApi.logOut();
      dispatch(logout(res));
      setLoading(false);
      history.push("/dang-nhap-giao-hang");
    } catch (error) {
      if (error.response.status === 400) {
        setLoading(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 422) {
        setLoading(false);
        modalError(error.response.data.message);
      }
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Đăng Xuất Khỏi Hệ Thống",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, vẫn tiếp tục",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        functionLogout();
      }
    });
  };

  const selectRowDonHang = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row) => {
      setArrChoose(row);
      setModal(true);
    },
    classes: "đang-chon",
    bgColor: "#eef0fc",
  };

  const defaultSorted = [
    {
      dataField: `${Number("id")}`,
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: storeData.length,
    custom: true,
  };

  const columnsOrder = [
    {
      text: "Mã hóa đơn",
      dataField: "id",
      sort: true,
      formatter: (id, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">#{id}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          orderIdFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Tên khách hàng",
      dataField: "name",
      sort: true,
      formatter: (name, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{name}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          nameFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Số điện thoại",
      dataField: "phone",
      sort: true,
      formatter: (phone, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{phone}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          phoneFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Phí vận chuyển",
      dataField: "shipping_fee",
      sort: true,
      formatter: (shipping_fee, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">
            {Number(shipping_fee).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Tổng cộng",
      dataField: "total_payment",
      sort: true,
      formatter: (total_payment, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">
            {Number(total_payment).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Trạng thái",
      dataField: "status",
      sort: true,
      formatter: (status, storeDataOrder) => (
        <>
          {Number(status) === 0 ? (
            <Badge color="danger">Người dùng hủy đơn</Badge>
          ) : null}
          {Number(status) === 1 ? (
            <Badge color="warning">Chờ xác nhận</Badge>
          ) : null}
          {Number(status) === 2 ? (
            <Badge color="info">Đã xác nhận</Badge>
          ) : null}
          {Number(status) === 3 ? <Badge color="light">Đang giao</Badge> : null}
          {Number(status) === 4 ? (
            <Badge color="success">Hoàn thành</Badge>
          ) : null}
          {Number(status) === 5 ? (
            <Badge color="danger">Giao thất bại</Badge>
          ) : null}
          {Number(status) === 6 ? (
            <Badge color="danger">Quản trị viên hủy đơn</Badge>
          ) : null}
        </>
      ),
      filter: selectFilter({
        options: optionTrangThai,
        getFilter: (filter) => {
          statusFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
  ];

  const functionNhapKho = async (data, note) => {
    if (JSON.stringify(data) !== "[]") {
      let arrItems = [];
      data.items.forEach((val) => {
        arrItems.push({
          book_id: val.book_id,
          quantity: Number(val.quantity),
          import_unit_price: Number(val.unit_price),
        });
      });
      let arr = {
        formality: 2,
        supplier_id: "",
        total: 0,
        note: note,
        items: arrItems,
      };
      try {
        await shipperApi.addWare(arr);
      } catch (error) {
        if (error.response.status === 400) {
          modalError(error.response.data.message);
          setLoading(false);
        }
      }
    }
  };

  const functionUpdateStatus = async (status, id) => {
    setLoading(true);
    try {
      const response = await shipperApi.editOrder(
        { status: Number(status) },
        id
      );
      dispatch(setStatusOder(Number(status), id));
      setLoading(false);
      modalSuccess(response.message);
      setModal(false);
    } catch (error) {
      if (error.response.status === 422) {
        modalError(error.response.data.message);
        setLoading(false);
        setModal(false);
      }
      if (error.response.status === 404) {
        modalError(error.response.data.message);
        setLoading(false);
        setModal(false);
      }
    }
  };

  const handleHuyDonShip = (id) => {
    Swal.fire({
      title: "Hủy đơn hàng",
      text: "Xác nhận giao hàng thất bại ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        functionNhapKho(
          arrChoose,
          `Trả hàng do hóa đơn #${id} giao hàng thất bại !`
        );
        functionUpdateStatus(5, id);
      }
    });
  };

  const handleUpdateStatus = (id, status) => {
    setLoading(true);
    shipperApi
      .editOrder({ status: status }, id)
      .then((response) => {
        if (response.success) {
          dispatch(setStatusOder(status, id));
          setLoading(false);
          modalSuccess(response.message);
          setModal(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          modalError(error.response.data.message);
          setLoading(false);
          setModal(false);
        }
        if (error.response.status === 404) {
          modalError(error.response.data.message);
          setLoading(false);
          setModal(false);
        }
      });
  };

  useEffect(() => {
    loadData();
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (typeof statusFilter == "function" && storeData.length > 0) {
      nameFilter(params.name);
      phoneFilter(params.phone);
      orderIdFilter(params.order);
    }
    // eslint-disable-next-line
  }, [params]);
  return (
    <>
      {loading ? (
        <div id="preloder">
          <div className="loader" />
        </div>
      ) : null}
      <MetaTags>
        <title>StaciaBook - Xem đơn hàng đã nhận</title>
      </MetaTags>
      <Info />
      <HeaderLogo />
      <section className="grid-product mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Card color="primary" outline>
                <CardHeader className="position-relative">
                  <Row className="mt-2 mb-2">
                    <Col md="6" sm="12">
                      <CardTitle>
                        Xem thông tin đơn hàng chờ vận chuyển
                      </CardTitle>
                    </Col>
                    <Col md="6" sm="12">
                      <span className="logout-ship" onClick={handleLogout}>
                        Thoát <i className="fas fa-sign-out-alt"></i>
                      </span>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <InputSearch
                        value={params}
                        setValues={setParams}
                        label="Mã hóa đơn"
                        placeholder="#"
                        name="order"
                        type="text"
                      />
                    </Col>
                    <Col md="6">
                      <InputSearch
                        value={params}
                        setValues={setParams}
                        label="Tên khách hàng"
                        placeholder="Nhập tên khách hàng..."
                        name="name"
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <InputSearch
                        value={params}
                        setValues={setParams}
                        label="Số điện thoại khách hàng"
                        placeholder="Nhập số điện thoại ..."
                        name="phone"
                        type="number"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      {storeData.length > 0 ? (
                        <PaginationProvider
                          pagination={paginationFactory(pageOptions)}
                          keyField="id"
                          columns={columnsOrder}
                          data={storeData}
                        >
                          {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                              keyField="id"
                              data={storeData}
                              columns={columnsOrder}
                              bootstrap4
                              search
                            >
                              {(toolkitProps) => (
                                <React.Fragment>
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField="id"
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      defaultSorted={defaultSorted}
                                      filter={filterFactory()}
                                      classes={
                                        "table align-middle table-nowrap table-hover bg-select-row"
                                      }
                                      noDataIndication={() => (
                                        <div
                                          style={{
                                            textAlign: "center",
                                          }}
                                        >
                                          Không tìm thấy đơn hàng.
                                        </div>
                                      )}
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      selectRow={selectRowDonHang}
                                    />
                                  </div>
                                  <div className="custom-pagination pagination pagination-rounded justify-content-end mb-2">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </React.Fragment>
                              )}
                            </ToolkitProvider>
                          )}
                        </PaginationProvider>
                      ) : (
                        <Table>
                          <thead>
                            <tr>
                              <th scope="col">Mã hóa đơn</th>
                              <th scope="col">Tên khách hành</th>
                              <th scope="col">Số điện thoại</th>
                              <th scope="col">Phí vận chuyển</th>
                              <th scope="col">Tổng cộng</th>
                              <th scope="col">Trạng thái</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="8" style={{ textAlign: "center" }}>
                                Không tìm thấy đơn hàng.
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <View
        modal={modal}
        setModal={setModal}
        arrChoose={JSON.stringify(arrChoose) !== "null" ? arrChoose : null}
        onDeleteClickShip={handleHuyDonShip}
        onUpdateClick={handleUpdateStatus}
      />
    </>
  );
}

export default ViewDetail;
