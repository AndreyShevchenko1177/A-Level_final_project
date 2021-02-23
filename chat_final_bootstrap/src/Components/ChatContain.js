import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import logo from "../images//logo23.jpg";
import { actionSearchMessagesByChatId } from "../Actions";
import ScrollableFeed from "react-scrollable-feed";

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

const MessagesList = ({ arrayOfMessages }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

    useEffect(scrollToBottom, [arrayOfMessages]);

    return (
        <div className="Messages_map">
            {!!arrayOfMessages && arrayOfMessages.map((mess) => <MessageItem key={mess._id} {...mess} />)}
            <div ref={messagesEndRef} />
        </div>
    );
};

// const MessagesList = ({ arrayOfMessages }) => {
//     return (
//         <div className="Messages_map">
//             <ScrollableFeed>
//                 {!!arrayOfMessages && arrayOfMessages.map((mess) => <MessageItem key={mess._id} {...mess} />)}
//             </ScrollableFeed>
//         </div>
//     );
// };

const CMessagesList = connect(
    (s) => ({
        arrayOfMessages:
            s.promise.MessageFind &&
            s.promise.MessageFind.payload &&
            s.promise.MessageFind.payload.data &&
            s.promise.MessageFind.payload.data.MessageFind,
    }),
    {}
)(MessagesList);

const Messages = ({ arrayOfMessages, avatar, _id = "", title = "", doSearchMsg }) => {
    // id чата, аватар чата

    const [searchMsgStr, setSearchMsgStr] = useState("");

    useEffect(() => {
        if (typeof doSearchMsg === "function") doSearchMsg(_id, searchMsgStr);
    }, [searchMsgStr, _id]);

    useEffect(() => {
        if (typeof doSearchMsg === "function") doSearchMsg(_id, searchMsgStr);
    }, []);

    return (
        <div className="Messages">
            <input placeholder="Serch message" onInput={(e) => setSearchMsgStr(e.target.value)}></input>
            <span>🔍</span>
            <div>
                <b>ChatContain</b>
                {` _chatId: ${_id}`}
                <img src={avatar && avatar.url ? urlConst + "/" + avatar.url : logo}></img>
                <span>{`Title: ${title}`}</span>
            </div>
            <div>
                <CMessagesList />
            </div>
        </div>
    );
};

const CMessages = connect(
    (s) => ({
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
    }),
    { doSearchMsg: actionSearchMessagesByChatId }
)(Messages);

// const CMessagesList = connect((s) => ({
//     //id чата
//     _id:
//         s.promise.MessageFind &&
//         s.promise.MessageFind.payload &&
//         s.promise.MessageFind.payload.data &&
//         s.promise.MessageFind.payload.data.MessageFind &&
//         s.promise.MessageFind.payload.data.MessageFind[0] &&
//         s.promise.MessageFind.payload.data.MessageFind[0].chat &&
//         s.promise.MessageFind.payload.data.MessageFind[0].chat._id,
//     arrayOfMessages:
//         s.promise.MessageFind &&
//         s.promise.MessageFind.payload &&
//         s.promise.MessageFind.payload.data &&
//         s.promise.MessageFind.payload.data.MessageFind,
//     avatar:
//         s.promise.MessageFind &&
//         s.promise.MessageFind.payload &&
//         s.promise.MessageFind.payload.data &&
//         s.promise.MessageFind.payload.data.MessageFind &&
//         s.promise.MessageFind.payload.data.MessageFind[0] &&
//         s.promise.MessageFind.payload.data.MessageFind[0].chat &&
//         s.promise.MessageFind.payload.data.MessageFind[0].chat.avatar,
//     title:
//         s.promise.MessageFind &&
//         s.promise.MessageFind.payload &&
//         s.promise.MessageFind.payload.data &&
//         s.promise.MessageFind.payload.data.MessageFind &&
//         s.promise.MessageFind.payload.data.MessageFind[0] &&
//         s.promise.MessageFind.payload.data.MessageFind[0].chat &&
//         s.promise.MessageFind.payload.data.MessageFind[0].chat.title,
// }))(MessagesList);

export const ChatContain = ({ _chatId = "" }) => (
    <div className="ChatContain">
        <div>{!!_chatId && <CMessages />}</div>
    </div>
);
