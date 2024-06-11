import {useEffect} from "react";
import useTheme from "../hooks/useTheme.jsx";

const LightDarkToggleButton = () => {
    const {theme, onChangeTheme} = useTheme();

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }, [theme]);
    return (
        <div className="relative text-dark dark:text-gray-400">
            <button id="toggle" onClick={onChangeTheme}>임시 버튼</button>
        </div>
    );
}

export default LightDarkToggleButton;