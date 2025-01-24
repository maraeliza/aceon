import React, { ChangeEventHandler } from 'react'

interface InputFieldProps {
  name: string
  value: string
  setValue: ChangeEventHandler<HTMLInputElement>
  Input: React.ComponentType<any> // A tipagem para o componente de entrada genérico
  setFocado: (focado: boolean) => void
  type: string
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  setValue,
  Input,
  setFocado,
}) => {
  return (
    <div className="input-wrapper">
      <Input
        value={value}
        setValue={setValue}
        name={name}
        setFocado={setFocado}
      />
      <label className="input-label">{name.toUpperCase()}</label>
    </div>
  )
}

export default InputField
