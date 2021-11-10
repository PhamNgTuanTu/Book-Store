import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import InputField from "../../components/Custom/Custom-field/InputField";
import { setLoading } from "../../store/home";
import * as Yup from "yup";
import userApi from "../../Api/userApi";
import modalError from "../../components/Custom/modal/Error";
import { Link, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { setDataUser, setLoadingData } from "../../store/user";
import Info from "../../components/Layout/Info";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

RecoverPass.propTypes = {};

function RecoverPass(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { loading, dataUser } = useSelector((state) => ({
    loading: state.home.loading,
    dataUser: state.user.user,
  }));
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const initialValues = {
    password_recover_pass: "",
    password_confirmation_recover_pass: "",
  };
  const matKhauRegex = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  );
  const validationSchema = Yup.object().shape({
    password_recover_pass: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .matches(
        matKhauRegex,
        "Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
      )
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
    password_confirmation_recover_pass: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .matches(
        matKhauRegex,
        "Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
      )
      .oneOf(
        [Yup.ref("password_recover_pass"), null],
        "Mật khẩu nhập lại không khớp"
      )
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      let arr = {
        password: values.password_recover_pass,
        password_confirmation: values.password_confirmation_recover_pass,
      };
      const response = await userApi.recoverPass(arr, parsed.token);
      setMessage(response.message);
      setActive(response.success);
      setSubmitting(false);
    } catch (error) {
      if (error.response.status === 422) {
        setActive(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 404) {
        setActive(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 401) {
        setActive(false);
        modalError(error.response.data.message);
      }
    }
  };

  const LoadData = async () => {
    const [response] = await Promise.all([userApi.getUser()]);
    dispatch(setDataUser(response.data));
    dispatch(setLoadingData(false));
  };

  const [check, setCheck] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);

  const checktoken = async () => {
    setLoadingCheck(true);
    try {
      const res = await userApi.recoverPass({}, parsed.token);
      if (res.success) {
        setCheck(false);
        setLoadingCheck(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setCheck(true);
        setLoadingCheck(false);
      }
    }
  };

  useEffect(() => {
    checktoken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (JSON.stringify(dataUser) !== "null") {
      LoadData();
      history.push("/trang-ca-nhan");
    }
    dispatch(setLoading(false));
    // eslint-disable-next-line
  }, [dataUser]);

  return (
    <>
      {loading ? (
        <div id="preloder">
          <div className="loader" />
        </div>
      ) : (
        <div>
          <MetaTags>
            <title>StaciaBook - Khôi phục mật khẩu</title>
          </MetaTags>
          <Info />
          <Header />
          <section className="grid-product mt-4">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Card body color="secondary" outline>
                    <>
                      {loadingCheck ? (
                        <CardText>Đang kiểm tra liên kết ...</CardText>
                      ) : (
                        <>
                          {JSON.stringify(parsed) === "{}" || check ? (
                            <>
                              <CardText>Liên kết này đã hết hạn.</CardText>
                              <div className="w-100 d-flex align-items-center justify-content-end">
                                <Link
                                  to="/quen-mat-khau"
                                  style={{ fontSize: "15px" }}
                                  className="link-forget-pass mr-2"
                                >
                                  Gửi lại liên kết ?
                                </Link>
                              </div>
                            </>
                          ) : active ? (
                            <>
                              <CardTitle tag="h5">Khôi phục mật khẩu</CardTitle>
                              <div className="position-relative">
                                <CardText>{message}</CardText>
                                <div className="w-100 d-flex align-items-center justify-content-end">
                                  <Link to="/" className="link-forget-pass">
                                    Về trang chủ
                                  </Link>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <CardTitle tag="h5">Khôi phục mật khẩu</CardTitle>
                              <CardText>
                                Vui lòng nhập mật khẩu mới để hoàn tất việc khôi
                                phục mật khẩu.
                              </CardText>
                              <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                                enableReinitialize
                              >
                                {(formikProps) => {
                                  const { isSubmitting } = formikProps;
                                  return (
                                    <Form>
                                      <Row>
                                        <Col md="12">
                                          <FastField
                                            name="password_recover_pass"
                                            component={InputField}
                                            label="Mật khẩu mới"
                                            placeholder="Nhập mật khẩu"
                                            type="text"
                                            autoFocus={false}
                                          />
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col md="12">
                                          <FastField
                                            name="password_confirmation_recover_pass"
                                            component={InputField}
                                            label="Nhập lại mật khẩu"
                                            placeholder="Nhập lại mật khẩu"
                                            type="text"
                                            autoFocus={false}
                                          />
                                        </Col>
                                      </Row>
                                      <Row className="mt-2">
                                        <Col md="12">
                                          <div className="form-group form-group-btn ">
                                            <Button
                                              color="primary"
                                              className="mr-3 w-100"
                                              type="submit"
                                              disabled={isSubmitting}
                                            >
                                              {isSubmitting
                                                ? "Đang lưu ..."
                                                : "Hoàn tất"}
                                            </Button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </>
                          )}
                        </>
                      )}
                    </>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
}

export default RecoverPass;
