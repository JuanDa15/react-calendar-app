import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea ({ className, ...others}: Props): JSX.Element {
  return (
    <textarea
      className={`px-4 py-2 rounded-md focus:outline-[2px] focus:outline-sky-600 bg-inherit border-solid border-[1px] border-sky-600 w-full ${className}`}  
      {...others}
    />
  )
}
