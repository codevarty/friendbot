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
        <div className="w-auto mx-4 text-dark dark:text-gray-400">
            <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
                <input
                    type='checkbox'
                    onChange={onChangeTheme}
                    className='sr-only'
                />
                <span className='label flex items-center text-sm font-medium text-black dark:text-white'>
          Light
        </span>
                <span
                    className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                        theme === 'light' ? 'bg-[#212b36]' : 'bg-[#58D68D]'
                    }`}
                >
          <span
              className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                  theme === 'light' ? 'translate-x-[28px]' : ''
              }`}
          ></span>
        </span>
                <span className='label flex items-center text-sm font-medium text-black dark:text-white'>
          Dark
        </span>
            </label>
        </div>
    );
}

export default LightDarkToggleButton;