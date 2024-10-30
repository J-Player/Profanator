export default interface Pageable {
	page?: number
	size?: number
	sort?: { name: string; direction: 'asc' | 'desc' }
}
