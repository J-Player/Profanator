import { useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import usePortal from "../../hooks/usePortal"

type ModalProps = {
	className?: string
	show: boolean
	onClose: Function
	children: React.ReactNode
}

const Modal = ({ className, children, show, onClose: close }: ModalProps) => {
	const overlay = document.getElementById("overlay")
	const handlerClose = () => {
		if (document.body.style.overflow === "hidden") document.body.style.overflow = "visible"
		close()
	}
	useEffect(() => {
		const keyListener = (e: KeyboardEvent) => {
			if (e.key === "Escape") handlerClose()
		}
		const clickListener = (e: MouseEvent) => {
			if (!(e.target instanceof HTMLDivElement)) return
			if (e.target.className === className) handlerClose()
		}
		addEventListener("keyup", keyListener)
		addEventListener("click", clickListener)
		return () => {
			removeEventListener("keyup", keyListener)
			removeEventListener("click", clickListener)
		}
	}, [])

	useEffect(() => {
		document.body.style.overflow = show ? "hidden" : "visible"
	}, [show])

	if (show) {
		window.scrollTo({ top: 0 })
		return usePortal(
			<div className={className}>
				<div>
					<button onClick={handlerClose}>✖</button>
					{children}
				</div>
			</div>
		)
	}
}

const StyledModal = styled(Modal)`
	position: fixed;
	inset: 0;
	z-index: 1000;

	background-color: rgba(0, 0, 0, 0.5);
	display: grid;
	place-items: center;

	& > div {
		display: flex;
		justify-content: center;
		flex-direction: column;
		background-color: white;
		border-radius: 1rem;
		gap: 1rem;
		padding: 1rem;
		z-index: inherit;
		position: sticky;
		top: 50%;
		transform: translateY(-50%);
		& > button {
			background-color: transparent;
			border: none;
			outline: none;
			align-self: end;
			cursor: pointer;
		}
	}
`

export default StyledModal
