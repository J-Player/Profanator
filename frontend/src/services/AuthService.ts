import { ENDPOINTS } from "../api/axios"
import Service from "./Service"

export class AuthService extends Service {

    async login(email: string, password: string) {
        return await this.axios.post(`${ENDPOINTS.AUTH}/login`, { email, password })
    }

    async register(email: string, password: string) {
        return await this.axios.post(`${ENDPOINTS.AUTH}/register`, { email, password })
    }

    async logout() {
        return await this.axios.post(`${ENDPOINTS.AUTH}/logout`)
    }
}
