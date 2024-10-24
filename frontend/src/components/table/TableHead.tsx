import { HTMLAttributes } from "react"

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHead = ({ children, ...props }: TableHeadProps) => {
	return <thead {...props}>{children}</thead>
}
