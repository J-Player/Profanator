export interface Page<T> {
	content: T[]
	pageable: {
		pageNumber: number
		pageSize: number
		sort: {
			empty: boolean
			unsorted: boolean
			sorted: boolean
		}
		offset: number
		paged: boolean
		unpaged: boolean
	}
	last: boolean
	totalPages: number
	totalElements: number
	size: number
	number: number
	sort: {
		empty: boolean
		unsorted: boolean
		sorted: boolean
	}
	numberOfElements: number
	first: boolean
	empty: boolean
}
