import styled from "styled-components"
import Input from "../input"
import Button from "../button"

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	* {
		font-size: inherit;
	}
	${Input}, ${Button}, select {
		border-radius: 0.5rem;
		padding: 0.5rem;
		flex: 1 1 0;
	}
	select option {
		color: black;
	}
`

export default Form
