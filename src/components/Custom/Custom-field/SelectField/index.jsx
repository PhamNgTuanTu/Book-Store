import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import { FormFeedback } from "reactstrap";

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
};
SelectField.defaultProps = {
  label: "",
  placeholder: "",
  options: null,
};

function SelectField(props) {
  const { field, form, label, placeholder, setData } = props;
  let { options } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const customStyle = {
    clearIndicator: (provided, state) => {},
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  // covert sang dạng value, label react-select
  if (name === "tinh") {
    options =
      options &&
      options.map((item) => {
        return {
          value: item.ProvinceID,
          label: item.ProvinceName,
        };
      });
  } else if (name === "huyen") {
    options =
      options &&
      options.map((item) => {
        return {
          value: item.DistrictID,
          label: item.DistrictName,
        };
      });
  } else {
    options =
      options &&
      options.map((item) => {
        return {
          value: item.WardCode,
          label: item.WardName,
        };
      });
  }

  const selectedOption =
    options && options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;
    setData(selectedValue);
    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        options={options}
        placeholder={placeholder}
        isRequired
        className={showError ? "is-invalid" : ""}
        styles={customStyle}
        noOptionsMessage={() => 'Không tìm thấy dữ liệu.'}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </div>
  );
}

export default SelectField;
