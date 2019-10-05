import React from "react";
import Input from "../Input/Input";
import CheckboxUI from "@material-ui/core/Checkbox";

import classesSass from "./Form.module.scss";

export const Form = props => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(e);
      }}
      noValidate
      className={classesSass.Form}
    >
      {props.children}
    </form>
  );
};

export default Form;

export const Checkbox = props => (
  <CheckboxUI
    {...props}
    style={{
      transform: "translateX(-25%)"
    }}
    id={props.config.id}
    name={props.config.id}
    checked={props.config.value === props.config.id}
    color={props.config.color ? props.config.color : "primary"}
  />
);

export { Input };

// For native selects we have no other way to change displayed value after the selection.
// We need this for example when selecting country code.
// So we are creating 2 inputs one for the native list and one that will just display anything we want via renderVal prop
export const NativeSelect = props => {
  return (
    <div style={props.style} className={classesSass.NativeSelect}>
      <Input
        className={classesSass.RenderedInput}
        {...props}
        config={{ ...props.config, native: false, selectList: [] }}
      />
      {/* hidden native input, showing the native optimised list  */}
      <Input
        className={classesSass.HiddenInput}
        {...props}
        config={{ ...props.config, native: true }}
        renderVal={props.renderVal}
      />
    </div>
  );
};
