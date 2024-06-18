// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line react/prop-types
const SearchBar = ({prompt, setPrompt, promptHandler, audioHandler}) => {


    return (
        <div className="relative flex justify-center items-center p-2">
            <div className="relative max-w-3xl w-full">
                <button className="absolute start-3 bottom-3.5 hover:cursor-pointer"
                        onClick={audioHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z"/>
                        <path
                            d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z"/>
                    </svg>
                </button>
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