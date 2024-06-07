
import classes from "../../style/chat/SearchBar.module.css";
import {MdKeyboardVoice} from "react-icons/md";
import {FaRegFaceSmile} from "react-icons/fa6";
import {AiOutlineSend} from "react-icons/ai";


// eslint-disable-next-line react/prop-types
const SearchBar = ({prompt, setPrompt, onClick}) => {
    const inputClassName = classes.searchBar + ' mb3';

    return (
        <div className={classes.container}>
            <InputGroup className={inputClassName}>
                <Form.Control
                    placeholder="Type a new message here"
                    aria-label="Type a new message here"
                    aria-describedby="basic-addon2"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
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
            </InputGroup>
        </div>
    );
}

export default SearchBar;