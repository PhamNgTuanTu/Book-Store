import React, { useEffect, useState } from "react";
import { useCart } from "react-hook-cart";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import userApi from "../../Api/userApi";
import Footer from "../../components/Layout/Footer";
import HeaderLogo from "../../components/Layout/HeaderLogo";
import Info from "../../components/Layout/Info";
import { setDataForm } from "../../store/address";
import { setDataOrder, setLoadingOrder } from "../../store/order";
import { setDataUser, setLoadingData } from "../../store/user";
import PaneAccess from "./PaneAccess";
import PaneAddress from "./PaneAddress";
import PanePay from "./PanePay";

Order.propTypes = {};

function Order(props) {
  const [mystyle, setMyStyle] = useState({
    height: "0px",
  });

  // scroll to top
  var scroll_top = document.querySelector(".scroll-top");
  window.addEventListener("scroll", function () {
    scroll_top &&
      scroll_top.classList.toggle("active-scroll", window.scrollY > 500);
  });
  if (scroll_top) {
    scroll_top.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  // --scroll to top--

  /* progressbar */
  var totalHeight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function () {
    var progressHeight = (window.pageYOffset / totalHeight) * 100;
    setMyStyle({
      height: progressHeight + "%",
    });
  };
  /* --progressbar-- */

  const dispatch = useDispatch();
  const { data, dataTinh, dataHuyen, dataXa } = useSelector((state) => ({
    data: state.user.dataUser,
    dataTinh: state.address.dataTinh,
    dataHuyen: state.address.dataHuyen,
    dataXa: state.address.dataXa,
  }));
  const { items, totalCost } = useCart();
  const [dataFormSubmit, setDataFormSubmit] = useState({});

  const filterData = (dinhDanhId, dinhDanhName, id, data) => {
    let stringAddress = "";
    if (data && JSON.stringify(data) !== "[]") {
      data.forEach((val) => {
        if (Number(val[`${dinhDanhId}`]) === Number(id)) {
          stringAddress = val[`${dinhDanhName}`];
        }
      });
    }
    return stringAddress;
  };

  const initialValues = {
    email: JSON.stringify(data) !== "[]" ? data.email : "",
    name: JSON.stringify(data) !== "[]" ? data.name : "",
    phone: JSON.stringify(data) !== "[]" ? data.phone : "",
    tinh: "",
    huyen: "",
    xa: "",
    note: "",
    address: "",
  };

  const LoadData = async () => {
    try {
      const response = await userApi.getUser();
      dispatch(setDataUser(response.data));
      dispatch(setLoadingData(false));
    } catch (error) {}
  };

  const [activeTab, setActiveTab] = useState(1);

  const onSubmit = async (values, { setSubmitting }) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (JSON.stringify(items) !== "[]" && items.length > 0) {
      let arrItem = [];
      items.forEach((val) => {
        arrItem.push({
          book_id: val.id,
          quantity: val.quantity,
          unit_price: val.unit_price,
          sale_price: val.price,
        });
      });
      let tinh = filterData(
        "ProvinceID",
        "ProvinceName",
        values.tinh,
        dataTinh
      );
      let huyen = filterData(
        "DistrictID",
        "DistrictName",
        values.huyen,
        dataHuyen
      );
      let xa = filterData("WardCode", "WardName", values.xa, dataXa);
      const arr = {
        name: values.name,
        address: `${values.address} ${xa} ${huyen} ${tinh}`,
        phone: values.phone,
        total: totalCost,
        shipping_fee: 0,
        total_payment: 0,
        note: values.note,
        items: arrItem,
      };
      setDataFormSubmit(arr);
      dispatch(setDataForm(values));
      setActiveTab(2);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(setDataOrder([]));
    dispatch(setLoadingOrder(false));
    // eslint-disable-next-line
  }, [activeTab]);

  useEffect(() => {
    LoadData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <MetaTags>
        <title>StaciaBook - Đặt hàng</title>
      </MetaTags>
      <div>
        <div className="scroll-top" />
        <div id="progressbar" style={mystyle} />
        <div id="scrollPath" />
      </div>
      <Info />
      <HeaderLogo />
      <section className="grid-product mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <Nav className="pane-order">
                  <NavItem className="pane-order-li">
                    <NavLink className="active-tab">
                      1. Thông Tin Cá Nhân
                    </NavLink>
                  </NavItem>
                  <NavItem className="pane-order-li">
                    <NavLink
                      className={
                        activeTab === 2 || activeTab === 3 ? "active-tab" : ""
                      }
                    >
                      2. Hình Thức Thanh Toán
                    </NavLink>
                  </NavItem>
                  <NavItem className="pane-order-li">
                    <NavLink className={activeTab === 3 ? "active-tab" : ""}>
                      3. Xác nhận đặt hàng
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={1}>
                    <Row>
                      <Col sm="12">
                        <PaneAddress
                          data={data}
                          initialValues={initialValues}
                          onSubmit={onSubmit}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={2}>
                    <Row>
                      <Col sm="12">
                        <PanePay
                          setData={setDataFormSubmit}
                          setActiveTab={setActiveTab}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={3}>
                    <Row>
                      <Col sm="12">
                        <PaneAccess
                          setActiveTab={setActiveTab}
                          dataFormSubmit={dataFormSubmit}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Order;
