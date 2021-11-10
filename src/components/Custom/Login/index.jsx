import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as Yup from "yup";
import userApi from "../../../Api/userApi";
import { login } from "../../../store/user";
import modalError from "../../Modal/Error";
import modalSuccess from "../../Modal/Success";
import InputFieldPass from "../Custom-field/InputFieldLogin";

Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch()
  const { onClick, refReset, setModal,setModalUser } = props;
  const initialValue = {
    email: "",
    password: "",
  };

  const matKhauRegex = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test(
        "",
        "Vui lòng nhập email",
        (value) => value && value.trim() !== ""
      )
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
      .matches(
        matKhauRegex,
        "Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
      )
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await userApi.logIn(values);
      dispatch(login(response.data));
      setModal(false);
      modalSuccess(response.message);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 422) {
        setLoading(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 409) {
        setLoading(false);
        modalError(error.response.data.message);
      }
      if (error.response.status === 401) {
        setLoading(false);
        modalError(error.response.data.message);
      }
    }
    setModalUser(false)
  };

  return (
    <div className="center">
      <h2 className="form-title" id="login" onClick={onClick}>
        Đăng Nhập
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
              <Form id="form-login">
                <FastField
                  name="email"
                  component={InputFieldPass}
                  placeholder="Email"
                  type="text"
                  autoFocus={true}
                  position="bottom"
                />
                <div className="input-group">
                  <FastField
                    name="password"
                    component={InputFieldPass}
                    placeholder="Mật khẩu"
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
          value="Đăng Nhập"
          form="form-login"
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
        ) : (
          null
        )}
      </div>
      <Link to="/quen-mat-khau">Quên mật khẩu</Link>
    </div>
  );
}

export default Login;
