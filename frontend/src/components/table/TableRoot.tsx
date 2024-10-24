import React, { HTMLAttributes } from "react"

interface TableRootProps extends HTMLAttributes<HTMLTableElement> {}

export default function TableRoot({ children, ...props }: TableRootProps) {
	return <table {...props}>{children}</table>
}
