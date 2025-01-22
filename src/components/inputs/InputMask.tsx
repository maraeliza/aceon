import React, { ChangeEvent } from "react";
import InputMask from 'react-input-mask'

const onlyNumbers = (str: string): string => str.replace(/[^0-9]/g, "");

const setMask = (name: string): string | undefined => {
  if (name.toLowerCase() === "cnpj") {
    return "99.999.999/9999-99";
  } else if (name.toLowerCase() === "cpf") {
    return "999.999.999-99";
  }
  return undefined; // Caso o nome não seja "cnpj" nem "cpf"
};

interface MaskedInputProps {
  value: string;
  setValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const MaskedInput: React.FC<MaskedInputProps> = ({ value, setValue, name }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <InputMask
      name={name}
      mask={setMask(name)}
      value={value}
      onChange={handleChange}
      className="input-field"
      required
    />
  );
};

export default MaskedInput;
