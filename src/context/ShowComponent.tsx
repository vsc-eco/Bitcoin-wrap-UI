// context/ShowComponentContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ShowComponentContextProps {
  showComponent: boolean
  toggleShowComponent: () => void
}

const ShowComponentContext = createContext<
  ShowComponentContextProps | undefined
>(undefined) //initialiized undefined

export const ShowComponentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showComponent, setShowComponent] = useState(false)

  const toggleShowComponent = () => {
    setShowComponent(prevShowComponent => !prevShowComponent)
  }

  return (
    <ShowComponentContext.Provider
      value={{ showComponent, toggleShowComponent }}
    >
      {children}
    </ShowComponentContext.Provider>
  )
}

export const useShowComponent = () => {
  const context = useContext(ShowComponentContext)
  if (!context) {
    throw new Error(
      'useShowComponent must be used within a ShowComponentProvider',
    )
  }
  return context
}
