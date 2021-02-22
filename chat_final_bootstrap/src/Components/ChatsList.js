import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlConst } from "../const";
import { Link } from "react-router-dom";

const ChatItem = ({ _id = "", avatar, title = "no title", messages, userId }) => (
    <Link to={`/main/${userId}/${_id}`}>
        <div className="ChatItem">
            <img src={avatar && avatar.url ? `${urlConst}/${avatar.url}}` : logo}></img>
            <p>Title: {title}</p>
            <span>Count of msg: {messages && messages.length ? messages.length : 0}</span>
            <br />
            <span> chatID: {_id}</span>
        </div>
    </Link>
);

const List = ({ arrayOfChats, userId }) => {
    if (!arrayOfChats) return <></>;

    // сортируем чаты так, чтобы сверху показывались чаты, в которых последнее сообщение "свежее" всех остальных
    // чаты без сообщений отправляются в конец списка
    // на сервере сделать такую сортировку не получается
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

    console.log("chatsList - arrayOfChats.sort: ", arrayOfChats);

    return (
        <div>
            {arrayOfChats.map((a) => (
                <ChatItem key={a._id} {...a} userId={userId} />
            ))}
        </div>
    );
};

const CList = connect((s) => ({
    arrayOfChats:
        s.promise.searchChat &&
        s.promise.searchChat.payload &&
        s.promise.searchChat.payload.data &&
        s.promise.searchChat.payload.data.ChatFind,
    userId: s.auth && s.auth.payloadId,
}))(List);

export const ChatsList = () => (
    <div className="ChatsList">
        <b>ChatsList</b> <br />
        <CList />
    </div>
);
