import { ButtonToMain } from "../Components";
import { urlUploadConst } from "../const";
import { actionGetAllUsers, actionAllUsersFind } from "../Actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { store } from "../Reducers";
import { useRef } from "react";
import history from "../history";
import { CUserInfo } from "../Layout";
import { CAllUsersList } from "../Layout";
import logo from "../images/logo23.png";
import chat_square_text from "../icons/chat-square-text.svg";

const MemberItem = ({ member }) => <pre>{member.login}</pre>;

const ChatDashBoard = ({ members = {} }) => {
    const [chatMembers, setChatMembers] = useState(Object.values(members));
    useEffect(() => setChatMembers(Object.values(members)), [members]);

    return (
        <>
            <div className="ChatDashBoard bg-light">
                <h4>ChatDashBoard</h4>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Chat title:</td>
                            <td>
                                <input
                                    className="form-control mb-2 p-2 border border-success border-2"
                                    placeholder="Input title for new chat"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Chat avatar:</td>
                            <td>
                                <span className="avatarka">
                                    <img
                                        src={chat_square_text}
                                        className="border border-2 border-success bg-light "
                                        alt="Avatar"
                                    />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Chat members:</td>
                            <td>
                                {chatMembers.map((member) => (
                                    <MemberItem key={member._id} member={member} />
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

const CChatDashBoard = connect((s) => ({ members: s.newChatUsers }))(ChatDashBoard);

const PageNewChat = ({ doSearchUsers = null }) => {
    const [searchUserStr, setSearchUserStr] = useState("");

    // если не залогинены - вперед к регистрации/логину
    if (!store.getState().auth || !store.getState().auth.login) {
        history.push("/");
    }

    useEffect(() => {
        if (searchUserStr && typeof doSearchUsers === "function") {
            doSearchUsers(0, searchUserStr);
        }
    }, [searchUserStr]);

    //FIXME: это для чего???? уже не помню и похоже не надо ))))
    // useEffect(() => {
    //     store.dispatch({ type: "CLEAR_USERS" });
    // }, []);

    return (
        <>
            <div className="PageMain container-fluid">
                <div className="row g-3">
                    <div className="col-md-4  bg-light">
                        <CUserInfo />
                        <ButtonToMain />

                        <input
                            className="form-control mb-2 p-2 border border-success border-2"
                            placeholder="Search users by nick/login/_id"
                            onInput={(e) => {
                                setSearchUserStr(e.target.value);
                            }}
                        ></input>

                        <CAllUsersList searchUserStr={searchUserStr} />
                    </div>
                    <div className="col-md-8">
                        <CChatDashBoard />
                    </div>
                </div>
            </div>
        </>
    );
};

export const CPageNewChat = connect(null, { doSearchUsers: actionAllUsersFind })(PageNewChat);
