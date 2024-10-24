import styled from "styled-components"
import { Color } from "../../themes"

interface ButtonProps {
	$primary?: boolean
}

const Button = styled.button<ButtonProps>`
	background-color: ${({$primary}) => $primary && Color.DARK_BLUE || Color.LIGHT_GRAY};
	color: ${({$primary}) => $primary && Color.WHITE || Color.BLACK};
	border-color: ${({$primary}) => $primary && Color.WHITE || Color.BLACK};
	outline: none;
	border: 1px solid transparent;
	&:disabled {
		cursor: not-allowed;
		opacity: .5;
	}
	&:not(:disabled) {
		&:hover,
		&:focus {
			cursor: pointer;
			background-color: ${Color.ORANGE};
			color: ${Color.BLACK};
		}
	}
`

export default Button
