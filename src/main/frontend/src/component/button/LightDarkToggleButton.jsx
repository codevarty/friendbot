import {useContext, useEffect} from "react";
import {ThemeContext} from "../context/ThemeProvider.jsx";
import classes from "../../style/button/ToggleButton.module.css";
import {GoSun} from "react-icons/go";
import {RiMoonFill} from "react-icons/ri";

const LightDarkToggleButton = () => {
    const {theme, onChangeTheme} = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme === 'light' ? '' : 'night';
    }, [theme]);
    return (
        <div className={classes.checkboxContainer}>
            <input type="checkbox" className={classes.checkbox} id="toggle" onClick={onChangeTheme}/>
            <label htmlFor="toggle" className={classes.toggleLabel}>
                <GoSun/>
                <RiMoonFill className={classes.night}/>
                <span className={classes.ball}></span>
            </label>
        </div>
    );
}

export default LightDarkToggleButton;