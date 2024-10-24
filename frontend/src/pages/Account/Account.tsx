import { useEffect, useState } from "react"
import useAuthContext from "../../hooks/useAuthContext"
import { jwtDecode } from "jwt-decode"

interface AccountProps {
	className?: string
}

const Account = ({ className }: AccountProps) => {
	const { auth } = useAuthContext()
	const [obj, setObj] = useState({})
	useEffect(() => {

	}, [])

	const teste =async () => {
		if (auth) {
			let decoded = jwtDecode(auth?.accessToken)
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
