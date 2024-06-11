import LightDarkToggleButton from "../../component/button/LightDarkToggleButton.jsx";


const ChatHeader = ({setType}) => {

    return (
        <div className="flex-between items-center">
            <header>
                <select
                    className="border border-gray-200 rounded-lg"
                    // Custom Select
                    onChange={event => {
                        setType(event.target.value)
                    }}
                >
                    <option value="speaker">영어 회화</option>
                    <option value="counselor">심리 상담사</option>
                    <option value="teacher">진로 멘토</option>
                    <option value="friendr">친구</option>
                </select>

                <LightDarkToggleButton/>
            </header>
        </div>)
}

export default ChatHeader;