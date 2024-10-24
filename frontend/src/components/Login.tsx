import { FormEvent, useEffect, useRef, useState } from "react"
import Form from "./form"
import styled from "styled-components"
import useAuthContext from "../hooks/useAuthContext"
import Input from "./input"
import Button from "./button"
import axios, { ENDPOINTS } from "../api/axios"

type LoginProps = {
	className?: string
	toRegister: Function
	onClose: Function
}

const Login = ({ className, toRegister, onClose: close }: LoginProps) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const userRef = useRef<HTMLInputElement>(null)
	const { setAuth } = useAuthContext()
	useEffect(() => {
		userRef.current!.focus()
	}, [])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const response = await axios.post<{ access_token: string }>(`${ENDPOINTS.AUTH}/login`, { username, password }, { withCredentials: true })
			if (response.data) {
				setAuth((prev) => {
					console.log(response.data)
					return { ...prev, accessToken: response.data.access_token }
				})
				close()
			}
		} catch (error) {
			console.error(`Erro no login: ${error}`)
		}
	}

	return (
		<section className={className}>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<Input type='text' id='username' ref={userRef} autoComplete='off' onChange={(e) => setUsername(e.target.value)} value={username} required />
				<label htmlFor='password'>Password:</label>
				<Input type='password' id='password' autoComplete='off' onChange={(e) => setPassword(e.target.value)} value={password} required />
				<Button type='submit' disabled={!username || !password} $primary>
					Login
				</Button>
			</Form>
			<span>
				Don't have an account? <button onClick={() => toRegister()}>Register</button>.
			</span>
		</section>
	)
}

const StyledLogin = styled(Login)`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	font-size: 1.1rem;
	margin: 1.1rem;
	min-height: 60vh;
	min-width: 60vh;
	gap: 1rem;
	${Form} {
		align-self: center;
	}
	span > button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		outline: none;
		font-size: inherit;
		color: orange;
		text-decoration: none;
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
`

export default StyledLogin
