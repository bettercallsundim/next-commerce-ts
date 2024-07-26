import React, { ChangeEvent } from "react";

type Props<T> = {
  type?: string;
  label?: string;
  state: T;
  setState?: React.Dispatch<React.SetStateAction<T>>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  label,
  state,
  setState,
  onChange,
}: Props<typeof state>) => {
  if (type === "textarea") {
    return (
      <div>
        <label htmlFor="">{label}</label>
        <p>
          <input
            type="text"
            value={state}
            onChange={(e) => {
              if (onChange) onChange(e);
              else setState(e.target.value);
            }}
          />
        </p>
      </div>
    );
  }
  return (
    <div>
      <label htmlFor="">{label}</label>
      <p>
        <input
          type="text"
          value={state}
          onChange={(e) => {
            if (onChange) onChange(e);
            else setState(e.target.value);
          }}
        />
      </p>
    </div>
  );
};

export default Input;
