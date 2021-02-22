import { Redirect } from "react-router-dom";
import history from "../history";
import { useState, useEffect } from "react";
import { actionSearchChat } from "../Actions";
import { connect } from "react-redux";

export const AdditionalTools = ({ _userId, onSearch = null }) => {
    const [searchStr, setSearchStr] = useState("");

    //FIXME: отладочный _userId
    if (_userId) _userId = "5e97105693e2915e617c6fc1";

    useEffect(() => {
        if (typeof onSearch === "function") {
            onSearch(_userId, searchStr);
            // console.log("AdditionalTools - run searchStr", _userId, searchStr);
        }
    }, [searchStr]);

    return (
        <div className="AdditionalTools">
            <input
                placeholder="Serch by title in my chats"
                onInput={(e) => {
                    setSearchStr(e.target.value);
                }}
            ></input>
            <span>🔍</span>
            <button
                onClick={() => {
                    history.push("/newchat");
                }}
            >
                New Chat
            </button>
            <button>Join to another chat</button>
        </div>
    );
};

export const CAdditionalTools = connect(
    (s) => ({
        _userId: s.auth && s.auth.payloadId,
    }),
    { onSearch: actionSearchChat }
)(AdditionalTools);
