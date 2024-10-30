import { useEffect } from 'react'
import usePortal from '../../hooks/usePortal'

type ModalProps = {
	show: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal = ({ children, show, onClose: close }: ModalProps) => {
	const handlerClose = () => {
		if (document.body.style.overflow === 'hidden') document.body.style.overflow = 'visible'
		close()
	}
	useEffect(() => {
		const keyListener = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handlerClose()
		}
		const clickListener = (e: MouseEvent) => {
			if (!(e.target instanceof HTMLDivElement)) return
			if (e.target.id === 'modal') handlerClose()
		}
		addEventListener('keyup', keyListener)
		addEventListener('click', clickListener)
		return () => {
			removeEventListener('keyup', keyListener)
			removeEventListener('click', clickListener)
		}
	}, [])

	useEffect(() => {
		document.body.style.overflow = show ? 'hidden' : 'visible'
	}, [show])

	if (show) {
		window.scrollTo({ top: 0 })
		return usePortal(
			<div id="modal" className="fixed inset-0 z-[1000] grid place-items-center bg-black/[0.5]">
				<div className="sticky top-1/2 z-[inherit] flex -translate-y-1/2 flex-col justify-center gap-4 rounded-2xl bg-white p-4">
					<button
						className="cursor-pointer self-end border-none bg-transparent text-dark-blue outline-none hover:cursor-pointer hover:text-red focus:text-red"
						onClick={handlerClose}>
						✖
					</button>
					{children}
				</div>
			</div>
		)
	}
}

export default Modal
