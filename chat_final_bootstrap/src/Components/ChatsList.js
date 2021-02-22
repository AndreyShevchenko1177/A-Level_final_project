import logo from "../images//logo23.jpg";
import { connect } from "react-redux";
import { urlConst } from "../const";
import { Link } from "react-router-dom";

const ChatItem = ({ _id = "", avatarUrl, title = "no title", userId }) => (
    <Link to={`/main/${userId}/${_id}`}>
        <div className="ChatItem">
            <img src={avatarUrl ? `${urlConst}/${avatarUrl}}` : logo}></img>
            <p>{title}</p>
            chatID: {_id}
        </div>
    </Link>
);

const List = ({ arrayOfChats, userId }) => {
    if (!arrayOfChats) return <></>;
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
        s.promise.userFindOne &&
        s.promise.userFindOne.payload &&
        s.promise.userFindOne.payload.data &&
        s.promise.userFindOne.payload.data.UserFindOne &&
        s.promise.userFindOne.payload.data.UserFindOne.chats,
    userId: s.auth && s.auth.payloadId,
}))(List);

export const ChatsList = () => (
    <div className="ChatsList">
        <b>ChatsList</b> <br />
        <CList />
    </div>
);
