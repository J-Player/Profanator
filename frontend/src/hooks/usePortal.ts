import { createPortal } from "react-dom"

const usePortal = (children: React.ReactNode) => {
	const OVERLAY = document.getElementById("overlay")
	if (OVERLAY) return createPortal(children, OVERLAY)
}

export default usePortal
