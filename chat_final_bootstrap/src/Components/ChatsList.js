import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlConst } from "../const";

const ChatItem = ({ _id = "", avatarUrl, title = "no title" }) => (
    <div className="ChatItem">
        <img src={avatarUrl ? `${urlConst}/${avatarUrl}}` : logo}></img>
        <p>{title}</p>
        chatID: {_id}
    </div>
);

const List = ({ arrayOfChats }) => {
    if (!arrayOfChats) return <></>;
    return (
        <div>
            {arrayOfChats.map((a) => (
                <ChatItem key={a._id} {...a} />
            ))}
        </div>
    );
};

const CList = connect((s) => ({
    arrayOfChats:
        s.promise &&
        s.promise.chatsList &&
        s.promise.chatsList.payload &&
        s.promise.chatsList.payload.data &&
        s.promise.chatsList.payload.data.UserFindOne &&
        s.promise.chatsList.payload.data.UserFindOne.chats,
}))(List);

export const ChatsList = () => (
    <div className="ChatsList">
        <b>ChatsList</b> <br />
        <input placeholder="Serch chat"></input>
        <br />
        <CList />
    </div>
);
