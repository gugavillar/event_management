'use client'

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react'

type SidebarContextType = {
	collapsed: boolean
	setCollapsed: Dispatch<SetStateAction<boolean>>
}

export const SidebarContext = createContext({} as SidebarContextType)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [collapsed, setCollapsed] = useState(false)

	return (
		<SidebarContext.Provider value={{ collapsed, setCollapsed }}>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebarContext = () => {
	const context = useContext(SidebarContext)
	return context
}
