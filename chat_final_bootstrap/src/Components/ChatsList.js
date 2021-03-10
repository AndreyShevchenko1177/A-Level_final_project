import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlConst } from "../const";
import { Link } from "react-router-dom";
import { Counter } from "../Components";
import personFillIcon from "../icons/person-fill.svg";
import history from "../history";
import { useEffect } from "react";
import { useState } from "react";

// const CCounter = connect;

const ChatItem = ({ _id = "", avatar, title, messages, userId, currentChatId }) => {
    // здесь _id, avatar, title - чата,
    // currentChatId - текущий выбраный чат
    // console.log("ChatItem - ", _id, currentChatId);

    return (
        <Link to={`/main/${_id}`} className="noUnderLine">
            <>
                <li
                    className={
                        _id === currentChatId
                            ? "list-group-item list-group-item-success m-1 gradient shadow border-2"
                            : "list-group-item list-group-item-light m-1 gradient shadow-sm border-2"
                    }
                >
                    <div className="d-flex justify-content-start align-items-center">



                        <div className="avatarka ">
                            {avatar && avatar.url ? (
                                <img src={`${urlConst}/${avatar.url}`}></img>
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

                        

                        <div className="text-dark fs-5 fw-bolder ms-2">{`${title}`}</div>
                    </div>
                    <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                        {Counter(_id)}
                        <span className="visually-hidden">всего сообщений</span>
                    </span>
                    <span className="text-nowrap"> chatID: {_id}</span>
                </li>
            </>
        </Link>
    );
};

const List = ({ arrayOfChats, userId, currentChatId }) => {
    // console.log(arrayOfChats);
    // arrayOfChats - массив всех чатов пользователя
    if (!arrayOfChats) return <></>;

    // сортируем чаты так, чтобы сверху показывались чаты, в которых последнее сообщение "свежее" всех остальных
    // чаты без сообщений отправляются в конец списка
    // на сервере сделать такую сортировку не получается

    // надо "попросить" backend-ера внести в сущность Chat поле "lastModified"
    // либо "lastMessageCreatedAt"

    // arrayOfChats.sort((a, b) => {
    //     if (!a.messages) return 1;
    //     if (!b.messages) return -1;
    //     return +b.messages[b.messages.length - 1].createdAt - +a.messages[a.messages.length - 1].createdAt;
    // });

    // сортировка вариант2:
    // за последнюю дату чата принимается дата последнего сообщения либо если нет сообщений,
    // то дата создания чата
    arrayOfChats.sort((a, b) => {
        a = a.messages && a.messages.length ? a.messages[a.messages.length - 1].createdAt : a.createdAt;
        b = b.messages && b.messages.length ? b.messages[b.messages.length - 1].createdAt : b.createdAt;
        return +b - +a;
    });

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
