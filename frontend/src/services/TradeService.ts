import { Axios } from "axios"
import { ENDPOINTS } from "../api/axios"
import Trade from "../models/Trade"
import { Page } from "../types/Page"
import Pageable from "../types/Pageable"
import Service from "./Service"

export default class TradeService extends Service {
	constructor(axios: Axios) {
		super(axios)
	}

	async findById(id: number) {
		return await this.axios.get(`${ENDPOINTS.TRADE}/${id}`)
	}

	async findAll(params: { item: string; min_price?: number; max_price?: number; seller?: string; pageable?: Pageable }) {
		const { pageable, ...paramsWithoutPageable } = params
		const p: Record<string, any> = this.parseParams(paramsWithoutPageable, pageable)
		return await this.axios.get<Page<Trade>>(`${ENDPOINTS.TRADE}/all`, {
			params: { ...p },
		})
	}

	async findAllBySeller(seller: string, pageable?: Pageable) {
		const p: Record<string, any> = this.parseParams({ seller: seller }, pageable)
		return await this.axios.get<Page<Trade>>(`${ENDPOINTS.TRADE}/${seller}/all`, {
			params: { ...p },
		})
	}

	async saveTrade(data: Trade) {
		return await this.axios.post<Trade>(`${ENDPOINTS.TRADE}`, data)
	}

	async updateTrade(id: number, data: Trade) {
		return await this.axios.put<Trade>(`${ENDPOINTS.TRADE}/${id}`, data)
	}

	async deleteTrade(id: number) {
		return await this.axios.delete(`${ENDPOINTS.TRADE}/${id}`)
	}
}
