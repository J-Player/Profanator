import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import useAuthContext from "../../hooks/useAuthContext"

import { HeaderMenu } from "./HeaderMenu"
import { HeaderNav } from "./HeaderNav"
import { HeaderProfile } from "./HeaderProfile"
import { HeaderRoot } from "./HeaderRoot"
import { HeaderTitle } from "./HeaderTitle"

import "./index.css"

const Header = {
	Root: HeaderRoot,
	Title: HeaderTitle,
	Nav: HeaderNav,
	Profile: HeaderProfile,
	Menu: HeaderMenu,
}

const menu = [
	{ path: "/trade", name: "Trade" },
	{ path: "/economy", name: "Economy" },
	{ path: "/calculator", name: "Calculator" },
]

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default ({ className }: HeaderProps) => {
	const { auth } = useAuthContext()
	const [user, setUser] = useState<string>()

	useEffect(() => {
		if (auth) {
			const decoded = jwtDecode(auth.accessToken)
			setUser(decoded.sub!)
		}
	}, [auth])

	return (
		<Header.Root className={className}>
			<Header.Title className='header-title' text='Profanator' />
			<Header.Nav className='header-nav' menu={menu} />
			{auth && user ? (
				<Header.Profile className='header-profile' username={user} />
			) : (
				<Header.Menu className='header-menu' />
			)}
		</Header.Root>
	)
}
