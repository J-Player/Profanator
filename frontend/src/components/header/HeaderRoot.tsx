import React, { HTMLAttributes } from "react"

interface HeaderRootProps extends HTMLAttributes<HTMLElement> {
	children: React.ReactNode
}

export const HeaderRoot = ({ className, children }: HeaderRootProps) => {
	return <header className={className}>{children}</header>
}
