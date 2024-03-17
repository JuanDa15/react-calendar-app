import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element | ReactNode
}

export function Button({ children, className, ...others }: Props): JSX.Element {
  return (
    <button className={`transition-colors rounded-md px-4 py-2 bg-blue-900 hover:bg-blue-600 ${className}`} {...others} >
      { children }
    </button>
  )
}
