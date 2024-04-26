import {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react'

export type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type inputProps = ReactInputProps & {}

export const Input: FC<inputProps> = ({className: _className, ...props}) => {
  const className = ['input', _className].join(' ')
  return <input {...props} className={className} />
}
