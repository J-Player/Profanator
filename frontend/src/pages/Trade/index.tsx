import { FormEvent, useState } from "react"
import axios from "../../api/axios"
import Button from "../../components/button"
import Form from "../../components/form"
import Input from "../../components/input"
import useAuthContext from "../../hooks/useAuthContext"
import Trade from "../../models/Trade"
import TradeService from "../../services/TradeService"
import Pageable from "../../types/Pageable"
import DataTable from "./Datatable"
import Section from "./styles"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { jwtDecode } from "jwt-decode"

const BuyForm = () => {
	const [buyState, setBuyState] = useState({ item: "", price_min: null, price_max: null })
	const [pageable, setPageable] = useState<Pageable>({ page: 0, size: 10, sort: { name: "price", direction: "asc" } })
	const [tradeList, setTradeList] = useState<Trade[]>([])

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		setBuyState((prev) => ({ ...prev, [name]: value || null }))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const tradeService = new TradeService(axios)
		const { item } = buyState
		const min_price = buyState.price_min ?? undefined
		const max_price = buyState.price_max ?? undefined
		tradeService.findAll({ item, min_price, max_price, pageable }).then((res) => {
			setTradeList(res.data.content)
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
		<div>
			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='item'>Item:</label>
					<Input type='text' name='item' id='item' placeholder='Item' onChangeCapture={handleChange} />
				</div>
				<div>
					<label htmlFor='price'>Price:</label>
					<Input
						type='number'
						step={1}
						name='price_min'
						id='price_min'
						placeholder='Min'
						onChangeCapture={handleChange}
					/>
					<Input
						type='number'
						step={1}
						name='price_max'
						id='price_max'
						placeholder='Max'
						onChangeCapture={handleChange}
					/>
				</div>
				<div>
					<Button type='reset'>Reset</Button>
					<Button $primary type='submit'>
						Search
					</Button>
				</div>
			</Form>
			{tradeList && (
				<DataTable
					headers={["Item", "Price", "Quantity", "Seller"]}
					data={tradeList}
					pageable={pageable}
					sortFn={sortFn}
					extra={new Map<string, Function>([["menu", () => alert("menu")]])}
				/>
			)}
		</div>
	)
}

const SellForm = () => {
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
		tradeService.saveTrade({
			item: sellState.item,
			price: sellState.price,
			quantity: sellState.quantity,
			seller: jwtDecode(auth?.accessToken as string).sub ?? "",
		}).then((res) => {
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

const TradePage = () => {
	const { auth } = useAuthContext()
	const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
	const toggleTradeType = () => setTradeType(tradeType === "sell" ? "buy" : "sell")
	return (
		<Section>
			<h1>Trade</h1>
			{auth && (
				<div>
					<button onClick={toggleTradeType} disabled={tradeType === "sell"}>
						Sell
					</button>
					<button onClick={toggleTradeType} disabled={tradeType === "buy"}>
						Buy
					</button>
				</div>
			)}
			{tradeType === "buy" ? <BuyForm /> : <SellForm />}
		</Section>
	)
}

export default TradePage
