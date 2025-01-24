import React, { useState, ChangeEventHandler } from 'react'

interface InputPasswordProps {
  name: string
  setValue: ChangeEventHandler<HTMLInputElement>
  setFocado: (focado: boolean) => void
}

const InputPassword: React.FC<InputPasswordProps> = ({
  name,
  setValue,
  setFocado,
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)

  return (
    <>
      <input
        type={isPasswordShown ? 'text' : 'password'}
        className="input-field"
        required
        onChange={setValue}
        name={name}
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
      />
      <i
        onClick={() => setIsPasswordShown((prevState) => !prevState)}
        className="material-symbols-outlined eye-icon"
      >
        {isPasswordShown ? 'visibility' : 'visibility_off'}
      </i>
    </>
  )
}

export default InputPassword
