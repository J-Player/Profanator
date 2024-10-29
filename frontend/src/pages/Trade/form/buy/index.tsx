import axios from "../../../../api/axios"
import { FormEvent, HtmlHTMLAttributes, useState } from "react"
import { Form } from "react-router-dom"
import Button from "../../../../components/button"
import Input from "../../../../components/input"
import Trade from "../../../../models/Trade"
import TradeService from "../../../../services/TradeService"
import Pageable from "../../../../types/Pageable"
import DataTable from "../../datatable"

import "./index.css"

interface BuyFormProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export default function BuyForm({ className, ...props }: BuyFormProps) {
	const [buyState, setBuyState] = useState({ item: "", min_price: null, max_price: null })
	const [pageable, setPageable] = useState<Pageable>({ page: 0, size: 10, sort: { name: "price", direction: "asc" } })
	const [tradeList, setTradeList] = useState<Trade[]>([])

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		setBuyState((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const tradeService = new TradeService(axios)
		const { item } = buyState
		const min_price = buyState.min_price ?? undefined
		const max_price = buyState.max_price ?? undefined
		tradeService.findAll({ item, min_price, max_price, pageable }).then((res) => {
			setTradeList(res.data.content)
			if (res.data.content.length === 0) {
				alert("No trades found for this item.")
			}
		})
	}

	const sortFn = (str: string) => {
		setPageable((prev) => {
			if (prev.sort?.name === str) {
				return {
					...prev,
					sort: {
						...prev.sort,
						direction: prev.sort?.direction === "asc" ? "desc" : "asc",
					},
				}
			} else {
				return {
					...prev,
					sort: {
						name: str,
						direction: "asc",
					},
				}
			}
		})
	}

	return (
		<div className="buy-form-wrapper" {...props}>
			<Form className='buy-form' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='item'>Item:</label>
					<Input type='text' name='item' id='item' placeholder='Item' onChangeCapture={handleChange} />
				</div>
				<div>
					<label htmlFor='price'>Price:</label>
					<Input
						type='number'
						step={1}
						name='min_price'
						id='min_price'
						placeholder='Min'
						onChangeCapture={handleChange}
					/>
					<Input
						type='number'
						step={1}
						name='max_price'
						id='max_price'
						placeholder='Max'
						onChangeCapture={handleChange}
					/>
				</div>
				<div>
					<Button type='reset'>Reset</Button>
					<Button className='btn-primary' type='submit' disabled={buyState.item.length === 0}>
						Search
					</Button>
				</div>
			</Form>
			{tradeList?.length > 0 && (
				<>
					<span className="text-center">Showing {tradeList.length} results</span>
					<DataTable
						headers={["Item", "Price", "Quantity", "Seller"]}
						data={tradeList}
						pageable={pageable}
						sortFn={sortFn}
						extra={new Map<string, Function>([["menu", () => alert("menu")]])}
					/>
				</>
			)}
		</div>
	)
}
