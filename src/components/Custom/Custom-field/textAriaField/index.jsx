import PropTypes from 'prop-types';
import React from 'react';

textAriaField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    rows: PropTypes.number,
};

textAriaField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    autoFocus: false,
    rows: 1,
}

function textAriaField(props) {
    const { field,form,
        label, placeholder, autoFocus, rows
    } = props;
    const { name } = field;

    //validation 
      const {errors, touched} = form;
      const showError = errors[name] && touched[name];

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                id={name}
                className={showError ? "form-control is-invalid" : "form-control"}
                {...field}
                placeholder={placeholder}
                autoFocus={autoFocus}
                rows={rows}
            />
            {showError && <div className="invalid-feedback">{errors[name]}</div>}
        </div>
    );
}

export default textAriaField;