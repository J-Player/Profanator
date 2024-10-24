import styled from "styled-components"

export default styled.section`
	align-items: start !important;
	display: flex;
	flex-direction: column;
	div.line {
		width: 100%;
		height: 2px;
		background-color: orange;
		margin-top: -1rem;
	}
	& > div:not(.line) {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: calc(100% - 1rem);
		div.line {
			margin-top: -1rem;
		}
	}
	p {
		text-indent: 1rem;
	}
`