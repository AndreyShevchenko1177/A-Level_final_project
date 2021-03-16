import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import logo from "../images//logo23.jpg";
import { actionGetMessagesByChatId, actionSearchMessagesByChatId } from "../Actions";
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
        <div className={`d-flex align-items-end ${myId === ownerId ? "justify-content-end" : ""}`}>
            <div>
                <div className="avatarka">
                    {avatar && avatar.url ? (
                        <img
                            src={`${urlUploadConst}/${avatar.url}`}
                            className="bg-success border border-2 border-success mb-1"
                        ></img>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center bg-success border border-2 border-success gradient mb-2">
                            <div className="fs-5 text-light fw-bolder">
                                {`${nick.split(" ")[0][0].toUpperCase()}` +
                                    `${
                                        (nick.split(" ").slice(1).pop() &&
                                            nick.split(" ").slice(1).pop()[0].toUpperCase()) ||
                                        ""
                                    }`}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`messageItem list-group-item m-1 gradient shadow-sm border-2 ${
                    myId === ownerId ? "list-group-item-success" : " list-group-item-light"
                }`}
            >
                {/* <span>{`myid: ${myId}`}</span> */}
                {/* <p>{`Login: ${login}, Nick: ${nick}, ownerId: ${ownerId}`}</p> */}
                <div className="lh-sm mb-2 text-success fw-bolder">{`${nick}`}</div>
                <div className="text-dark fs-5 lh-sm">{text}</div>
                <span className="text-success">{`message id: ${_id}`}</span>
                <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                    {dateStr} <span className="visually-hidden">дата сообщения</span>
                </span>
            </div>
        </div>
    );
};

const MessagesList = ({ messages, myId, chatId, getMoreMessages = null }) => {
    const messagesEndRef = useRef(null); // указатель на пустой div  в коце сообщений для перемотки
    const messagesListBlockRef = useRef(null); // для отслеживания скролла
    const [offset, setOffset] = useState(Infinity); // для отслеживания скролла
    const [height, setHeight] = useState(Infinity); // для отслеживания скролла
    const [oldScrollHeight, seOldScrollHeight] = useState(Infinity); // для отслеживания скролла
    const isNeedMoreMessages = useRef(false);

    let arrayOfMessages = messages[chatId];
    // console.log(isNeedMoreMessages.current, arrayOfMessages && arrayOfMessages.length);

    // скролл в самый низ при приходе новых сообщений, scrollIntoView({ behavior: "smooth" }) - плавно
    const scrollToBottom = () => {
        if (height - offset < 10) {
            messagesEndRef.current.scrollIntoView();
        } else {
            messagesListBlockRef.current.scrollTop = messagesListBlockRef.current.scrollHeight - oldScrollHeight;
            // messagesListBlockRef.current.style.overflow = "auto";
        }
        isNeedMoreMessages.current = false;
    };
    useEffect(scrollToBottom, [arrayOfMessages]);

    useEffect(() => {
        // вешаем обработчик скрола
        messagesListBlockRef.current.onscroll = () => {
            setOffset(Math.floor(messagesListBlockRef.current.scrollTop));
            seOldScrollHeight(messagesListBlockRef.current.scrollHeight);
        };
    }, []);

    useEffect(() => {
        setHeight(messagesListBlockRef.current.scrollHeight - messagesListBlockRef.current.clientHeight);
        setTimeout(() => {
            if (offset < 5) {
                if (!isNeedMoreMessages.current) {
                    isNeedMoreMessages.current = true;
                    // messagesListBlockRef.current.style.overflow = "hidden";
                    if (typeof getMoreMessages === "function")
                        getMoreMessages(chatId, arrayOfMessages && arrayOfMessages.length);
                }
            }
        }, 16);
    }, [offset]);

    return (
        <div className="MessagesList" ref={messagesListBlockRef}>
            {!!arrayOfMessages && arrayOfMessages.map((mess) => <MessageItem key={mess._id} {...mess} myId={myId} />)}
            <div ref={messagesEndRef} />
        </div>
    );
};

// скролл вниз при новых сообщениях только если мы на этот момент уже были внизу внизу
// const MessagesList = ({ arrayOfMessages }) => {
//     return (
//         <div className="MessagesList">
//             <ScrollableFeed>
//                 {!!arrayOfMessages && arrayOfMessages.map((mess) => <MessageItem key={mess._id} {...mess} />)}
//             </ScrollableFeed>
//         </div>
//     );
// };

const CMessagesList = connect(
    (s) => ({
        chatId: s.curChatId.curChatId,
        messages: s.msg,
        myId: s.auth && s.auth.payloadId,
    }),
    { getMoreMessages: actionSearchMessagesByChatId }
)(MessagesList);

const Messages = ({ _id = "", chatInfo, messages, getMsg }) => {
    if (chatInfo) chatInfo = chatInfo.filter((chat) => chat._id === _id);

    // id чата,

    // console.log("Messages - id - ", _id);
    // console.log(
    //     "Messages - - ",
    //     !(messages && messages[_id] && messages[_id][0] && messages[_id][0].chat && messages[_id][0].chat._id)
    // );

    let avatar = chatInfo && chatInfo[0] && chatInfo[0].avatar && chatInfo[0].avatar.url;
    let title = chatInfo && chatInfo[0] && chatInfo[0].title;

    useEffect(() => {
        if (
            typeof doSearchMsg === "function" &&
            !(messages && messages[_id] && messages[_id][0] && messages[_id][0].chat && messages[_id][0].chat._id)
        ) {
            // console.log("пошли искать");
            getMsg(_id);
        }
    }, [_id]);

    return (
        <div className="mb-2">
            {chatInfo && chatInfo[0] && (
                <div className="position-relative  mb-3 border-bottom border-2 border-success ">
                    <div className="d-flex justify-content-start align-items-center">
                        <div className="avatarka">
                            {avatar ? (
                                <img
                                    src={`${urlUploadConst}/${avatar}`}
                                    className=" border border-2 border-success"
                                ></img>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center bg-success border border-2 border-success gradient">
                                    <div className="fs-5 text-light fw-bolder">
                                        {title &&
                                            `${title.split(" ")[0][0].toUpperCase()}` +
                                                `${
                                                    (title.split(" ").slice(1).pop() &&
                                                        title.split(" ").slice(1).pop()[0].toUpperCase()) ||
                                                    ""
                                                }`}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="fs-4 fw-bolder ms-2">{`${title}`}</div>
                    </div>

                    <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                        {` _chatId: ${_id}`} <span className="visually-hidden">id чата</span>
                    </span>
                </div>
            )}
            <div>
                <CMessagesList />
            </div>
        </div>
    );
};

const CMessages = connect((s) => ({ _id: s.curChatId.curChatId, messages: s.msg, chatInfo: s.auth.chats }), {
    getMsg: actionGetMessagesByChatId,
})(Messages);
// - id chata

export const ChatMessages = ({ _chatId = "" }) => <div>{!!_chatId && <CMessages />}</div>;
