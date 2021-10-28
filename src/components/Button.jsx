import React from "react";

export const Button = ({ id, onClick, children, icon }) => {
  return (
    <button id={id} onClick={onClick}>
      {icon} {children}
    </button>
  );
}