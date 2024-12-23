import { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import axios, { ENDPOINTS } from '../../api/axios'
import Button from '../button'
import Input from '../input'
import Section from '../section'

import './index.css'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^[^\s]{4,24}$/

type RegisterProps = {
	className?: string
	toLogin: () => void
	onClose: () => void
}

const Register = ({ toLogin, onClose: close }: RegisterProps) => {
	const userRef = useRef<HTMLInputElement>(null)
	const errRef = useRef<HTMLParagraphElement>(null)

	const [username, setUsername] = useState('')
	const [userFocus, setUserFocus] = useState(false)
	const [validName, setValidName] = useState(false)
	const [password, setPassword] = useState('')
	const [matchPassword, setMatchPassword] = useState('')
	const [validPassword, setValidPassword] = useState(false)
	const [validMatch, setValidMatch] = useState(false)
	const [matchFocus, setMatchFocus] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		userRef.current!.focus()
	}, [])

	useEffect(() => {
		setValidName(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
		setValidMatch(password === matchPassword)
	}, [password, matchPassword])

	useEffect(() => {
		setErrorMessage('')
	}, [username, password, matchPassword])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		//if button enabled with JS hack
		const v1 = USER_REGEX.test(username)
		const v2 = PWD_REGEX.test(password)
		if (!v1 || !v2) {
			setErrorMessage('')
			return
		}
		const response = await axios.post(`${ENDPOINTS.AUTH}/register`, {
			username: username,
			password: password
		})
		if (response) close()
	}

	return (
		<Section className="register-form">
			<p ref={errRef} className={errorMessage ? 'errmsg' : ''}>
				{errorMessage}
			</p>
			<h1>Register</h1>
			<Form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<Input
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					onChange={e => setUsername(e.target.value)}
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
					required
				/>
				<p id="uidnote" className={userFocus && username && !validName ? 'instructions' : ''}>
					4 to 24 characters.
					<br />
					Must begin with a letter.
					<br />
					Letters, numbers, underscores, hyphens allowed.
				</p>
				<label htmlFor="password">Password:</label>
				<Input type="password" id="password" onChange={e => setPassword(e.target.value)} required />
				<label htmlFor="confirm_pwd">Confirm Password:</label>
				<Input
					type="password"
					id="confirm_pwd"
					onChange={e => setMatchPassword(e.target.value)}
					value={matchPassword}
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
					required
				/>
				<p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : ''}>
					Must match the first password input field.
				</p>
				<Button type="submit" disabled={!validName || !validPassword || !validMatch} $primary>
					Sign Up
				</Button>
			</Form>
			<span>
				Already have an account? <button onClick={() => toLogin()}>Login</button>.
			</span>
		</Section>
	)
}

export default Register
