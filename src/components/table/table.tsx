import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'> {}

export default function Table(props: TableProps) {
  return (
    <div className="border border-white/10 rounded-lg gap-2.5">
        <table className="w-full" {...props} />
    </div>
  )
}
