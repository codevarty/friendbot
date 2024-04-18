import "../../style/button/button.css"
import microphone from "../../assets/microphone.png"
import audioStop from '../../assets/stop-media.png';

// eslint-disable-next-line react/prop-types
const AudioButton = ({isToggle, onClick}) => {

    const imgSrc = isToggle ? microphone : audioStop;

    return (
        <button onClick={onClick}>
            <img src={imgSrc} alt='audio' width="80" height="80s"/>
        </button>);
}

export default AudioButton;