import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import useAuthContext from '../../hooks/useAuthContext'

interface AccountProps {
	className?: string
}

const Account = ({ className }: AccountProps) => {
	const { auth } = useAuthContext()
	useEffect(() => {}, [])

	const teste = async () => {
		if (auth) {
			const decoded = jwtDecode(auth?.accessToken)
			console.log(`decoded: ${JSON.stringify(decoded)}`)
		}
		console.log(`teste: ${JSON.stringify(auth)}`)
	}
	return (
		<section className={className}>
			<h1>Account</h1>
			<button onClick={teste}>testa</button>
		</section>
	)
}

export default Account
