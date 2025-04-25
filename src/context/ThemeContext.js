import {createContext, useReducer} from 'react';
import { themeReducer } from './reducer/ThemeReducer';
import { TOGGLE_THEME } from './ActionTypes';


const initialState = {
  theme: 'light'
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = (data) => {
    const newTheme = data === 'light' ? 'dark' : 'light'

    dispatch({type: TOGGLE_THEME, payload:newTheme})
  }

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}