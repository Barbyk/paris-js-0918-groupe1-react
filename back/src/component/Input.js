import React  from 'react';
const Input= ({label, name, value, handleChange, isRequired})=>{
    return (
        <div className="form-group">
                <label class="control-label">{label}</label>
                <input
                    className="form-control"
                    type="text"
                    name={name}
                    onChange={handleChange}
                    value={value}
                    id={name}
                    required={isRequired}
                />
            </div>
    )
}
export default Input;
