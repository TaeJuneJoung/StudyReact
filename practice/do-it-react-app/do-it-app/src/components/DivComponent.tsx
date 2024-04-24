import {DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren} from 'react'
import {WidthHeight} from './WidthHeight'

export type ReactDivprops = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type DivProps = ReactDivprops &
  PropsWithChildren<WidthHeight> & {
    src?: string
  }

export const Div: FC<DivProps> = ({
  width,
  height,
  style: _style,
  src,
  className: _className,
  ...props
}) => {
  const style = {..._style, width, height, backgroundImage: src && `url(${src})`}
  const className = ['box-border', src && 'bg-gray-300', _className].join(' ')
  return <div {...props} className={className} style={style} />
}
