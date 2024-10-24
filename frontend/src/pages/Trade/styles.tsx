import styled from "styled-components";
import { Color } from "../../themes";
import Form from "../../components/form";

const Section = styled.section`
	.trade-menu-wrapper {
		button {
			background-color: transparent;
			color: inherit;
			padding: 1rem;
			&:disabled {
				cursor: default;
			}
			&:not(:disabled):hover {
				background-color: inherit;
				color: ${Color.ORANGE};
			}
		}
	}

	.trade-content-wrapper {
		width: 100%;
		.trade-buy-wrapper {
			display: grid;
			place-content: center;
			gap: 1rem;
		}
		.trade-sell-wrapper {
			display: flex;
			align-items: start;
			justify-content: space-evenly;
			.trade-list {
				margin-top: 1rem;
			}
		}
	}

	${Form} {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: inherit;
			width: 100%;
		}
	}
`

export default Section