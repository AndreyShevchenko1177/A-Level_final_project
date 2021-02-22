import { ChatContain } from "../Components";
import { Sidebar } from "../Layout";
import { store } from "../Reducers";
import history from "../history";
import { actionFindChatsByUserId, actionFindMessagesByChatId, actionSearchChat } from "../Actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

//prettier-ignore
const PageMain = ({
    match: {
        params: { _userId, _chatId },
    },
    getChatList = null,
    getMesagesList = null,
}) => {

    // console.log("PageMain.js. - True _chatId: ", _chatId);

    useEffect(() => {
        if (typeof getChatList === "function") {
            getChatList(_userId);
        }
    }, [_userId]);

    useEffect(() => {
        if (typeof getMesagesList === "function") {
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

    //FIXME: это временные _id
    _userId = "5e97105693e2915e617c6fc1";  // login "Antipmen"
    // if (_chatId) _chatId = "5e9ff91fd265602706d735cd"; // title "community"

    // if (typeof getData === "function") getData(_userId);

    return (
        <div className="PageMain container-fluid">
            {_userId}
            <div className="row">
                <div className="col-md-4">
                    <Sidebar />
                </div>
                <div className="col-md-8">
                    <ChatContain _chatId={ _chatId}/>
                </div>
            </div>
        </div>
    );
};

export const CPageMain = connect(null, {
    getChatList: actionSearchChat,
    getMesagesList: actionFindMessagesByChatId,
})(PageMain);
