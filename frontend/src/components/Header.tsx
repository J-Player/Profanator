import { styled } from "styled-components"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { Color } from "../themes"
import Register from "./Register"
import Login from "./Login"
import Modal from "./modal"
import { ENDPOINTS } from "../api/axios"
import { jwtDecode } from "jwt-decode"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const menu = [
	{ path: "/trade", name: "Trade" },
	{ path: "/economy", name: "Economy" },
	{ path: "/calculator", name: "Calculator" },
]

type HeaderProps = {
	className?: string
}

const enum ShowType {
	NONE,
	LOGIN,
	REGISTER,
}

const Header = ({ className }: HeaderProps) => {
	const { auth, setAuth } = useAuthContext()
	const [show, setShow] = useState<ShowType>(ShowType.NONE)
	const [user, setUser] = useState<string>()
	const navigate = useNavigate()
	const axios = useAxiosPrivate()

	const handleLogout = async () => {
		try {
			const response = await axios.post(`${ENDPOINTS.AUTH}/logout`)
			if (response && response.status === 200) {
				setAuth(null)
				localStorage.clear()
					navigate("/", { replace: true })
			}
		} catch (error) {
			console.log(`Error no logout: ${error}`)
		}
	}

	useEffect(() => {
		if (auth) {
			const decoded = jwtDecode(auth.accessToken)
			setUser(decoded.sub)
		}
	}, [auth])
	
	return (
		<>
			<header className={className}>
				<h1>
					<Link to={"/"}>Profanator</Link>
				</h1>
				<nav>
					<ul>
						{menu.map((item, index) => {
							return (
								<li key={index}>
									<Link to={item.path}>{item.name}</Link>
								</li>
							)
						})}
					</ul>
				</nav>
				<div>
					{!auth ? (
						<div className='btn-wrapper'>
							<button onClick={() => setShow(ShowType.REGISTER)} className="btn-register">Register</button>
							<button onClick={() => setShow(ShowType.LOGIN)} className="btn-login">Login</button>
						</div>
					) : (
						<div className='profile-wrapper'>
							<span><Link to={'/account'}>{user}</Link></span>
							<button className='logout' onClick={handleLogout}>
								Logout
							</button>
						</div>
					)}
				</div>
				<Modal
					children={<Login toRegister={() => setShow(ShowType.REGISTER)} onClose={() => setShow(ShowType.NONE)} />}
					show={show === ShowType.LOGIN}
					onClose={() => setShow(ShowType.NONE)}
				/>
				<Modal
					children={<Register toLogin={() => setShow(ShowType.LOGIN)} onClose={() => setShow(ShowType.NONE)} />}
					show={show === ShowType.REGISTER}
					onClose={() => setShow(ShowType.NONE)}
				/>
			</header>
		</>
	)
}

const StyledHeader = styled(Header)`
	background-color: ${({ theme }) => theme.components.header.background};
	color: ${({ theme }) => theme.components.header.primary};
	display: flex;
	justify-content: space-between;
	height: 15vh;
	width: 100%;
	position: sticky;
	overflow: hidden;
	top: 0;
	z-index: 1;
	gap: 10vw;
	h1 {
		align-self: center;
		margin-left: 5%;
		user-select: none;
		a {
			cursor: pointer;
			color: inherit;
			text-decoration: none;
		}
	}
	nav {
		display: flex;
		flex: 1 1 0;
		justify-content: center;
		height: 100%;
		ul {
			display: flex;
			align-items: center;
			flex-grow: 1;
			li {
				display: inherit;
				list-style: none;
				height: 100%;
				flex-grow: 1;
				a {
					flex-grow: 1;
					display: grid;
					place-items: center;
					color: inherit;
					text-decoration: none;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
	.btn-wrapper {
		margin-right: 10vw;
		height: 100%;
		display: flex;
		align-items: center;
		gap: 1rem;
		.btn-register {
			text-decoration: none;
			border-radius: 0.5rem;
			border: 1px solid ${Color.WHITE};
			color: ${Color.WHITE};
			&:hover {
				background-color: ${Color.WHITE};
				color: ${Color.BLACK};
			}
		}
		.btn-login {}
	}
	.profile-wrapper {
		align-self: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		background-color: whitesmoke;
		height: 100%;
		width: 15vw;
		color: ${Color.BLACK};
		padding: 1rem;
		.logout {
			text-decoration: none;
			border-radius: 0.5rem;
			border: 1px solid ${Color.RED};
			color: ${Color.RED};
			&:hover {
				background-color: ${Color.RED};
				color: ${Color.WHITE};
			}
		}
	}
	button {
		background-color: transparent;
		color: inherit;
		font-size: inherit;
		border: none;
		outline: none;
		padding: 0.5rem 1rem;
		transition: all 0.2s;
		&:hover,
		&:focus {
			cursor: pointer;
		}
	}
`

export default StyledHeader
