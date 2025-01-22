import React, { ChangeEventHandler } from "react";

interface CustomInputProps {
  name: string;
  setValue: ChangeEventHandler<HTMLInputElement>;
  setFocado: (focado: boolean) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, setValue, setFocado }) => {
  return (
    <input
      type="text"
      name={name}
      className="input-field"
      required
      onChange={setValue}
      onFocus={() => setFocado(true)}
      onBlur={() => setFocado(false)}
    />
  );
};

export default CustomInput;
