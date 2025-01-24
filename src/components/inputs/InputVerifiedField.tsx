import { useState, useEffect, ChangeEventHandler } from 'react'
import { MdClose, MdCheckCircle, MdInfo } from 'react-icons/md' // Ícones equivalentes da biblioteca react-icons

interface InputVerifiedProps {
  icon: string
  name: string
  value: string
  setValue: ChangeEventHandler<HTMLInputElement>
  Input: React.ComponentType<any>
  legenda: string
  validar: (value: string) => boolean
}

const InputVerified: React.FC<InputVerifiedProps> = ({
  icon,
  name,
  value,
  setValue,
  Input,
  legenda,
  validar,
}) => {
  const [focado, setFocado] = useState<boolean>(false)
  const [validado, setValidado] = useState<boolean>(false)

  useEffect(() => {
    setValidado(validar(value))
  }, [value, validar])

  return (
    <div className={`verified-wrapper ${focado ? 'focused' : ''}`}>
      <div className="verified-wrapper-input">
        <div className="input-wrapper">
          <i className="material-symbols-outlined">{icon}</i>
          <Input
            value={value}
            setValue={setValue}
            name={name}
            setFocado={setFocado}
          />
          <label className="input-label">
            {name.toUpperCase()}
            <MdClose
              className={validado || !value ? 'hide' : 'show iconValid'}
              color="red"
            />
            <MdCheckCircle
              className={validado && value ? 'show iconValid' : 'hide'}
              color="limegreen"
            />
          </label>
        </div>
        <div className="verified-wrapper-icon"></div>
      </div>

      <p
        id="note"
        className={focado && !validado ? 'instructions' : 'offscreen'}
      >
        <MdInfo />
        {legenda}
        <br />
      </p>
    </div>
  )
}

export default InputVerified
