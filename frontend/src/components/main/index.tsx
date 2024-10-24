import { HTMLAttributes } from "react"
import "./index.css"

interface MainProps extends HTMLAttributes<HTMLElement> {}

export default function Main({ className, children }: MainProps) {
	return (
		<main className={className}>
			{children}
		</main>
	)
}
