import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends ComponentProps<'td'>{}

export default function TableCell({className,...props}: TableCellProps) {
  return (
    <td  className={twMerge("py-3 px-4 text-sm text-zinc-500 text-left",className)} {...props}/>
  )
}
