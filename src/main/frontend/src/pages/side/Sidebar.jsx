import logo from '../../assets/logo.webp'

// eslint-disable-next-line react/prop-types
export default function Sidebar({children}) {
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm dark:bg-gray-800 dark:border-gray-500">
                <div className="p-4 pb-2 flex justify-center items-center">
                    <img src={logo} alt="logo" className="w-24 rounded-md shadow-lg" />
                </div>
                <ul className="flex-1 px-3">{children}</ul>

                <div className="border-t flex p-3">
                    <img src="https://source.boringavatars.com/marble/500/hisu" alt="profile" className="w-10 h-10 rounded-md" />
                    <div className="ml-3 w-full flex justify-between items-center overflow-hidden">
                        <div className="leading-4">
                            <h4 className="font-semibold">hisu jeong</h4>
                        </div>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer hover:bg-gray-100 rounded-md" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                  d="M12 6h.01M12 12h.01M12 18h.01"/>
                        </svg>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

// 사이드바 아이템
// eslint-disable-next-line react/prop-types
export function SidebarItem({icon, text, active}) {
    return (
        <li className={`p-2 rounded-md flex justify-between items-center
        border border-gray-200 ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}>
            <span className="w-52">{text}</span>
            {icon}
        </li>
    );
}