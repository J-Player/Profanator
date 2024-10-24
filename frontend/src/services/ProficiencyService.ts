import { Axios } from "axios"
import { ENDPOINTS } from "../api/axios"
import Proficiency from "../models/Proficiency"
import { Page } from "../types/Page"
import Pageable from "../types/Pageable"
import Service from "./Service"

export default class ProficiencyService extends Service {
	constructor(axios: Axios) {
		super(axios)
	}

	async findById(id: number) {
		return await this.axios.get<Proficiency>(`${ENDPOINTS.PROFICIENCY}/${id}`)
	}

	async findByName(name: string) {
		return await this.axios.get<Proficiency>(`${ENDPOINTS.PROFICIENCY}`, { params: { name } })
	}

	async findAll(pageable?: Pageable) {
		return await this.axios.get<Page<Proficiency>>(`${ENDPOINTS.PROFICIENCY}/all`, { params: { ...pageable } })
	}
}
