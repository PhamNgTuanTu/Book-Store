import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Row } from "reactstrap";
import * as Yup from "yup";
import InputFieldProfile from "../../components/Custom/Custom-field/InputFieldProfile";

FormThongtin.propTypes = {};

function FormThongtin(props) {
  const { initialValues, activeInput, setActiveInput, onLogOut } = props;
  const toggle = () => {
    setActiveInput(false);
  };
  const phoneRegex = RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .max(30, "Vui lòng nhập nhỏ hơn 30 kí tự"),
    address: Yup.string()
      .nullable()
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
    email: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .email("Email không hợp lệ")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
    phone: Yup.string()
      .max(10, "Vui lòng nhập số điện thoại gồm 10 số")
      .min(9, "Vui lòng nhập số điện thoại gồm 10 số")
      .matches(phoneRegex, "Số điện thoại không hợp lệ")
      .nullable(),
  });
  const handleActiveInput = () => {
    setActiveInput(!activeInput);
  };
  const handleLogout = () => {
    if (onLogOut) props.onLogOut();
  };
  return (
    <div
      className="tab-pane fade show active px-3"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <Row>
        <Col>
          <Button color="primary" outline onClick={handleActiveInput}>
            Sửa thông tin
          </Button>
          <Button
            color="primary"
            outline
            onClick={handleLogout}
            className="d-md-none d-xl-none ml-2"
          >
            Đăng xuất
          </Button>
        </Col>
      </Row>
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formikProps) => {
          const { isSubmitting, errors } = formikProps;
          return (
            <Form>
              <Row className="mt-3">
                <Field
                  name="name"
                  component={InputFieldProfile}
                  label="Tên người dùng"
                  placeholder="Chờ nhập ..."
                  type="text"
                  autoFocus={false}
                  activeInput={activeInput}
                />
              </Row>
              <Row className="mt-3">
                <Field
                  name="email"
                  component={InputFieldProfile}
                  label="Email"
                  placeholder="Chờ nhập ..."
                  type="text"
                  autoFocus={false}
                  activeInput={activeInput}
                  disabled={true}
                />
              </Row>
              <Row className="mt-3">
                <Field
                  name="phone"
                  component={InputFieldProfile}
                  label="Số điện thoại"
                  placeholder="Chờ nhập ..."
                  type="text"
                  autoFocus={false}
                  activeInput={activeInput}
                />
              </Row>
              <Row className="mt-3">
                <Field
                  name="address"
                  component={InputFieldProfile}
                  label="Địa chỉ"
                  placeholder="Chờ nhập ..."
                  type="text"
                  autoFocus={false}
                  activeInput={activeInput}
                />
              </Row>
              <Row className="mt-3 d-none">
                <Field
                  name="image"
                  component={InputFieldProfile}
                  label="Hình ảnh"
                  placeholder="Chờ nhập ..."
                  type="text"
                  autoFocus={false}
                  activeInput={activeInput}
                />
              </Row>
              {activeInput ? (
                <Row className="mt-4">
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
                      <Button
                        className={
                          JSON.stringify(errors) === "{}" ? "" : "d-none"
                        }
                        onClick={toggle}
                        disabled={
                          JSON.stringify(errors) === "{}" ? false : true
                        }
                      >
                        Hủy
                      </Button>
                      <Button
                        className={
                          JSON.stringify(errors) === "{}" ? "d-none" : ""
                        }
                        type="reset"
                      >
                        Hoàn tác
                      </Button>
                    </div>
                  </Col>
                </Row>
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default FormThongtin;
