export default interface Item {
	id?: number
	proficiency?: string
	name: string
	qtByProduction: number
	quantity?: number
	restQt?: number
	ingredients?: Item[]
}
