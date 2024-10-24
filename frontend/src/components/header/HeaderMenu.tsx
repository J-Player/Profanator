import { HTMLAttributes, useState } from "react"
import Login from "../login"
import Modal from "../modal"
import Register from "../register"
import Button from "../button"

interface HeaderMenuProps extends HTMLAttributes<HTMLDivElement> {}

enum ShowType {
	NONE,
	LOGIN,
	REGISTER,
}

export const HeaderMenu = ({ className }: HeaderMenuProps) => {
	const [show, setShow] = useState<ShowType>(ShowType.NONE)
	return (
		<>
			<div className={className}>
				<Button className='btn-register' onClick={() => setShow(ShowType.REGISTER)}>
					Register
				</Button>
				<Button className='btn-login' onClick={() => setShow(ShowType.LOGIN)}>
					Login
				</Button>
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
		</>
	)
}
