import { createContext } from "react"

export type AppType = {
	proficiencies?: string[]
	items?: Map<string, string>
}

type AppContextProp<T> = {} | null

const AppContext = createContext<AppContextProp<AppType>>(null)

export default AppContext
