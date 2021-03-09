import { ChatContain } from "../Components";
import { Sidebar } from "../Layout";
import { store } from "../Reducers";
import history from "../history";
import { actionSearchMessagesByChatId, actionCurChatId } from "../Actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

//prettier-ignore
const PageMain = ({
    match: {
        params: { _chatId },
    },
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
    //
    //
    //FIXME:  не посылать запрос если меседжи есть
    //завести редакс для курент_ид
    //
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
        <div className="PageMain container-fluid">
            <div className="row g-3">
                <div className="col-md-4">
                    {/* {_userId + ` - подмена id`} */}
                    <Sidebar />
                </div>
                <div className="col-md-8 fonRomaska">
                    <ChatContain _chatId={_chatId} />
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
