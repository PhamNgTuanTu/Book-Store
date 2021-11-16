import React from "react";
import Select from "react-select";

SelectSearch.propTypes = {};

function SelectSearch(props) {
  const { label, name, placeholder, setValues, getLabel, loading } = props;
  let { options } = props;
  options =
    options &&
    options.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;
    const selectedLabel = selectedOption
      ? selectedOption.label
      : selectedOption;

    if (selectedValue !== null) {
      if (getLabel) {
        setValues((preState) => ({
          ...preState,
          [name]: selectedLabel,
        }));
      } else {
        setValues((preState) => ({
          ...preState,
          [name]: selectedValue,
        }));
      }
    } else {
      setValues((preState) => ({
        ...preState,
        [name]: "",
      }));
    }
  };
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        id={name}
        onChange={handleSelectedOptionChange}
        options={options}
        placeholder={placeholder}
        isClearable
        isLoading={loading}
      />
    </div>
  );
}

export default SelectSearch;
