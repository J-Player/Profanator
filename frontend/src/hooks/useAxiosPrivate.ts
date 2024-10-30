import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useAuthContext from './useAuthContext'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = () => {
	const refresh = useRefreshToken()
	const { auth } = useAuthContext()
	useEffect(() => {
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			config => {
				if (!config.headers['Authorization'] && auth?.accessToken) {
					config.headers['Authorization'] = `Bearer ${auth.accessToken}`
				}
				return config
			},
			async error => Promise.reject(error)
		)
		const responseInterceptor = axiosPrivate.interceptors.response.use(
			response => response,
			async error => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest.sent) {
					prevRequest.sent = true
					const response = await refresh()
					prevRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`
					return axiosPrivate(prevRequest)
				}
				return Promise.reject(error)
			}
		)

		return () => {
			axiosPrivate.interceptors.request.eject(requestInterceptor)
			axiosPrivate.interceptors.response.eject(responseInterceptor)
		}
	}, [auth])

	return axiosPrivate
}

export default useAxiosPrivate
