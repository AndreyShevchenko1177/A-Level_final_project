import { ChatContain } from "../Components";
import { Sidebar } from "../Layout";
import { store } from "../Reducers";
import history from "../history";
import { actionFindChatsByUserId } from "../Actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

//prettier-ignore
const PageMain = ( {match: { params: { _userId } } , getData = 555}) => {
    const [userId, setUserId] = useState(_userId)

    useEffect(() => {
        if (typeof getData === "function") {
            setUserId(_userId);
            getData(_userId)
        }
    }, [_userId])

    if (
        //FIXME: надо засунуть router в redux
        !_userId ||
        !store.getState().auth ||
        !store.getState().auth.login ||
        _userId !== store.getState().auth.payloadId
    ) {
        history.push("/");
    }

    //FIXME: это временный липовый _id
    _userId = "5e25e0a41719bf13be585729";

    // if (typeof getData === "function") getData(_userId);

    return (
        <div className="PageMain container-fluid">
            {_userId}
            <div className="row">
                <div className="col-md-4">
                    <Sidebar />
                </div>
                <div className="col-md-8">
                    <ChatContain />
                </div>
            </div>
        </div>
    );
};

export const CPageMain = connect(null, { getData: actionFindChatsByUserId })(PageMain);
