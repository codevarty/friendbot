// eslint-disable-next-line no-unused-vars
import React from 'react';
import AudioButton from "../button/AudioButton.jsx"
// eslint-disable-next-line react/prop-types
const SearchBar = ({loading, prompt, setPrompt, type, setChat, promptHandler}) => {


    return (
        <div className="relative flex justify-center items-center p-2">
            <div className="relative max-w-3xl w-full">
                {loading &&
                    <div className="absolute w-full -top-6 text-center text-sm text-gray-400">Loading...</div>}
                <AudioButton type={type} setChat={setChat}/>
                <form>
                    <input type="text"
                           placeholder="Type a new message here"
                           value={prompt}
                           className="block w-full p-4 ps-12 text-gray-900 border-gray-300
                       rounded-3xl bg-gray-100 focus:outline-1 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500 pe-14"
                           onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        disabled={!prompt}
                        className={`absolute end-2.5 bottom-2 rounded-[50%] align-items-center p-3 text-white
                               ${!prompt ? 'disabled disabled:bg-gray-300 dark:disabled:bg-gray-500' : 'bg-gray-900'} hover:bg-gray-500`}
                        onClick={promptHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="size-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
                        </svg>

                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;