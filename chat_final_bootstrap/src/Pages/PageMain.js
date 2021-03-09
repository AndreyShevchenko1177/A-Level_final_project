import { ChatContain } from "../Components";
import { Sidebar } from "../Layout";
import { store } from "../Reducers";
import history from "../history";
import { actionGetMessagesByChatId, actionSearchChat, actionSearchMessagesByChatId } from "../Actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

//prettier-ignore
const PageMain = ({
    match: {params: { _chatId }},
    _userId,
    // getChatList = null,
    getMesagesList = null,
}) => {
    // console.log("PageMain.js. - True _chatId: ", _chatId);

    // useEffect(() => {
    //     if (typeof getChatList === "function") {
    //         getChatList(_userId);
    //     }
    // }, [_userId]);

    useEffect(() => {
        if (typeof getMesagesList === "function" && _chatId) {
            getMesagesList(_chatId);
        }
    }, [_chatId]);


    if (
        //FIXME: надо засунуть router в redux
        !_userId ||
        !store.getState().auth ||
        !store.getState().auth.login ||
        _userId !== store.getState().auth.payloadId
    ) {
        history.push("/");
    }
    
    return (
        <div className="PageMain container-fluid">
            <div className="row g-3">
                <div className="col-md-4">
                    {/* {_userId + ` - подмена id`} */}
                    <Sidebar/>
                </div>
                <div className="col-md-8 fonRomaska">
                    <ChatContain _chatId={_chatId} />
                </div>
            </div>
        </div>
    );
};

// prettier-ignore
export const CPageMain = connect((s) => ({ _userId: s.auth && s.auth.payloadId }), {
    // getChatList: actionSearchChat,
    getMesagesList: actionSearchMessagesByChatId,
})(PageMain);
