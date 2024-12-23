import axios from 'axios'

const BASE_URL = process.env.API_URL

export enum ENDPOINTS {
	PROFICIENCY = '/proficiencies',
	ITEM = '/items',
	INGREDIENT = '/ingredients',
	TRADE = '/trade',
	USER = '/users',
	AUTH = '/auth'
}

export default axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' }
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})
