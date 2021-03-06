import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import logo from "../images//logo23.jpg";
import { actionSearchMessagesByChatId } from "../Actions";
import ScrollableFeed from "react-scrollable-feed";
import { urlConst } from "../const";

const MessageItem = ({
    _id,
    createdAt = 0,
    text = "",
    owner: { _id: ownerId, login = "", nick = "", avatar },
    myId,
}) => {
    // первый _id - messageId

    if (!nick) nick = login;
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
        // <div className="list-group-item list-group-item-success m-2 gradient shadow-sm border-2">
        <div
            className={`messageItem list-group-item m-2 gradient shadow-sm border-2 ${
                myId === ownerId
                    ? "start-right list-group-item-success text-success"
                    : " list-group-item-light text-red"
            }`}
        >
            {/*  */}
            {avatar && avatar.url ? (
                <img src={`${urlConst}/${avatar.url}`}></img>
            ) : (
                <div className="bg-success border border-2 border-success gradient">
                    {/* <i class="fs-3 text-light bi bi-chat-dots "></i> */}
                    <p className="fs-5 text-light fw-bolder">
                        {`${title.split(" ")[0][0].toUpperCase()}` +
                            `${
                                (title.split(" ").slice(1).pop() && title.split(" ").slice(1).pop()[0].toUpperCase()) ||
                                ""
                            }`}
                    </p>
                </div>
            )}

            {/*  */}
            {/* <span>{`myid: ${myId}`}</span> */}
            <span>{`message id: ${_id}`}</span>
            <br />
            <p>{`Login: ${login}, Nick: ${nick}, ownerId: ${ownerId}`}</p>
            <h5>{text}</h5>
            <div>{dateStr}</div>
        </div>
    );
};

const MessagesList = ({ arrayOfMessages, myId }) => {
    const messagesEndRef = useRef(null);

    //FIXME: подмена myId
    if (myId) myId = "5e97105693e2915e617c6fc1";

    // скролл в самый низ при приходе новых сообщений
    const scrollToBottom = () => messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

    useEffect(scrollToBottom, [arrayOfMessages]);

    return (
        <div className="Messages_map">
            {/* //FIXME: */}
            {/* {myId} */}
            {!!arrayOfMessages && arrayOfMessages.map((mess) => <MessageItem key={mess._id} {...mess} myId={myId} />)}
            <div ref={messagesEndRef} />
        </div>
    );
};

// скролл вниз при новых сообщениях только если мы ща уже внизу
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
        myId: s.auth && s.auth.payloadId,
    }),
    {}
)(MessagesList);

const Messages = ({ arrayOfMessages, avatar, _id = "", title = "No Title", doSearchMsg }) => {
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
            <input
                placeholder="Search message"
                onInput={(e) => setSearchMsgStr(e.target.value)}
                className="form-control mb-2 p-2 border border-success border-2"
            ></input>
            {/* <span>🔍</span> */}
            <div className=" messagesTitle mb-3 border border-3 border-success p-2">
                {/* <img src={avatar && avatar.url ? urlConst + "/" + avatar.url : logo}></img> */}

                {avatar && avatar.url ? (
                    <img src={`${urlConst}/${avatar.url}`}></img>
                ) : (
                    <div className="bg-success border border-2 border-success gradient">
                        {/* <i class="fs-3 text-light bi bi-chat-dots "></i> */}
                        <p className="fs-5 text-light fw-bolder">
                            {title &&
                                `${title.split(" ")[0][0].toUpperCase()}` +
                                    `${
                                        (title.split(" ").slice(1).pop() &&
                                            title.split(" ").slice(1).pop()[0].toUpperCase()) ||
                                        ""
                                    }`}
                        </p>
                    </div>
                )}

                <span className="ms-2 fs-4 fw-bolder">{`Title: ${title}`}</span>
                {` _chatId: ${_id}`}
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
