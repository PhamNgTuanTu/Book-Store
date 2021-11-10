import PropTypes from "prop-types";
import React from "react";
import { Col } from "reactstrap";

InputFieldProfile.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

InputFieldProfile.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  autoFocus: false,
};

function InputFieldProfile(props) {
  const {
    field,
    form,
    label,
    placeholder,
    autoFocus,
    type,
    activeInput,
    disabled,
  } = props;
  const { name } = field;

  //validation
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <>
      <Col md="4">{label && <label htmlFor={name}>{label}</label>}</Col>
      <Col md="8">
        <input
          id={name}
          className={
            activeInput
              ? showError
                ? "form-control is-invalid"
                : "form-control"
              : "form-control custom-input-profile"
          }
          {...field}
          placeholder={placeholder}
          autoFocus={autoFocus}
          type={type}
          readOnly={!activeInput}
          autoComplete="off"
          disabled={disabled}
        />
        {showError && <div className="invalid-feedback">{errors[name]}</div>}
      </Col>
    </>
  );
}

export default InputFieldProfile;
