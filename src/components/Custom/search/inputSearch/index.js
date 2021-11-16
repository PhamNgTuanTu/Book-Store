import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

InputSearch.propTypes = {

};

function InputSearch(props) {
    const { label, name, placeholder, setValues, type, value } = props;

    const handleChange = (e) => {
        let valueInput = e.target.value;
        if (valueInput !== "") {
            if (type === "text") {
                setValues((preState) => ({
                    ...preState,
                    [name]: valueInput,
                }));
            } else {
                setValues((preState) => ({
                    ...preState,
                    [name]: valueInput.replace(/[^0-9]/g, ""),
                }));
            }
        } else {
            setValues((preState) => ({
                ...preState,
                [name]: "",
            }));
        }
    }
    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input type="text" name={name} id={name} value={value[name]} placeholder={placeholder} onChange={handleChange} autoComplete="false"/>
        </FormGroup>
    );
}

export default InputSearch;