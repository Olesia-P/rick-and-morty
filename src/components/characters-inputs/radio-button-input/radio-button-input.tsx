import React from "react";
import css from "./radio-button-input.module.scss";
type RadioButtonInputProps = {
  values: { value: string; render: string }[];
  mainState: any;
  setState: (option: { value: string; render: string }) => void;
  statePropertyToChange: string;
  title: string;
};

export const RadioButtonInput = ({
  values,
  setState,
  statePropertyToChange,
  title,
  mainState,
}: RadioButtonInputProps) => {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>{title}</legend>
      {values.map((element) => (
        <label key={element.value}>
          <input
            type="radio"
            value={`${element}`}
            checked={mainState[statePropertyToChange] === element.value}
            onChange={() => {
              setState(element);
            }}
          />
          {element.render}
        </label>
      ))}
    </fieldset>
  );
};
