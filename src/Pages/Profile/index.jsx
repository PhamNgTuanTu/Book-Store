import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Alert, Col, Container, Row } from "reactstrap";
import Swal from "sweetalert2";
import orderAPI from "../../Api/orderAPI";
import userApi from "../../Api/userApi";
import modalError from "../../components/Custom/modal/Error";
import Effect from "../../components/Layout/Effect";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Info from "../../components/Layout/Info";
import Search from "../../components/Layout/Search";
import { setDataOrderProfile, setPageOder } from "../../store/order";
import {
  editUserData,
  login,
  logout,
  setDataUser,
  setLoadingData,
} from "../../store/user";
import Breadcrumb from "./Breacump";
import DoiMatKhau from "./DoiMatKhau";
import FormThongtin from "./FormThongtin";
import Avatar from "./Image";
import { Link } from "react-router-dom";

Profile.propTypes = {};

function Profile(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, user, loadingPage } = useSelector((state) => ({
    data: state.user.dataUser,
    user: state.user.user,
    loadingPage: state.user.loadingPage,
  }));
  const initialValues = {
    address: JSON.stringify(data) !== "[]" ? data.address : "",
    image: JSON.stringify(data) !== "[]" ? data.image : "",
    email: JSON.stringify(data) !== "[]" ? data.email : "",
    name: JSON.stringify(data) !== "[]" ? data.name : "",
    phone: JSON.stringify(data) !== "[]" ? data.phone : "",
  };
  const initialValueSDoiMatKhau = {
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const LoadData = async () => {
    const response = await userApi.getUser();
    dispatch(setDataUser(response.data));

    const responseOrder = await orderAPI.getOrder();
    dispatch(setDataOrderProfile(responseOrder.data));
    dispatch(setPageOder(responseOrder.meta));

    dispatch(setLoadingData(false));
  };
  const [activeInput, setActiveInput] = useState(false);
  const [alert, setAlert] = useState(false);
  const [activeDoiMatKhau, setActiveDoiMatKhau] = useState(0);
  const [messageDoiMatKhau, setMessageDoiMatKhau] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4);
  const [loading, setLoading] = useState(false);

  const funtionLogout = async () => {
    setLoading(true);
    try {
      const response = await userApi.logOut();
      await new Promise((r) => setTimeout(r, 2000));
      dispatch(logout(response));
      setLoading(false);
      history.push("/");
    } catch (error) {
      if (error.response.status === 422) {
        setLoading(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 409) {
        setLoading(false);
        modalError(error.response.data.message);
      }
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Bạn Có Chắc Muốn Thoát ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, Vẫn Tiếp Tục",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        funtionLogout();
      }
    });
  };

  useEffect(() => {
    let intervalId = "";
    if (activeDoiMatKhau === 1) {
      intervalId = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [activeDoiMatKhau]);

  const toggleAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alert) {
        setAlert(false);
      }
      if (activeDoiMatKhau > 0) {
        setActiveDoiMatKhau(0);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [alert, activeDoiMatKhau]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const arr = {
        name: values.name,
        token: user?.token,
      };
      const responseUser = await userApi.editUser(values);
      dispatch(editUserData(responseUser.data));
      dispatch(login(arr));
      setAlert(true);
      setActiveInput(false);
      setSubmitting(false);
    } catch (error) {
      if (error.response.status === 422) {
        const arrError = Object.keys(initialValues);
        for (let i = 0; i < arrError.length; i++) {
          if (error.response.data.errors[`${arrError[i]}`]) {
            modalError(error.response.data.errors[`${arrError[i]}`]);
            setSubmitting(false);
          }
        }
      }
    }
  };

  const functionDoiMatKhau = async (values, setSubmitting) => {
    try {
      const responseChangePass = await userApi.editPassWord(values);
      setActiveDoiMatKhau(1);
      setMessageDoiMatKhau(responseChangePass.message);
      setLoading(false);
      setSubmitting(false);
      await new Promise((r) => setTimeout(r, 4000));
      dispatch(logout());
      history.push("/");
    } catch (error) {
      if (error.response.status === 401) {
        setActiveDoiMatKhau(2);
        setMessageDoiMatKhau(error.response.data.message);
        setSubmitting(false);
        setLoading(false);
      }
    }
  };

  const handleDoiMatKhau = async (values, { setSubmitting }) => {
    Swal.fire({
      title: "Bạn sẽ phải đăng nhập lại ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, Vẫn Tiếp Tục",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        functionDoiMatKhau(values, setSubmitting);
      }
    });
  };

  useEffect(() => {
    LoadData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <div id="preloder2">
          <div className="loader" />
        </div>
      ) : null}
      <MetaTags>
        <title>StaciaBook - Trang cá nhân</title>
      </MetaTags>
      <Effect />
      <Info />
      <Header />
      <Search />
      <section className="book-new-update">
        <Container>
          <Row>
            <Col>
              <Breadcrumb result={data} loading={loadingPage} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="book-new-update">
        <Container>
          <div className="emp-profile main-book-list-product position-relative">
            <Row>
              <Col md="4" className="mt-3 mb-3">
                <Row className="mt-3">
                  <Col>
                    <Avatar data={data} loadingImg={loadingPage} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {/* <div className="profile-work">
                      <p>WORK LINK</p>
                      <a href="">Website Link</a>
                      <br />
                      <a href="">Bootsnipp Profile</a>
                      <br />
                      <a href="">Bootply Profile</a>
                      <p>SKILLS</p>
                      <a href="">Web Designer</a>
                      <br />
                      <a href="">Web Developer</a>
                      <br />
                      <a href="">WordPress</a>
                      <br />
                      <a href="">WooCommerce</a>
                      <br />
                      <a href="">PHP, .Net</a>
                      <br />
                    </div> */}
                  </Col>
                </Row>
              </Col>
              <Col md="8" className="mt-3 mb-3">
                <Row>
                  <Col>
                    <div className="profile-head">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active text-color"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Thông tin chung
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-color"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Đổi mật khẩu
                          </a>
                        </li>
                        <li className="nav-item">
                          <Link to="/xem-don-hang" className="nav-link text-color">
                            Xem đơn hàng
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="tab-content profile-tab" id="myTabContent">
                      <FormThongtin
                        initialValues={initialValues}
                        activeInput={activeInput}
                        setActiveInput={setActiveInput}
                        onSubmit={onSubmit}
                        onLogOut={handleLogout}
                      />
                      <Alert color="info" isOpen={alert} toggle={toggleAlert}>
                        Cập nhật thành công
                      </Alert>
                      <DoiMatKhau
                        initialValues={initialValueSDoiMatKhau}
                        onSubmit={handleDoiMatKhau}
                        active={activeDoiMatKhau}
                        setActive={setActiveDoiMatKhau}
                        messageDoiMatKhau={messageDoiMatKhau}
                        timeLeft={timeLeft}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
