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
import { Link, useHistory } from "react-router-dom";
import { setDataUser, setLoadingData } from "../../store/user";
import Info from "../../components/Layout/Info";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

QuenMatKhau.propTypes = {};

function QuenMatKhau(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, dataUser } = useSelector((state) => ({
    loading: state.home.loading,
    dataUser: state.user.user,
  }));
  const initialValues = {
    email_forgot: "",
  };
  const validationSchema = Yup.object().shape({
    email_forgot: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .email("Email không hợp lệ")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
  });
  const [mes, setMes] = useState("");
  const [active, setActive] = useState(false);
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await userApi.sendMail({
        email: values.email_forgot,
      });
      setMes(response.message);
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
    }
  };
  const LoadData = async () => {
    const [response] = await Promise.all([userApi.getUser()]);
    dispatch(setDataUser(response.data));
    dispatch(setLoadingData(false));
  };

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
            <title>StaciaBook - Quên mật khẩu</title>
          </MetaTags>
          <Info />
          <Header />
          <section className="grid-product mt-4">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Card body color="secondary" outline>
                    <CardTitle tag="h5">Quên mật khẩu</CardTitle>
                    {active ? (
                      <div className="position-relative">
                        <CardText>{mes}</CardText>
                        <div className="w-100 d-flex align-items-center justify-content-end">
                          <Link to="/" className="link-forget-pass">
                            Về trang chủ
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        <CardText>
                          Vui lòng nhập email, chúng tôi sẽ gửi liên kết khôi
                          phục mật khẩu đến mail của bạn.
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
                                      name="email_forgot"
                                      component={InputField}
                                      label="Email"
                                      placeholder="Nhập email"
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
                                          ? "Đang gửi ..."
                                          : "Gửi mail"}
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

export default QuenMatKhau;
