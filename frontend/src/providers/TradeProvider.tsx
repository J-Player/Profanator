import { useReducer } from "react"
import TradeContext, { BuyAction, BuyState, SellAction, SellState } from "../contexts/TradeContext"

const buyReducer = (state: BuyState, action: BuyAction): BuyState => {
	switch (action.type) {
		case "item":
			return { ...state, item: action.value }
		case "minprice":
			return { ...state, minPrice: action.value }
		case "maxprice":
			return { ...state, maxPrice: action.value }
		case "pageable":
			return { ...state, pageable: action.value }
		case "tradelist":
			return { ...state, tradeList: action.value }
		case "pageable":
			return { ...state, pageable: action.value }
		default:
			return state
	}
}

const sellReducer = (state: SellState, action: SellAction): SellState => {
	switch (action.type) {
		case "item":
			return { ...state, item: action.value }
		case "price":
			return { ...state, price: action.value }
		case "quantity":
			return { ...state, quantity: action.value }
		case "tradelist":
			return { ...state, tradeList: action.value }
		case "pageable":
			return { ...state, pageable: action.value }
		default:
			return state
	}
}

type TradeProviderProp = {
	children: React.ReactNode
}

const TradeProvider = ({ children }: TradeProviderProp) => {
	const [buyState, buyDispatch] = useReducer(buyReducer, {
		item: "",
		pageable: { page: 0, sort: "price", direction: "asc" },
		tradeList: [],
	})

	const [sellState, sellDispatch] = useReducer(sellReducer, {
		pageable: { page: 0, sort: "price", direction: "asc" },
		tradeList: [],
	})

	return (
		<TradeContext.Provider value={{ buyState, buyDispatch, sellState, sellDispatch }}>{children}</TradeContext.Provider>
	)
}

export default TradeProvider
