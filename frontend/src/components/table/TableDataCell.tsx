import { HTMLAttributes } from "react"

export interface TableDataCellProps extends HTMLAttributes<HTMLTableCellElement> {}

export const TableDataCell = ({ children, ...props }: TableDataCellProps) => {
	return <td {...props}>{children}</td>
}
