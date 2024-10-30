import { HTMLAttributes } from 'react'
import './index.css'

type MainProps = HTMLAttributes<HTMLElement>

export default function Main({ children, ...props }: MainProps) {
	return <main {...props}>{children}</main>
}
