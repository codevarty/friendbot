import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import classes from "../../style/chat/SearchBar.module.css";
import SearchBarButtons from "./button/SearchBarButtons.jsx";


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
                <SearchBarButtons onClick={onClick}/>
            </InputGroup>
        </div>
    );
}

export default SearchBar;