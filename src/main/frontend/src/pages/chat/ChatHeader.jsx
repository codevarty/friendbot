import Form from 'react-bootstrap/Form';
import classes from '../../style/chat/Header.module.css'
import LightDarkToggleButton from "../../component/button/LightDarkToggleButton.jsx";

// eslint-disable-next-line react/prop-types
const ChatHeader = ({setType}) => {

    return (
        <div className={classes.root}>
            <header className='flex-between'>
                <Form.Select
                    bsPrefix={classes.select} // Custom Select
                    size="lg"
                    aria-label="select model type"
                    onChange={event => {
                        setType(event.target.value)
                    }}
                >
                    <option value="speaker">영어 회화</option>
                    <option value="counselor">심리 상담사</option>
                    <option value="teacher">진로 멘토</option>
                    <option value="friendr">친구</option>
                </Form.Select>

                <LightDarkToggleButton/>
            </header>
        </div>)
}

export default ChatHeader;