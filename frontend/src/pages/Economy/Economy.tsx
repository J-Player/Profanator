import styled from "styled-components"
import Form from "../../components/form"
import { FormEvent } from "react"
import Input from "../../components/input"
import Button from "../../components/button"

interface Props {
	className?: string
}

const Economy = ({ className }: Props) => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
	}
	return (
		<section className={className}>
			<h1>Economy</h1>
			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="item">Item: </label>
					<Input type="text" name="item" id="item" />
				</div>
				<Button $primary>Search</Button>
			</Form>
		</section>
	)
}

const StyledEconomy = styled(Economy)`
	align-items: flex-start;
	${Form} {
		div {
			display: flex;
			align-items: center;
			gap: 1rem;
		}
	}
`

export default StyledEconomy
