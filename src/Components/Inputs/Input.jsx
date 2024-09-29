  import React from "react";

  const Input = ({ type, id, className, placeholder, onChange,autoComplete,value, name, error}) => {
    return (
      <>
        <input
          type={type}
          id={id}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
          value={value}
          name={name}
        />
        <div className="error-div">
        {error && <span className="error-message">{error}</span>}
        </div>
       
      </>
    );
  };

  export default Input;
