import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {MdKeyboardVoice} from "react-icons/md";
import {FaRegFaceSmile} from "react-icons/fa6";
import {AiOutlineSend} from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const SearchBarButtons = ({onClick}) => {

    return (
        <ButtonGroup size="lg" style={{background: '#fff'}}>
            <Button variant="none">
                <MdKeyboardVoice/>
            </Button>
            <Button variant="none">
                <FaRegFaceSmile/>
            </Button>
            <Button variant="none" type="submit" onClick={onClick}>
                <AiOutlineSend/>
            </Button>
        </ButtonGroup>
    );
}

export default SearchBarButtons;