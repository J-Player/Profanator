import { Axios } from "axios"
import { ENDPOINTS } from "../api/axios"
import Item from "../models/Item"
import { Page } from "../types/Page"
import Pageable from "../types/Pageable"
import IngredientService from "./IngredientService"
import Service from "./Service"

export default class ItemService extends Service {
	constructor(axios: Axios) {
		super(axios)
	}

	async findById(id: number) {
		return await this.axios.get<Item>(`${ENDPOINTS.ITEM}/${id}`)
	}

	async findByName(name: string) {
		return await this.axios.get<Item>(`${ENDPOINTS.ITEM}`, { params: { name } })
	}

	async findAll(proficiency?: string, pageable?: Pageable) {
		return await this.axios.get<Page<Item>>(`${ENDPOINTS.ITEM}/all`, { params: { proficiency, ...pageable } })
	}

	async buildItem(itemName: string): Promise<Item | undefined> {
		const response = await this.findByName(itemName)
		if (response.data) {
			const item = response.data
			const ingredientService = new IngredientService(this.axios)
			const responseIngredient = await ingredientService.findAll(item.name)
			if (responseIngredient.data?.content.length > 0) {
				if (!item.ingredients) item.ingredients = []
				const ingredientList = responseIngredient.data.content
				for (const ingredient of ingredientList) {
					const ing = await this.buildItem(ingredient.name)
					if (ing) {
						ing.quantity = ingredient.quantity
						item.ingredients.push(ing)
					}
				}
				return item
			} else return item
		} else throw new Error(`Algo deu errado ao construir o item "${itemName}".`)
	}
}
