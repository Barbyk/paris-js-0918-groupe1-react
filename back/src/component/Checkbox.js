import React  from 'react';

const CheckBox = (props) => {
  console.log(props.selectedOptions)
    return( <div>
    <label for={props.name} className="form-label">{props.title}</label>
    <div className="checkbox-group">
      {props.options.map((option,index) => {
        return (
          <label key={option}>
            <input
              className="form-checkbox"
              id = {props.name}
              name={index+1}
              onChange={props.handleChange}
              value={option}
              checked={ (props.selectedOptions||[]).includes(index+1)  }
              type="checkbox" /> {option}
          </label>
        );
      })}
    </div>
  </div>
);

}

export default CheckBox;