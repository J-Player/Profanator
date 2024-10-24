import styled from "styled-components"

const Table = styled.table`
	display: flex;
	flex-direction: column;
	width: 100%;
	& > * {
		display: inherit;
		align-items: inherit;
		flex-direction: inherit;
		width: 100%;
		tr {
			display: inherit;
			justify-content: center;
			align-items: center;
			width: 100%;
			flex: 1 1 0;
			th {
				border-bottom: 2px solid orange;
				&:not(:last-child):hover {
					cursor: pointer;
					color: orange;
				}
				&.active {
					&.asc {
						&::after {
							content: "⬇";
							margin-left: 5px;
						}
					}
					&.desc {
						&::after {
							content: "⬆";
							margin-left: 5px;
						}
					}
				}
			}
			div {
				display: inherit;
				justify-content: inherit;
				align-items: inherit;
				gap: 1rem;
			}
			td,
			th {
				display: inherit;
				justify-content: inherit;
				align-items: inherit;

				height: 100%;

				text-align: center;
				padding: 1rem;
				flex: 1 1 0;
				&:first-child {
					flex: 2 1 0;
				}
			}
			button {
				cursor: pointer;
				height: 2rem;
				width: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	tbody tr {
		border: 1px solid transparent;
		flex: 1;
		&:hover {
			border-color: #aaa;
			background-color: #eee;
		}
	}
`

export default Table