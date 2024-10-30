import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface HeaderTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	text: string
}

export const HeaderTitle = ({ text, className }: HeaderTitleProps) => {
	return (
		<h1 className={className}>
			<Link className="cursor-pointer text-inherit no-underline" to={'/'}>
				{text}
			</Link>
		</h1>
	)
}
