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
	const localCollapse = window.localStorage.getItem('collapsed')
	const [collapsed, setCollapsed] = useState(
		localCollapse ? JSON.parse(localCollapse) : false,
	)

	const handleCollapse = () => {
		window.localStorage.setItem('collapsed', String(!collapsed))
		setCollapsed(!collapsed)
	}

	return (
		<SidebarContext.Provider
			value={{ collapsed, setCollapsed: handleCollapse }}
		>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebarContext = () => {
	const context = useContext(SidebarContext)
	return context
}
