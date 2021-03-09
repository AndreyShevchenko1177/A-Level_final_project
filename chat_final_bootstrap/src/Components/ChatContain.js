import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import logo from "../images//logo23.jpg";
import { actionSearchMessagesByChatId, actionGetMessagesByChatId } from "../Actions";
import ScrollableFeed from "react-scrollable-feed";
import { urlUploadConst } from "../const";

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
        <div
            className={`messageItem list-group-item m-2 gradient shadow-sm border-2 ${
                myId === ownerId ? "start-right list-group-item-success text-success" : " list-group-item-light"
            }`}
        >
            {/*  */}

            <div className="roundIcon">
                {avatar && avatar.url ? (
                    <img
                        src={`${urlUploadConst}/${avatar.url}`}
                        className="bg-success border border-2 border-success"
                    ></img>
                ) : (
                    <div className="bg-success border border-2 border-success gradient middleHeight">
                        <p className="fs-5 text-light fw-bolder">
                            {`${nick.split(" ")[0][0].toUpperCase()}` +
                                `${
                                    (nick.split(" ").slice(1).pop() &&
                                        nick.split(" ").slice(1).pop()[0].toUpperCase()) ||
                                    ""
                                }`}
                        </p>
                    </div>
                )}
            </div>

            {/*  */}
            {/* <span>{`myid: ${myId}`}</span> */}

            {/* <p>{`Login: ${login}, Nick: ${nick}, ownerId: ${ownerId}`}</p> */}
            <div className="middleHeight mb-3">
                <p className="text-dark fs-5 lh-sm">{`${nick}`}</p>
            </div>
            <div className="text-dark fs-5 lh-sm">{text}</div>
            <span>{`message id: ${_id}`}</span>
            <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                {dateStr} <span className="visually-hidden">id чата</span>
            </span>
            {/* <div className="fs-6 text-end text-secondary">{dateStr}</div> */}
        </div>
    );
};

const MessagesList = ({ messages, myId, chatId }) => {
    const messagesEndRef = useRef(null); // указатель на пустой div  в коце сообщений для перемотки

    let arrayOfMessages = messages[chatId];

    // скролл в самый низ при приходе новых сообщений
    const scrollToBottom = () => messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

    useEffect(scrollToBottom, [arrayOfMessages]);

    return (
        <div className="Messages_map">
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
        //FIXME: приконнектить массив сообщений
        chatId:
            s.promise.MessageFind &&
            s.promise.MessageFind.payload &&
            s.promise.MessageFind.payload.data &&
            s.promise.MessageFind.payload.data.MessageFind &&
            s.promise.MessageFind.payload.data.MessageFind[0] &&
            s.promise.MessageFind.payload.data.MessageFind[0].chat &&
            s.promise.MessageFind.payload.data.MessageFind[0].chat._id,
        messages: s.msg,
        myId: s.auth && s.auth.payloadId,
    }),
    {}
)(MessagesList);

const Messages = ({ _id = "", messages, getMsg }) => {
    // id чата,

    let avatar = messages && messages[_id] && messages[_id][0] && messages[_id][0].chat && messages[_id][0].chat.avatar;
    let title = messages && messages[_id] && messages[_id][0] && messages[_id][0].chat && messages[_id][0].chat.title;

    useEffect(() => {
        if (typeof doSearchMsg === "function") getMsg(_id);
    }, [_id]);

    // useEffect(() => {
    //     if (typeof doSearchMsg === "function") doSearchMsg(_id, searchMsgStr);
    // }, []);

    return (
        <div className="Messages">
            {/* <input
                placeholder="Search message"
                onInput={(e) => setSearchMsgStr(e.target.value)}
                className="form-control mb-2 p-2 border border-success border-2"
            ></input> */}
            {/* <span>🔍</span> */}
            <div className="position-relative">
                <div className="messagesTitle mb-3 border-bottom border-2 border-success p-2 roundIcon">
                    {avatar && avatar.url ? (
                        <img src={`${urlUploadConst}/${avatar.url}`}></img>
                    ) : (
                        <div className="bg-success border border-2 border-success gradient">
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
                    <div className="middleHeight">
                        <p className="fs-4 fw-bolder">{`${title}`}</p>
                    </div>
                </div>
                <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                    {` _chatId: ${_id}`} <span className="visually-hidden">id чата</span>
                </span>
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
            s.promise.MessageFind &&
            s.promise.MessageFind.payload &&
            s.promise.MessageFind.payload.data &&
            s.promise.MessageFind.payload.data.MessageFind &&
            s.promise.MessageFind.payload.data.MessageFind[0] &&
            s.promise.MessageFind.payload.data.MessageFind[0].chat &&
            s.promise.MessageFind.payload.data.MessageFind[0].chat._id,
        messages: s.msg,
        //     s.promise.chatFindOne.payload &&
        //     s.promise.chatFindOne.payload.data &&
        //     s.promise.chatFindOne.payload.data.ChatFindOne &&
        //     s.promise.chatFindOne.payload.data.ChatFindOne.messages,
        // avatar:
        //     s.promise.MessageFind &&
        //     s.promise.MessageFind.payload &&
        //     s.promise.MessageFind.payload.data &&
        //     s.promise.MessageFind.payload.data.MessageFind &&
        //     s.promise.MessageFind.payload.data.MessageFind[0] &&
        //     s.promise.MessageFind.payload.data.MessageFind[0].chat &&
        //     s.promise.MessageFind.payload.data.MessageFind[0].chat.avatar,
        // title:
        //     s.promise.MessageFind &&
        //     s.promise.MessageFind.payload &&
        //     s.promise.MessageFind.payload.data &&
        //     s.promise.MessageFind.payload.data.MessageFind &&
        //     s.promise.MessageFind.payload.data.MessageFind[0] &&
        //     s.promise.MessageFind.payload.data.MessageFind[0].chat &&
        //     s.promise.MessageFind.payload.data.MessageFind[0].chat.title,
    }),
    { getMsg: actionGetMessagesByChatId }
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
