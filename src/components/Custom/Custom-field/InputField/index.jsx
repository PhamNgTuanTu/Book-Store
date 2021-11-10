import PropTypes from 'prop-types';
import React from 'react';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    autoFocus: false,
}

function InputField(props) {
    const { field, form,
        label, placeholder, autoFocus, type
    } = props;
    const { name } = field;

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                className={showError ? "form-control is-invalid" : "form-control"}
                {...field}
                placeholder={placeholder}
                autoFocus={autoFocus}
                type={type}
            />
            {showError && <div className="invalid-feedback">{errors[name]}</div>}
        </div>
    );
}

export default InputField;