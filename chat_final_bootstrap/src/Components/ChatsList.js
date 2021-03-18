import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlUploadConst } from "../const";
import { Link } from "react-router-dom";
import { CCounter } from "../Components";
import personFillIcon from "../icons/person-fill.svg";
import history from "../history";
import { useEffect } from "react";
import { useState } from "react";

const ChatItem = ({ _id = "", avatar, title, currentChatId }) => {
    // здесь _id, avatar, title - чата,
    // currentChatId - текущий выбраный чат
    // console.log("ChatItem - ", _id, currentChatId);

    return (
        <Link to={`/main/${_id}`} className="noUnderLine">
            <>
                <li
                    className={
                        _id === currentChatId
                            ? "list-group-item list-group-item-success m-1 gradient shadow border-2 rounded-pill"
                            : "list-group-item list-group-item-light m-1 gradient shadow-sm border-2 rounded-3"
                    }
                >
                    <div className="d-flex justify-content-start align-items-center">
                        <div className="avatarka ">
                            {avatar && avatar.url ? (
                                <img
                                    src={`${urlUploadConst}/${avatar.url}`}
                                    className=" border border-2 border-success"
                                ></img>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center bg-success border border-2 border-success gradient">
                                    <div className="fs-5 text-light fw-bolder">
                                        {title &&
                                            `${title.trim().split(" ")[0][0].toUpperCase()}` +
                                                `${
                                                    (title.trim().split(" ").slice(1).pop() &&
                                                        title.trim().split(" ").slice(1).pop()[0].toUpperCase()) ||
                                                    ""
                                                }`}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-dark fs-6 fw-bolder ms-2 lh-1">{`${title}`}</div>
                    </div>
                    <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                        <CCounter chatId={_id} />
                        <span className="visually-hidden">всего сообщений</span>
                    </span>
                    {/* FIXME: */}
                    {/* <span className="text-nowrap"> chatID: {_id}</span> */}
                </li>
            </>
        </Link>
    );
};

const List = ({ arrayOfChats, userId, currentChatId }) => {
    // console.log(arrayOfChats, msgsObj);
    // arrayOfChats - массив всех чатов пользователя

    if (!arrayOfChats) return <></>;

    // сортировка массива чатов по полю createdAt
    // у кого createdAt больше (свежее) - тот в начало массива
    // надо "попросить" backend-ера внести в сущность Chat поле "lastModified"
    // либо "lastMessageCreatedAt"

    // arrayOfChats.sort((a, b) => {
    //     if (!a.messages) return 1;
    //     if (!b.messages) return -1;
    //     return +b.messages[b.messages.length - 1].createdAt - +a.messages[a.messages.length - 1].createdAt;
    // });

    //FIXME:
    arrayOfChats.sort((a, b) => b.createdAt - a.createdAt);

    // console.log("chatsList - arrayOfChats.sort: ", arrayOfChats);
    // console.log("chatsList - : ", currentChatId);

    return (
        <ul className="list-group" role="tablist">
            {arrayOfChats.map((a) => (
                <ChatItem key={a._id} {...a} userId={userId} currentChatId={currentChatId} />
            ))}
        </ul>
    );
};

const CList = connect((s) => ({
    currentChatId: s.curChatId && s.curChatId.curChatId,
    arrayOfChats: s.auth && s.auth.chats,
    userId: s.auth && s.auth.payloadId,
}))(List);

export const ChatsList = () => (
    <div className="ChatsList">
        <CList />
    </div>
);
