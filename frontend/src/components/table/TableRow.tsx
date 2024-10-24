import { HTMLAttributes } from "react"

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = ({ children, ...props }: TableRowProps) => {
	return <tr {...props}>{children}</tr>
}
