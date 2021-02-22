import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlConst } from "../const";
import { Link } from "react-router-dom";

const ChatItem = ({ _id = "", avatarUrl, title = "no title", userId }) => (
    <Link to={`/main/${userId}/${_id}`}>
        <div className="ChatItem">
            <img src={avatarUrl ? `${urlConst}/${avatarUrl}}` : logo}></img>
            <p>Title: {title}</p>
            chatID: {_id}
        </div>
    </Link>
);

const List = ({ arrayOfChats, userId }) => {
    if (!arrayOfChats) return <></>;

    // сортируем чаты так, чтобы сверху показывались чаты, в которых последнее сообщение "свежее" всех остальных
    // чаты без сообщений отправляются в конец списка
    // на сервере сделать такую сортировку не получается
    arrayOfChats.sort((a, b) => {
        if (!a.messages) return 1;
        if (!b.messages) return -1;
        return +b.messages[b.messages.length - 1].createdAt - +a.messages[a.messages.length - 1].createdAt;
    });

    // console.log("chatsList - arrayOfChats.sort: ", arrayOfChats);

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
