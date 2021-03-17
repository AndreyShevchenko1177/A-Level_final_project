import { ButtonToMain, ButtonCancel, CNewChatDashBoard } from "../Components";
import { urlUploadConst } from "../const";
import { actionGetAllUsers, actionAllUsersFind, actionDelUserFromChatList } from "../Actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { store } from "../Reducers";
import { useRef } from "react";
import history from "../history";
import { CUserInfo } from "../Layout";
import { CAllUsersList } from "../Layout";
import { useDropzone } from "react-dropzone";
import logo from "../images/logo23.png";
import chat_square_text from "../icons/chat-square-text.svg";
import userEvent from "@testing-library/user-event";

// prettier-ignore
const PageNewChat = ({ doSearchUsers = null, match: { params: { _chatId = "" } = {} } = {} }) => {
    const [searchUserStr, setSearchUserStr] = useState("");


    // если не залогинены - вперед к регистрации/логину
    if (!store.getState().auth || !store.getState().auth.login) {
        history.push("/");
    }

    // если ввели поиск пользователей - будем искать
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
            <div className="container-fluid">
                <div className="row g-3">
                    <div className="col-md-4  bg-light gradient shadow-sm border-2 rounded-3">
                        <CUserInfo />
                        <ButtonToMain />
                        <ButtonCancel />

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
                        <CNewChatDashBoard _chatId={_chatId} />
                    </div>
                </div>
            </div>
        </>
    );
};

export const CPageNewChat = connect(null, { doSearchUsers: actionAllUsersFind })(PageNewChat);
