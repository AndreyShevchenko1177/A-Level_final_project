import { ButtonToMain } from "../Components";
import { urlUploadConst } from "../const";
import { actionGetAllUsers } from "../Actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { store } from "../Reducers";
import { useRef } from "react";

const ChatDashBoard = () => {
    return (
        <>
            <h4>ChatDashBoard</h4>
        </>
    );
};

const AllUsersConst = [
    {
        _id: "5e25e0a41719bf13be585729",
        login: "test3",
        nick: "",
        avatar: null,
    },
    {
        _id: "5e25bf671719bf13be5856c4",
        login: "t",
        nick: "t",
        avatar: null,
    },
    {
        _id: "5f3e4cd7c3de58221910d207",
        login: "Kiliar",
        nick: "Kiliar",
        avatar: null,
    },
    {
        _id: "5f528e96c3de58221910d20c",
        login: "mdm1",
        nick: "jj",
        avatar: null,
    },
    {
        _id: "5f568538c3de58221910d20e",
        login: "11",
        nick: "11",
        avatar: null,
    },
];

const UserItem = ({ _id, login, nick, avatar, myId }) => {
    const [isSelected, setIsSelected] = useState(false);
    const avatarUrl = avatar && avatar.url;
    nick = !!nick ? nick : login;

    const doSelectUser = () => {
        setIsSelected((prev) => !prev);
    };

    return (
        <>
            <li
                className={`list-group-item list-group-item-${
                    isSelected || _id === myId ? "success" : "light"
                } m-1 gradient shadow-sm border-2 `}
                onClick={doSelectUser}
            >
                <div className="d-flex justify-content-start align-items-center">
                    <div className="avatarka ">
                        {avatarUrl ? (
                            <img
                                src={`${urlUploadConst}/${avatarUrl}`}
                                className="border border-2 border-success"
                            ></img>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center bg-success border border-2 border-success gradient">
                                <div className="fs-5 text-light fw-bolder">
                                    {!!nick &&
                                        `${
                                            nick.split(" ")[0] &&
                                            nick.split(" ")[0][0] &&
                                            nick.split(" ")[0][0].toUpperCase()
                                        }` +
                                            `${
                                                (nick.split(" ").slice(1).pop() &&
                                                    nick.split(" ").slice(1).pop()[0] &&
                                                    nick.split(" ").slice(1).pop()[0].toUpperCase()) ||
                                                ""
                                            }`}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-dark fs-5  ms-2">{`${nick}`}</div>
                </div>
                <span className="position-absolute bottom-0 end-0  badge rounded-pill bg-secondary">
                    {_id}
                    <span className="visually-hidden">всего сообщений</span>
                </span>
            </li>
        </>
    );
};

const AllUsers = ({ allUsersArray = [], getAllUsers = null, myId }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (typeof getAllUsers === "function") getAllUsers();
    }, []);

    useEffect(() => {
        setUsers(
            allUsersArray
                .filter((el) => {
                    if (!el.login) return false;
                    if (el.nick && !el.nick.replace(/ +/g, " ").trim()) {
                        return false;
                    } else {
                        return !!el.login.replace(/ +/g, " ").trim();
                    }
                })
                .sort((a, b) => ((a.nick || a.login) > (b.nick || b.login) ? 1 : -1))
        );
        // выкидываем пользователей, у которых (ник из одних пробелов) или (нет ника но логин из одних пробелов)
        // console.log("+++++++++++++++++", users, allUsersArray);
    }, [allUsersArray]);

    return (
        <div className="bg-light">
            <h4>AllUsers</h4>
            <ul className="list-group allUsersList" role="tablist">
                {!!users && users.map((user) => <UserItem key={user._id} {...user} myId={myId} />)}
            </ul>
        </div>
    );
};

const CAllUsers = connect((s) => ({ allUsersArray: s.allUsers, myId: s.auth.payloadId }), {
    getAllUsers: actionGetAllUsers,
})(AllUsers);

export const PageNewChat = () => {
    useEffect(() => {
        store.dispatch({ type: "CLEAR_USERS" });
    }, []);

    return (
        <>
            PageNewChat
            <ButtonToMain />
            <div className="PageMain container-fluid">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            className="form-control mb-2 p-2 border border-success border-2"
                            placeholder="Search user by nick/login/_id"
                            onInput={(e) => {}}
                        ></input>
                        <CAllUsers />
                    </div>
                    <div className="col-md-8">
                        <ChatDashBoard />
                    </div>
                </div>
            </div>
        </>
    );
};
