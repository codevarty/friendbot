import classes from '../../style/chat/messageContainer.module.css';


// eslint-disable-next-line react/prop-types
const MessageContainer = ({chatList}) => {

    return (
        <div className={classes.container}>
            {/* eslint-disable-next-line react/prop-types */}
            {chatList !== null && chatList.map((chat, index) => (
                <div key={index} className={classes.messageContainer}>
                    <div
                        className={`${classes.message} 
                        ${chat.type === "user" ? classes.userMessage : classes.botMessage}`}
                    >
                        {chat.content}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default MessageContainer;