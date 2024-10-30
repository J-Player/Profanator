import { FormEvent } from 'react'
import Button from '../../components/button'
import Form from '../../components/form'
import Input from '../../components/input'
import './index.css'

const Economy = () => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		alert('Not implemented yet!')
	}
	return (
		<section className="economy-section">
			<h1>Economy</h1>
			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="item">Item: </label>
					<Input type="text" name="item" id="item" placeholder="Item" />
				</div>
				<Button $primary disabled>
					Search
				</Button>
			</Form>
		</section>
	)
}

export default Economy
