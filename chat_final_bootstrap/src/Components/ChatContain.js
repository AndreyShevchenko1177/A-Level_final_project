import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images//logo23.jpg";

import { urlConst } from "../const";

const MessageItem = ({ _id, createdAt = 0, text = "", owner: { login = "", nick = "" } }) => {
    let date = new Date(+createdAt);
    let dateStr =
        date.getFullYear().toString().padStart(4, 0) +
        "." +
        (date.getMonth() + 1).toString().padStart(2, 0) +
        "." +
        date.getDate().toString().padStart(2, 0) +
        " - " +
        date.getHours().toString().padStart(2, 0) +
        ":" +
        date.getMinutes().toString().padStart(2, 0);
    // ":" +
    // date.getSeconds().toString().padStart(2, 0);
    return (
        <div>
            <span>{`message id: ${_id}`}</span>
            <br />
            <p>{`Login: ${login}, Nick: ${nick}`}</p>
            <h5>{text}</h5>
            <div>{dateStr}</div>
        </div>
    );
};

const MessagesList = ({ arrayOfMessages, avatar, _id = "", title = "" }) => {
    // id чата, аватар чата
    if (!arrayOfMessages) return <></>;
    return (
        <div className="MessagesList">
            <input placeholder="Serch message"></input>
            <button>Serch</button>
            <div>
                <b>ChatContain</b>
                {` _chatId: ${_id}`}
                <img src={avatar && avatar.url ? urlConst + "/" + avatar.url : logo}></img>
                <span>{`Title: ${title}`}</span>
            </div>
            <div className="MessagesList_map">
                {arrayOfMessages.map((mess) => (
                    <MessageItem key={mess._id} {...mess} {...avatar} />
                ))}
            </div>
        </div>
    );
};

const CMessagesList = connect((s) => ({
    //id чата
    _id:
        s.promise.chatFindOne &&
        s.promise.chatFindOne.payload &&
        s.promise.chatFindOne.payload.data &&
        s.promise.chatFindOne.payload.data.ChatFindOne &&
        s.promise.chatFindOne.payload.data.ChatFindOne._id,
    arrayOfMessages:
        s.promise.chatFindOne &&
        s.promise.chatFindOne.payload &&
        s.promise.chatFindOne.payload.data &&
        s.promise.chatFindOne.payload.data.ChatFindOne &&
        s.promise.chatFindOne.payload.data.ChatFindOne.messages,
    avatar:
        s.promise.chatFindOne &&
        s.promise.chatFindOne.payload &&
        s.promise.chatFindOne.payload.data &&
        s.promise.chatFindOne.payload.data.ChatFindOne &&
        s.promise.chatFindOne.payload.data.ChatFindOne.avatar,
    title:
        s.promise.chatFindOne &&
        s.promise.chatFindOne.payload &&
        s.promise.chatFindOne.payload.data &&
        s.promise.chatFindOne.payload.data.ChatFindOne &&
        s.promise.chatFindOne.payload.data.ChatFindOne.title,
}))(MessagesList);

export const ChatContain = ({ _chatId = "" }) => (
    <div className="ChatContain">
        <div className="CMessagesList">{!!_chatId && <CMessagesList className="CMessagesList" />}</div>
    </div>
);
