import { FormEvent } from 'react'
import Button from '../../components/button'
import Form from '../../components/form'
import Input from '../../components/input'
import './index.css'
import { Page } from '../../components/page'

const Economy = () => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		alert('Not implemented yet!')
	}
	return (
		<Page className="economy-section" title="Economy">
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
		</Page>
	)
}

export default Economy
