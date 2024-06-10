// eslint-disable-next-line react/prop-types
const SearchBar = ({prompt, setPrompt, onClick}) => {

    return (
        <div className="relative flex justify-center items-center p-2">
            <div className="relative max-w-3xl w-full">
                <input type="text"
                       placeholder="Type a new message here"
                       value={prompt}
                       className="block w-full p-4 ps-6 text-gray-900 border-gray-300
                       rounded-3xl bg-gray-100 focus:outline-1 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500"
                       onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    className="absolute end-2.5 bottom-2 rounded-[50%] align-items-center p-3 bg-gray-900 text-white"
                    onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor" className="size-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
                    </svg>

                </button>
            </div>
        </div>
    );
}

export default SearchBar;