import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import { UserService } from '../../services/UserService'

import { Page } from '../../components/page'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './index.css'

const Account = () => {
	const { auth } = useAuthContext()
	const [user, setUser] = useState<User>()
	const axios = useAxiosPrivate()

	useEffect(() => {
		if (!auth) return
		const username = jwtDecode(auth.accessToken).sub!
		const userService = new UserService(axios)
		userService.findByUsername(username).then(setUser)
	}, [auth])

	return (
		user && (
			<Page className="account-section" title="Economy">
				<h1>Account</h1>
				<h2>Olá {user?.username}!</h2>
				<p>🚧 Esta página está em desenvolvimento. 🚧</p>
			</Page>
		)
	)
}

export default Account
