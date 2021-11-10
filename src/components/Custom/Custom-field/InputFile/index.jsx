import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

InputFile.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isLarge: PropTypes.bool,
};
InputFile.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  isLarge: false,
};

function InputFile(props) {
  const { field, form, label, type, isLarge } = props;
  const { name, value } = field;

  //validation
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [files, setFiles] = useState([]);

  const getFileMetadata = (file) => {
    return {
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath,
    };
  };

  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  };

  if (value && value.constructor === String) {
    window.$(`.imgupload${name}`).hide();
    window.$(`.imgupload${name}.stop`).hide();
    window.$(`.imgupload${name}.ok`).show();
    window.$(`#img${name}`).css({ color: "green", "font-weight": 700 });
    window.$(`#img${name}`).html(value);
  }

  const handleChange = (event) => {
    //here we take the file extension and set an array of valid extensions
    let newstate = [];
    var res = window.$(`#${name}`).val();
    var arr = res.split("\\");
    var filename = arr.slice(-1)[0];
    var filextension = filename.split(".");
    var filext = "." + filextension.slice(-1)[0];
    var valid = [".jpg", ".png", ".jpeg"];
    //if file is not valid we show the error icon, the red alert, and hide the submit button
    if (res && valid.indexOf(filext.toLowerCase()) === -1) {
      window.$(`.imgupload${name}`).hide();
      window.$(`.imgupload${name}.ok`).hide();
      window.$(`.imgupload${name}.stop`).show();

      window.$(`#img${name}`).css({ color: "red", "font-weight": 700 });
      window.$(`#img${name}`).html("File " + filename + " Sai Định Dạng!");
    } else if (res) {
      for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        let metadata = getFileMetadata(file);
        let url = URL.createObjectURL(file);
        newstate = [...newstate, { url, metadata }];
        form.setFieldValue(name, file);
      }
      //if file is valid we show the green alert and show the valid submit
      window.$(`.imgupload${name}`).hide();
      window.$(`.imgupload${name}.stop`).hide();
      window.$(`.imgupload${name}.ok`).show();

      window.$(`#img${name}`).css({ color: "green", "font-weight": 700 });
      window.$(`#img${name}`).html(filename);

      setFiles(newstate);
    }
  };

  return (
    <div className={isLarge ? "col-md-12" : "col-md-6 col-md-offset-3 center"}>
      <div className="form-group mb-0">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          name={name}
          id={name}
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(event) => handleChange(event)}
          accept=".png, .jpg, .jpeg"
        />
      </div>
      <div
        className={showError ? "has-error-file control-input" : "control-input"}
        onClick={onButtonClick}
      >
        <div
          className={`imgupload${name}`}
          style={
            isLarge
              ? { display: "flex", justifyContent: "center", margin: "20px 0" }
              : null
          }
        >
          <i className="bx bxs-file-image"></i>
        </div>
        <div className={`imgupload${name} ok mt-3 mb-3`} id="showImage">
          {value && value.constructor === String ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${value}`}
              height="200"
              alt=""
            />
          ) : (
            files.map((item, index) => {
              return (
                <div key={index} className={isLarge ? "d-flex align-items-center justify-content-center" : ""}>
                  <img src={item.url} alt="" height="200" style={isLarge ? {width : "max-content"} : null}/>
                </div>
              );
            })
          )}
        </div>
        <div className={`imgupload${name} stop`}>
          <i className="bx bx-x"></i>
        </div>
      </div>
      {showError && <div className="show-error">{errors[name]}</div>}
    </div>
  );
}

export default InputFile;
