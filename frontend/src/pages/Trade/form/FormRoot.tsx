import React from "react"

interface FormRootProps {
	children: React.ReactNode
}

export default function FormRoot({ children }: FormRootProps) {
	return <div>{children}</div>
}
