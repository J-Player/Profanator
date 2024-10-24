import styled from "styled-components"
import { Color } from "../../themes"

const Select = styled.select`
	border: 2px solid ${Color.LIGHT_GRAY};
	outline: none;
	-moz-appearance: none; /* Firefox */
	-webkit-appearance: none; /* Safari and Chrome */
	appearance: none;

	//Arrow
	background-image: url('arrow.svg');
	background-repeat: no-repeat;
	background-position: right 0.7rem top 50%;
	background-size: 0.65rem auto;

	// TODO: ESTILIZAR A DROP-DOWN LIST
	
	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	&:not(:disabled) {
		&:hover,
		&:focus {
			border-color: ${Color.ORANGE};
			cursor: pointer;
		}
	}
`

export default Select
