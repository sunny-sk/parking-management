import React from "react";

const Input = ({
  title,
  name,
  value,
  onChange,
  required = false,
  type,
  placeholder,
  info,
  ...props
}) => {
  console.log(props);
  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">{title}</label>
        <input
          {...props}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
        {info && (
          <small id="emailHelp" className="form-text text-muted">
            {info}
          </small>
        )}
      </div>
    </>
  );
};

export default Input;
