import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import styled from "styled-components"
import { Color } from "./themes"
import { useEffect, useState } from "react"

interface Props {
	className?: string
}

const Button = styled.button`
	background-color: ${Color.ORANGE};
	width: 50px;
	height: 50px;
	border-radius: 50%;
	font-size: 1.5rem;
	border: 1px solid black;
	outline: none;
	cursor: pointer;
	position: sticky;
	bottom: 3vw;
	right: 3vw;
	align-self: end;
`

const App = ({ className }: Props) => {
	const [showButton, setShowButton] = useState(false)

	//Sempre que pathname mudar => Volta para o topo da página.
	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}, [pathname])

	useEffect(() => {
		const listener = (e: Event) => {
			setShowButton(window.scrollY !== 0)
		}
		addEventListener("scroll", listener)
		return () => removeEventListener("scroll", listener)
	}, [])

	return (
		<div className={className}>
			<Header />
			<Main>
				<Outlet />
			</Main>
			{showButton && <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>⬆</Button>}
			<Footer />
		</div>
	)
}

const StyledApp = styled(App)`
	font-size: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	${Main} {
		& > section {
			width: 100%;
		}
	}
	${Footer} {
		margin-top: 3vw;
	}
`

export default StyledApp
