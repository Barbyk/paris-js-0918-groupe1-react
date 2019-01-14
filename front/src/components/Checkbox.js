import React  from 'react';

const CheckBox = (props) => {
    return( <div>
    {/* <label for={props.name} className="form-label">{props.title}</label> */}
    <div className="checkbox-group">
      {props.options.map((option) => {
        return (
          <label key={option.name}>
            <input
              className="form-checkbox"
              id = {props.name}
              name={option.id}
              onChange={props.handleChange}
              value={option.name}
              checked={ (props.selectedOptions||[]).includes(option.id)  }
              type="checkbox" /> {option.name}
          </label>
        );
      })}
    </div>
  </div>
);

}

export default CheckBox;