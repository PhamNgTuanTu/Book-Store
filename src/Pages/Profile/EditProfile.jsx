import { FastField, Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, ModalBody, Row } from "reactstrap";
import InputField from "../../components/Custom/Custom-field/InputField";
import InputFile from "../../components/Custom/Custom-field/InputFile";
import * as Yup from "yup";

EditProfile.propTypes = {};

function EditProfile(props) {
  const { modal, setModal, initialValues } = props;
  const toggle = () => {
    setModal(!modal);
  };
  const tenDangNhapRegex = RegExp(/^[A-Za-z0-9._]+$/);
  const phoneRegex = RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .matches(tenDangNhapRegex, "Tên người dùng không hợp lệ")
      .max(50, "Vui lòng nhập nhỏ hơn 50 kí tự"),
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

  return (
    <Modal toggle={toggle} isOpen={modal}>
      <ModalBody>
        <Button
          color="primary"
          className="close"
          onClick={toggle}
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            padding: "5px 10px",
          }}
        >
          <span aria-hidden="true">×</span>
        </Button>
        <div className="img-container">
          <div className="img-inner">
            <div className="inner-skew">
              <img
                src={window.location.origin + "/assets/images/icon/profile.jpg"}
                alt="loading ..."
              />
            </div>
          </div>
        </div>
        <div className="text-container">
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
                        name="name"
                        component={InputField}
                        label="Tên người dùng"
                        placeholder="Nhập tên người dùng"
                        type="text"
                        autoFocus={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FastField
                        name="email"
                        component={InputField}
                        label="Email"
                        placeholder="Nhập email"
                        type="text"
                        autoFocus={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FastField
                        name="address"
                        component={InputField}
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        type="text"
                        autoFocus={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FastField
                        name="phone"
                        component={InputField}
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        type="text"
                        autoFocus={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Field
                      name="image"
                      component={InputFile}
                      label="Ảnh đại diện"
                      type="file"
                      isLarge={true}
                    />
                  </Row>
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
                        <Button onClick={toggle}>Hủy</Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default EditProfile;
