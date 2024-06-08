import React from 'react';
// eslint-disable-next-line react/prop-types
const SearchBar = ({prompt, setPrompt, onClick}) => {

    return (
        <div>
            {/*<InputGroup>*/}
            {/*    <Form.Control*/}
            {/*        placeholder="Type a new message here"*/}
            {/*        aria-label="Type a new message here"*/}
            {/*        aria-describedby="basic-addon2"*/}
            {/*        value={prompt}*/}
            {/*        onChange={(e) => setPrompt(e.target.value)}*/}
            {/*    />*/}
            {/*    <ButtonGroup size="lg" style={{background: '#fff'}}>*/}
            {/*        <Button variant="none">*/}
            {/*            <MdKeyboardVoice/>*/}
            {/*        </Button>*/}
            {/*        <Button variant="none">*/}
            {/*            <FaRegFaceSmile/>*/}
            {/*        </Button>*/}
            {/*        <Button variant="none" type="submit" onClick={onClick}>*/}
            {/*            <AiOutlineSend/>*/}
            {/*        </Button>*/}
            {/*    </ButtonGroup>*/}
            {/*</InputGroup>*/}
        </div>
    );
}

export default SearchBar;