import Item from '../models/Item'

const calculate = (item: Item) => {
	if (!item.quantity) throw new Error('Quantity is required.')
	if (item.qtByProduction > 1) {
		if (item.quantity < item.qtByProduction) {
			item.restQt = item.qtByProduction - item.quantity
			item.quantity = item.qtByProduction
		} else if (item.quantity % item.qtByProduction != 0) {
			const newQuantity = Math.floor(item.quantity / item.qtByProduction + 1) * item.qtByProduction
			item.restQt = newQuantity - item.quantity
			item.quantity = newQuantity
		}
	}
	item.ingredients?.forEach(ingredient => {
		if (!item.quantity || !ingredient.quantity) throw new Error('Quantity is required.')
		ingredient.quantity = (ingredient.quantity * item.quantity) / item.qtByProduction
		if (ingredient.ingredients?.length) {
			calculate(ingredient)
		}
	})
	return item
}

export default calculate
