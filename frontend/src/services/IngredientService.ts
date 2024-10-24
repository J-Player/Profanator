import { Axios } from "axios"
import { ENDPOINTS } from "../api/axios"
import Ingredient from "../models/Ingredient"
import { Page } from "../types/Page"
import Pageable from "../types/Pageable"
import Service from "./Service"

export default class IngredientService extends Service {
	constructor(axios: Axios) {
		super(axios)
	}

	async findById(id: number) {
		return await this.axios.get<Ingredient>(`${ENDPOINTS.INGREDIENT}/${id}`)
	}

	async findAll(item?: string, pageable?: Pageable) {
		return await this.axios.get<Page<Ingredient>>(`${ENDPOINTS.INGREDIENT}/all`, { params: { item, ...pageable } })
	}
}
