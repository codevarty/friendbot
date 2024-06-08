import {useContext, useEffect} from "react";
import {ThemeContext} from "../context/ThemeProvider.jsx";
import {GoSun} from "react-icons/go";
import {RiMoonFill} from "react-icons/ri";

const LightDarkToggleButton = () => {
    const {theme, onChangeTheme} = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme === 'light' ? '' : 'night';
    }, [theme]);
    return (
        <div>
            <input type="checkbox" id="toggle" onClick={onChangeTheme}/>
            <label htmlFor="toggle">
                <GoSun/>
                <RiMoonFill />
                <span></span>
            </label>
        </div>
    );
}

export default LightDarkToggleButton;