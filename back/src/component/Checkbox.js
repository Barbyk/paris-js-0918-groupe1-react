import React  from 'react';

const CheckBox = (props) => {
    return( <div>
    <label for={props.name} className="form-label">{props.title}</label>
    <div className="checkbox-group">
      {props.options.map((option,index) => {
        return (
          <label key={option}>
            <input
              className="form-checkbox"
              id = {props.name}
              name={index}
              onChange={props.handleChange}
              value={option}
              checked={ props.selectedOptions.indexOf(index.toString()) > -1 }
              type="checkbox" /> {option}
          </label>
        );
      })}
    </div>
  </div>
);

}

export default CheckBox;