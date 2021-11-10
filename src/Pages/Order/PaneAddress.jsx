import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import * as Yup from "yup";
import feeShipApi from "../../Api/feeShipAPi";
import InputField from "../../components/Custom/Custom-field/InputField";
import SelectField from "../../components/Custom/Custom-field/SelectField";
import textAriaField from "../../components/Custom/Custom-field/textAriaField";
import { setDataHuyen, setDataTinh, setDataXa } from "../../store/address";

PaneAddress.propTypes = {};

function PaneAddress(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { initialValues } = props;
  const { dataTinh, dataHuyen, dataXa, loading } = useSelector((state) => ({
    dataTinh: state.address.dataTinh,
    dataHuyen: state.address.dataHuyen,
    dataXa: state.address.dataXa,
    loading: state.address.loading,
  }));
  const [tinhSelected, setTinhSelected] = useState([]);
  const [huyenSelected, setHuyenSelected] = useState([]);
  const [, setXaSelected] = useState([]);

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
      .required("Vui lòng nhập trường này"),
    tinh: Yup.number().required("Vui lòng chọn tỉnh/thành phố").nullable(),
    huyen: Yup.number().required("Vui lòng chọn Quận/huyện").nullable(),
    xa: Yup.number().required("Vui lòng chọn Phường/xã").nullable(),
    address: Yup.string()
      .test(
        "",
        "Vui lòng nhập trường này",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập trường này")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
  });

  const loadApiTinh = async () => {
    try {
      const response = await feeShipApi.getTinh(process.env.REACT_APP_TOKEN_SHOP);
      dispatch(setDataTinh(response.data.data));
    } catch (error) {}
  };

  const loadApiHuyen = async () => {
    if (JSON.stringify(tinhSelected) !== "[]") {
      try {
        const response = await feeShipApi.getHuyen(process.env.REACT_APP_TOKEN_SHOP, {
          province_id: tinhSelected,
        });
        dispatch(setDataHuyen(response.data.data));
      } catch (error) {}
    }
  };

  const loadApiXa = async () => {
    if (
      JSON.stringify(huyenSelected) !== "[]" &&
      JSON.stringify(tinhSelected) !== "[]"
    ) {
      try {
        const response = await feeShipApi.getXa(process.env.REACT_APP_TOKEN_SHOP, {
          district_id: huyenSelected,
        });
        dispatch(setDataXa(response.data.data));
      } catch (error) {}
    }
  };

  useEffect(() => {
    loadApiTinh();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadApiHuyen();
    // eslint-disable-next-line
  }, [tinhSelected]);

  useEffect(() => {
    loadApiXa();
    // eslint-disable-next-line
  }, [huyenSelected]);

  return (
    <Card body outline color="primary" className="mt-4">
      <h5>Thông tin cá nhân</h5>
      <CardBody>
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
                  <Col md="6" sm="12" className="mt-sm-3">
                    <FastField
                      name="name"
                      component={InputField}
                      label="Tên khách hàng"
                      placeholder="Nhập thông tin khách hàng"
                      type="text"
                      autoFocus={true}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mt-sm-3">
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
                  <Col md="6" sm="12" className="mt-sm-3">
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email"
                      placeholder="Nhập email"
                      type="text"
                      autoFocus={false}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mt-sm-3">
                    <Field
                      name="tinh"
                      component={SelectField}
                      label="Tỉnh/thành phố"
                      placeholder="Chọn tỉnh/thành phố ... "
                      setData={setTinhSelected}
                      options={dataTinh}
                      loading={loading}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6" sm="12" className="mt-sm-3">
                    <Field
                      name="huyen"
                      component={SelectField}
                      label="Quận/huyện"
                      placeholder="Chọn quận/huyện ... "
                      setData={setHuyenSelected}
                      options={dataHuyen}
                      loading={loading}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mt-sm-3">
                    <Field
                      name="xa"
                      component={SelectField}
                      label="Phường/xã"
                      placeholder="Chọn phường/xã ... "
                      setData={setXaSelected}
                      options={dataXa}
                      loading={loading}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12" sm="12" className="mt-sm-3">
                    <FastField
                      name="address"
                      component={InputField}
                      label="Số nhà/đường/xóm/ấp"
                      placeholder="Nhập số nhà, đường, xóm, ấp ..."
                      type="text"
                      autoFocus={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12" sm="12" className="mt-sm-3">
                    <FastField
                      name="note"
                      component={textAriaField}
                      label="Ghi chú"
                      placeholder="Nhập ghi chú"
                      autoFocus={false}
                      rows={3}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md="12">
                    <div className="form-group form-group-btn d-flex align-items-center justify-content-end">
                      <Button
                        type="reset"
                        className="mr-3"
                        onClick={() => history.goBack()}
                      >
                        Hủy
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Đang kiểm tra ..." : "Tiếp theo"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </CardBody>
    </Card>
  );
}

export default PaneAddress;
