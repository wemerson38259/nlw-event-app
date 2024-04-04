import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'>{
    transparent?: boolean
}

export default function IconButton({ transparent,...props}:IconButtonProps) {
  return (
    <button 
        {...props}  
        className={transparent ? "bg-black/20 py-1.5 px-1.5 border border-white/10 rounded-lg"  : "bg-white/10 py-1.5 px-1.5 border border-white/10 rounded-lg"}
    />
  )
}
