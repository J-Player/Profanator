import { jwtDecode } from "jwt-decode"
import { FormEvent, useState } from "react"
import { Form } from "react-router-dom"
import Button from "../../../../components/button"
import Input from "../../../../components/input"
import useAuthContext from "../../../../hooks/useAuthContext"
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate"
import TradeService from "../../../../services/TradeService"

export default function SellForm() {
	const [sellState, setSellState] = useState({ item: "", price: 0, quantity: 0 })
	const ax = useAxiosPrivate()
	const { auth } = useAuthContext()
	const tradeService = new TradeService(ax)

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		setSellState((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		tradeService
			.saveTrade({
				item: sellState.item,
				price: sellState.price,
				quantity: sellState.quantity,
				seller: jwtDecode(auth?.accessToken as string).sub ?? "",
			})
			.then((res) => {
				alert(res.data)
			})
	}

	return (
		<Form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='item'>Item:</label>
				<Input type='text' name='item' id='item' placeholder='Item' onChangeCapture={handleChange} />
			</div>
			<div>
				<label htmlFor='price'>Quantity:</label>
				<Input
					type='number'
					step={1}
					name='quantity'
					id='quantity'
					placeholder='Quantity'
					onChangeCapture={handleChange}
				/>
			</div>
			<div>
				<label htmlFor='price'>Price:</label>
				<Input type='number' step={1} name='price' id='price' placeholder='Price' onChangeCapture={handleChange} />
			</div>
			<div>
				<Button type='reset'>Reset</Button>
				<Button $primary type='submit'>
					Sell
				</Button>
			</div>
		</Form>
	)
}
