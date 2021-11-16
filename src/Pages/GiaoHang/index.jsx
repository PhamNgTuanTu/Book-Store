import { ErrorMessage, FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { MetaTags } from "react-meta-tags";
import shipperApi from "../../Api/shipperApi";
import modalError from "../../components/Modal/Error";
import { useDispatch } from "react-redux";
import { login } from "../../store/ship";
import { useHistory } from "react-router";

GiaoHang.propTypes = {};

function GiaoHang(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test("", "Vui lòng nhập email", (value) => value && value.trim() !== "")
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
    password: Yup.string()
      .test(
        "",
        "Vui lòng nhập mật khẩu",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await shipperApi.logIn(values);
      dispatch(login(res.data));
      setSubmitting(false);

      history.push("/dich-vu-giao-hang");
    } catch (error) {
      if (error.response.status === 401) {
        setSubmitting(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 422) {
        setSubmitting(false);
        modalError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <MetaTags>
        <title>StaciaBook - Đăng nhập dịch vụ giao hàng</title>
      </MetaTags>
      <div className="container form-login-ghn">
        <div className="screen">
          <div className="screen__content">
            <Formik
              initialValues={{
                email: "shipper1@ghn.vn",
                password: "password123",
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;
                return (
                  <Form className="login-ghn">
                    <div className="login-ghn__field">
                      <i className="login-ghn__icon fas fa-user"></i>
                      <FastField
                        type="text"
                        className="login-ghn__input"
                        name="email"
                        placeholder="User name / Email"
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="error-mes-ghn"
                      />
                    </div>
                    <div className="login-ghn__field">
                      <i className="login-ghn__icon fas fa-lock"></i>
                      <FastField
                        type="password"
                        name="password"
                        className="login-ghn__input"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="error-mes-ghn"
                      />
                    </div>
                    <button
                      className="button login-ghn__submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <span className="button__text">
                        {isSubmitting ? "Vui lòng chờ ..." : "Đăng nhập"}
                      </span>
                      <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <div className="social-login-ghn">
              <h3>Đăng nhập dịch vụ giao hàng</h3>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default GiaoHang;
