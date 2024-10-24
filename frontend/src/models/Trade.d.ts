export default interface Trade {
	id?: number
	item: string
	quantity: number
	price: number
	seller: string
	createdAt?: Date
	updatedAt?: Date
}
