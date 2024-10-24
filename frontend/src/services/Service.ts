import { Axios } from "axios"
import Pageable from "../types/Pageable"

export default abstract class Service {
	constructor(protected readonly axios: Axios) {}

	protected parseParams(paramsWithoutPageable: any, pageable?: Pageable) {
		const p: Record<string, any> = { ...paramsWithoutPageable }
		if (pageable) {
			if (pageable.page) p["page"] = pageable.page
			if (pageable.size) p["size"] = pageable.size
			if (pageable.sort) {
				if (pageable.sort.name && pageable.sort.direction)
					p["sort"] = `${pageable.sort.name},${pageable.sort.direction}`
			}
		}
		return p
	}
}
