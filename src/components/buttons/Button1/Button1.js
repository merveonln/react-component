import React from "react";
import "./Button1.css";

const Button = ({
  type = "default",
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`custom-btn custom-btn-${type}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

const Button1 = () => {
  return (
    <div className="button1-container">
      <h2>Button Examples</h2>

      <div className="button1-content">
        <Button type="primary">Primary Button</Button>
        <Button type="default">Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
    </div>
  );
};

export default Button1;
export { Button };