import { HTMLAttributes, ReactNode } from "react"

interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
	children: ReactNode
}

const TableHeaderCell = ({ children, ...props }: TableHeaderCellProps) => {
	return <th {...props}>{children}</th>
}

export default TableHeaderCell
