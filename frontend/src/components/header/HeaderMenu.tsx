import { HTMLAttributes, useState } from 'react'
import Login from '../login'
import Modal from '../modal'
import Register from '../register'
import Button from '../button'

type HeaderMenuProps = HTMLAttributes<HTMLDivElement>

enum ShowType {
	NONE,
	LOGIN,
	REGISTER
}

export const HeaderMenu = ({ className }: HeaderMenuProps) => {
	const [show, setShow] = useState<ShowType>(ShowType.NONE)
	return (
		<>
			<div className={className}>
				<Button className="btn-register" onClick={() => setShow(ShowType.REGISTER)}>
					Register
				</Button>
				<Button className="btn-login" onClick={() => setShow(ShowType.LOGIN)}>
					Login
				</Button>
			</div>
			<Modal show={show === ShowType.LOGIN} onClose={() => setShow(ShowType.NONE)}>
				<Login toRegister={() => setShow(ShowType.REGISTER)} onClose={() => setShow(ShowType.NONE)} />
			</Modal>
			<Modal show={show === ShowType.REGISTER} onClose={() => setShow(ShowType.NONE)}>
				<Register toLogin={() => setShow(ShowType.LOGIN)} onClose={() => setShow(ShowType.NONE)} />
			</Modal>
		</>
	)
}
