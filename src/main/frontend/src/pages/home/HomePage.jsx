import Main from "../chat/Main.jsx";
import Sidebar, {SidebarItem} from "../side/Sidebar.jsx";


const HomePage = () => {


    return (
        <div className="flex">
            <Sidebar>
                <hr className="my-3" />
                <SidebarItem icon={<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 12h14m-7 7V5"/>
                </svg>
                }
                text="new Chat"
                />
            </Sidebar>
            <Main/>
        </div>
    );
}

export default HomePage;