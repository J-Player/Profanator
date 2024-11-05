import axios from '../api/axios'
import { AuthService } from '../services/AuthService'
import useAuthContext from './useAuthContext'

const useRefreshToken = () => {
	const { setAuth } = useAuthContext()

	const refresh = async () => {
		const authService = new AuthService(axios)
		const response = await authService.refresh()
		setAuth(prev => {
			return { ...prev, accessToken: response.data.access_token }
		})
		return response.data.access_token
	}
	return refresh
}

export default useRefreshToken
