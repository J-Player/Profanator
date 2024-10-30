import { createContext } from 'react'
import Pageable from '../types/Pageable'
import Trade from '../models/Trade'

export interface BuyState {
	item: string
	minPrice?: number
	maxPrice?: number
	pageable: Pageable
	tradeList: Trade[]
}

export type BuyAction =
	| { type: 'item'; value: string }
	| { type: 'minprice'; value?: number }
	| { type: 'maxprice'; value?: number }
	| { type: 'tradelist'; value: Trade[] }
	| { type: 'pageable'; value: Pageable }

export interface SellState {
	item?: string
	price?: number
	quantity?: number
	tradeList: Trade[]
	pageable: Pageable
}

export type SellAction =
	| { type: 'item'; value: string }
	| { type: 'price'; value: number }
	| { type: 'quantity'; value: number }
	| { type: 'tradelist'; value: Trade[] }
	| { type: 'pageable'; value: Pageable }

type TradeContextProp = {
	buyState: BuyState
	buyDispatch: React.Dispatch<BuyAction>
	sellState: SellState
	sellDispatch: React.Dispatch<SellAction>
} | null

const TradeContext = createContext<TradeContextProp>(null)

export default TradeContext
