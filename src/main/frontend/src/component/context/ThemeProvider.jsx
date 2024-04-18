import React from "react";
import useTheme from "../hooks/useTheme.jsx";

const defaultValue = {
    theme: "light",
    onChangeTheme: () => {
    },
}

export const ThemeContext = React.createContext(defaultValue);

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({children}) => {
    const themeProps = useTheme();

    return (
        <ThemeContext.Provider value={themeProps}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;