import { FastField, Form, Formik } from "formik";
import React from "react";
import { Alert, Button, Col, Row } from "reactstrap";
import * as Yup from "yup";
import InputField from "../../components/Custom/Custom-field/InputField";

DoiMatKhau.propTypes = {};

function DoiMatKhau(props) {
  const { initialValues, active, messageDoiMatKhau, setActive, timeLeft } =
    props;
  const matKhauRegex = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  );
  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
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
    new_password: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .test('old_password', 'Vui lòng nhập mật khẩu khác mật khẩu cũ', function(value){
        return this.parent.old_password !== value
      })
      .required("Vui lòng nhập trường này")
      .matches(
        matKhauRegex,
        "Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
      )
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
    new_password_confirmation: Yup.string()
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
      .oneOf([Yup.ref("new_password"), null], "Mật khẩu nhập lại không khớp")
      .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
  });
  const toggleAlert = () => {
    setActive(0);
  };
  return (
    <div
      className="tab-pane fade px-3"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
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
                    name="old_password"
                    component={InputField}
                    label="Mật khẩu cũ"
                    placeholder="Nhập mật khẩu cũ"
                    type="text"
                    autoFocus={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FastField
                    name="new_password"
                    component={InputField}
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    type="text"
                    autoFocus={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FastField
                    name="new_password_confirmation"
                    component={InputField}
                    label="Nhập lại mật khẩu mới"
                    placeholder="Nhập lại mật khẩu mới"
                    type="text"
                    autoFocus={false}
                  />
                </Col>
              </Row>
              <Row
                className={
                  active === 1 || active === 2 ? "mt-3" : "mt-3 d-none"
                }
              >
                <Col>
                  <Alert
                    color={active === 1 ? "success" : "danger"}
                    isOpen={active === 1 || active === 2 ? true : false}
                    toggle={toggleAlert}
                  >
                    {active === 1
                      ? `${messageDoiMatKhau} - đăng xuất sau ${timeLeft}s`
                      : messageDoiMatKhau}
                    {}
                  </Alert>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="12">
                  <div className="form-group form-group-btn ">
                    <Button
                      color="primary"
                      className="mr-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang lưu ..." : "Thay đổi"}
                    </Button>
                    <Button type="reset">Hủy</Button>
                  </div>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default DoiMatKhau;
