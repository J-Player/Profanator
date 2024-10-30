import { HTMLAttributes } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import useAuthContext from '../../hooks/useAuthContext'
import { AuthService } from '../../services/AuthService'

interface HeaderProfileProps extends HTMLAttributes<HTMLDivElement> {
	username: string
}

export const HeaderProfile = ({ className, username }: HeaderProfileProps) => {
	const { setAuth } = useAuthContext()
	const authService = new AuthService(axios)
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			const response = await authService.logout()
			if (response && response.status === 200) {
				setAuth(null)
				localStorage.clear()
				navigate('/', { replace: true })
			}
		} catch (error) {
			console.log(`Error no logout: ${error}`)
		}
	}

	return (
		<div className={className}>
			<span>
				<Link to={'/account'}>{username}</Link>
			</span>
			<button className="btn-logout" onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}
