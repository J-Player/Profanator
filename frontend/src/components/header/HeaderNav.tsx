import { HTMLAttributes } from "react"
import { Link } from "react-router-dom"

interface HeaderNavProps extends HTMLAttributes<HTMLElement> {
	menu: { path: string; name: string }[]
}

export const HeaderNav = ({ className, menu }: HeaderNavProps) => {
	return (
		<nav className={className}>
			<ul className="flex h-full items-center grow">
				{menu.map((item, index) => {
					return (
						<li className="flex list-none h-full grow" key={index}>
							<Link className='grid grow place-items-center text-inherit no-underline hover:underline' to={item.path}>
								{item.name}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
