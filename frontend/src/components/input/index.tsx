import styled from "styled-components"
import { Color } from "../../themes"

const Input = styled.input`
	border: 2px solid ${Color.LIGHT_GRAY};
	outline: none;
	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	&:not(:disabled) {
		&:hover,
		&:focus {
			border-color: ${Color.ORANGE};
		}
	}
`

export default Input
