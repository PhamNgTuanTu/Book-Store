import PropTypes from "prop-types";
import React, { useState } from "react";
import { Input } from "reactstrap";

InputFieldPass.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isPassword: PropTypes.bool,
};
InputFieldPass.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  autoFocus: false,
  isPassword: false,
};

function InputFieldPass(props) {
  const { field, form, placeholder, type, isPassword } = props;
  const { name } = field;
  //validation
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const [hidePass, setHidePass] = useState(false);
  const handleClickShowPassword = () => {
    setHidePass(!hidePass);
  };


  return (
    <>
      <div className="w-100 position-relative">
        <Input
          style={
            isPassword
              ? showError
                ? { paddingRight: "4rem" }
                : { paddingRight: "2rem" }
              : { paddingRight: "2rem" }
          }
          className={showError ? "input is-invalid" : "input"}
          id={name}
          placeholder={placeholder}
          type={hidePass ? "text" : type}
          {...field}
        />
        {isPassword ? (
          <i
            className={hidePass ? (showError ? "fas fa-eye eye icon-eye" : "fas fa-eye eye") : (showError ? "fas fa-eye-slash eye icon-eye" : "fas fa-eye-slash eye")}
            onClick={handleClickShowPassword}
          />
        ) : null}
      </div>
      {showError && <div className="invalid-feedback d-block mb-error">{errors[name]}</div>}
    </>
  );
}

export default InputFieldPass;
