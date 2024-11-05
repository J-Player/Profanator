import { ENDPOINTS } from '../api/axios'
import Service from './Service'

export class UserService extends Service {
	async findByUsername(username: string) {
		return await this.axios.get<User>(`${ENDPOINTS.USER}?username=${username}`).then(res => res.data)
	}
}
