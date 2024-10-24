import { HTMLAttributes } from "react"

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = ({ children, ...props }: TableBodyProps) => {
	return <tbody {...props}>{children}</tbody>
}
