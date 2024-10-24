import { ReactNode } from "react"
import styled from "styled-components"
import { Color } from "../themes"

type Props = {
	className?: string
	children: ReactNode
}

const Main = ({ className, children }: Props) => {
	return <main className={className}>{children}</main>
}

const StyledMain = styled(Main)`
	background-color: ${Color.WHITE};
	color: ${Color.DARK_BLUE};
	border-radius: 0.5rem;
	min-height: 100vh;
	height: 100%;
	width: 80%;
	padding: 5rem;
	margin: 20vh 0;

	display: flex;
	align-items: center;
	flex-direction: column;

	section {
		display: inherit;
		align-items: inherit;
		flex-direction: inherit;
		gap: 1rem;
		h1 {
			font-size: 2rem;
		}
	}
`

export default StyledMain
