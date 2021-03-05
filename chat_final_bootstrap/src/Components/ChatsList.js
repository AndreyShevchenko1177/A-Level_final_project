import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlConst } from "../const";
import { Link } from "react-router-dom";
import personFillIcon from "../icons/person-fill.svg";
import history from "../history";

const ChatItem = ({ _id = "", avatar, title = "no title", messages, userId, chatId }) => (
    // здесь _id - чата
    <Link to={`/main/${userId}/${_id}`} className="noUnderLine">
        <>
            <li
                className={
                    _id === chatId
                        ? "list-group-item list-group-item-success my-1 gradient"
                        : "list-group-item list-group-item-light my-1 gradient"
                }
            >
                <div>
                    {avatar && avatar.url ? (
                        <img src={`${urlConst}/${avatar.url}`}></img>
                    ) : (
                        <div className="bg-success border border-2 border-success">
                            <i class="fs-3 text-light bi bi-chat-dots "></i>
                        </div>
                    )}
                </div>
                <div className="text-success ">
                    <span>Title: {title}</span>
                    <br />
                    <span>Count of msg: {messages && messages.length ? messages.length : 0}</span>
                </div>

                <br />
                <span> chatID: {_id}</span>
            </li>
        </>
    </Link>
);

const List = ({ arrayOfChats, userId, chatId }) => {
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

    return (
        <ul class="list-group" role="tablist">
            {arrayOfChats.map((a) => (
                <ChatItem key={a._id} {...a} userId={userId} chatId={chatId} />
            ))}
        </ul>
    );
};

const CList = connect((s) => ({
    chatId:
        s.promise.chatFindOne &&
        s.promise.chatFindOne.payload &&
        s.promise.chatFindOne.payload.data &&
        s.promise.chatFindOne.payload.data.ChatFindOne &&
        s.promise.chatFindOne.payload.data.ChatFindOne._id,
    arrayOfChats:
        s.promise.searchChat &&
        s.promise.searchChat.payload &&
        s.promise.searchChat.payload.data &&
        s.promise.searchChat.payload.data.ChatFind,
    userId: s.auth && s.auth.payloadId,
}))(List);

export const ChatsList = () => (
    <div className="ChatsList">
        <CList />
    </div>
);
