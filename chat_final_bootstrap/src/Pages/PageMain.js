import { ChatMessages } from "../Components";
import { Sidebar } from "../Layout";
import { store } from "../Reducers";
import history from "../history";
import { actionSearchMessagesByChatId, actionCurChatId, actionMessageUpsert } from "../Actions";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import userEvent from "@testing-library/user-event";

const MessageInput = ({ curChatId: { curChatId } = {}, messageUpsert }) => {
    const textRef = useRef({});
    const [text, setText] = useState("");

    const textTyping = (e) => {
        setText(e.target.value);
        // console.log(e);
    };

    // отправка по Enter
    const sendMsgByEnterKey = (e) => {
        if (["NumpadEnter", "Enter"].includes(e.code) && !e.shiftKey && text.trim()) {
            sendMsg();
        }
    };

    const sendMsg = () => {
        if (text.trim()) {
            // console.log(text.trim());
            setText("");
            if (textRef.current) {
                textRef.current.value = "";
            }
            messageUpsert({ text: text.trim(), chatId: curChatId });
        }
    };

    useEffect(() => {
        setText("");
        if (textRef.current) {
            textRef.current.value = "";
        }
    }, [curChatId]);

    return (
        <>
            {curChatId && (
                <div className="bg-light shadow-sm border border-2 rounded-3 MessageInput">
                    {/* <div> InputArea</div>
                    <div> {`${curChatId}`}</div> */}

                    {/* -------------- Поле отправки сообщения -----------------*/}

                    <div className="position-relative">
                        <textarea
                            className="form-control h-75"
                            placeholder="Write a message..."
                            ref={textRef}
                            onChange={textTyping}
                            onKeyUp={sendMsgByEnterKey}
                        ></textarea>
                        <span
                            className="position-absolute bottom-0 end-0  badge rounded-pill bg-success"
                            role-button="true"
                            onClick={sendMsg}
                        >
                            <i className="bi bi-chat-dots"></i> <i className="bi bi-reply-fill"></i>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export const CMessageInput = connect((s) => ({ curChatId: s.curChatId }), { messageUpsert: actionMessageUpsert })(
    MessageInput
);

//prettier-ignore
const PageMain = ({
    match: {        params: { _chatId },    },
    _userId,
    messages, // из редакса через коннект
    getMesagesList = null,
    setCurId = null, // из редакса через коннект
}) => {
    // console.log(_chatId);
    // console.log(messages);

    if (
        !_userId ||
        !store.getState().auth ||
        !store.getState().auth.login ||
        _userId !== store.getState().auth.payloadId
    ) {
        history.push("/");
    }
    //
    //
    //
    //
    useEffect(() => {
        if (
            typeof getMesagesList === "function" &&
            _chatId &&
            !(messages && messages[_chatId] && messages[_chatId][0])
        ) {
            getMesagesList(_chatId);
        }
        if (typeof setCurId === "function") setCurId(_chatId);
    }, [_chatId]);

  

    return (
        <div className="maxWidthPageMain">
            <div className="container-fluid ">
                <div className="row g-3 ">
                    <div className="col-md-4">
                        <div className="maxWidthForSideBar shadow">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="pageMain_ChatMessages mb-2">
                            <div className="maxWidthForMsg">
                                <ChatMessages _chatId={_chatId} />
                            </div>
                        </div>
                        <div className="maxWidthForMsg">
                            <CMessageInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// prettier-ignore
export const CPageMain = connect((s) => ({ _userId: s.auth && s.auth.payloadId, messages: s.msg }), {
    setCurId: actionCurChatId,
    getMesagesList: actionSearchMessagesByChatId,
})(PageMain);
