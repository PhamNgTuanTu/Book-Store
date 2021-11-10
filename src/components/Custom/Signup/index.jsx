import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import InputFieldPass from "../Custom-field/InputFieldLogin";
import * as Yup from "yup";
import modalSuccess from "../../Modal/Success";
import modalError from "../../Modal/Error";
import userApi from "../../../Api/userApi";
import { useDispatch } from "react-redux";
import { setSignup } from "../../../store/user";
import { Link } from "react-router-dom";

Signup.propTypes = {};

function Signup(props) {
  const dispatch = useDispatch();
  const { onClick, refReset, setModal, setModalUser } = props;
  const initialValue = {
    email_signup: "",
    password_signup: "",
    re_password: "",
  };
  const matKhauRegex = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  );

  const validationSchema = Yup.object().shape({
    email_signup: Yup.string()
      .test(
        "",
        "Vui lòng nhập email",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
    password_signup: Yup.string()
      .test(
        "",
        "Vui lòng nhập mật khẩu",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập mật khẩu")
      .matches(
        matKhauRegex,
        "Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
      )
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
    re_password: Yup.string()
      .test(
        "",
        "Vui lòng nhập lại mật khẩu",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập lại mật khẩu")
      .matches(
        matKhauRegex,
        "Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
      )
      .oneOf([Yup.ref("password_signup"), null], "Mật khẩu nhập lại không khớp")
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
  });
  const [loading, setloading] = useState(false);
  const onSubmit = async (values) => {
    setloading(true);
    let arr = {
      email: values.email_signup,
      password: values.password_signup,
      password_confirmation: values.re_password,
    };
    try {
      const response = await userApi.SignUp(arr);
      dispatch(setSignup(response.data));
      setModal(false);
      modalSuccess(response.message);
      setloading(false);
    } catch (error) {
      if (error.response.status === 422) {
        setloading(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 409) {
        setloading(false);
        modalError(error.response.data.message);
      }
    }
    setModalUser(false);
  };
  return (
    <>
      <h2 className="form-title" id="signup" onClick={onClick}>
        Đăng Ký
      </h2>
      <div className="form-holder">
        {/* <div className="form-holder-icon">
          <div className="social-container d-flex justify-content-center">
            <a href="#!" className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#!" className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a href="#!" className="social">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          <div className="bar-form position-relative">
            <span>or</span>
          </div>
        </div> */}
        <Formik
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formikProps) => {
            return (
              <Form id="form-signup">
                <FastField
                  name="email_signup"
                  component={InputFieldPass}
                  placeholder="Email"
                  type="text"
                  autoFocus={true}
                  position="bottom"
                />
                <div className="input-group">
                  <FastField
                    name="password_signup"
                    component={InputFieldPass}
                    placeholder="Mật khẩu"
                    type="password"
                    isPassword={true}
                    position="bottom"
                  />
                </div>
                <div className="input-group">
                  <FastField
                    name="re_password"
                    component={InputFieldPass}
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    isPassword={true}
                    position="bottom"
                  />
                </div>
                <Row className="d-none">
                  <Col>
                    <input type="reset" ref={refReset} value="reset" />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="position-relative">
        <input
          type="submit"
          className="submit-btn"
          value="Đăng Ký"
          form="form-signup"
        />
        {loading ? (
          <div className="loader-form-sigup">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
          </div>
        ) : null}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/quen-mat-khau" id="quen-mat-khau-link">
          Quên mật khẩu
        </Link>
      </div>
    </>
  );
}

export default Signup;
