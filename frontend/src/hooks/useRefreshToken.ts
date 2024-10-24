import axios, { ENDPOINTS } from "../api/axios"
import useAuthContext from "./useAuthContext"

const useRefreshToken = () => {
	const { setAuth } = useAuthContext()

	const refresh = async () => {
		const response = await axios.get(`${ENDPOINTS.AUTH}/refresh`, {
			withCredentials: true,
		})
		setAuth((prev) => {
			return { ...prev, accessToken: response.data.access_token }
		})
		return response.data.access_token
	}
	return refresh
}

export default useRefreshToken
