import React, { createContext, useState, useContext } from 'react'

const settingsContext = createContext({})

//create a provider component
export const ShowSettingsProvider = ({ settings }) => {
  const [show, setShow] = useState(false)
}

export const useSettingsContext = () => {
  return useContext(settingsContext)
}
