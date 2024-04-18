import {useCallback, useState} from "react";

// custom Hook
const useTheme = () => {
    const [theme, setTheme] = useState('light');

    const onChangeTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    }, [])

    return {
        theme,
        onChangeTheme,
    };
}

export default useTheme;