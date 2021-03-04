import { Redirect } from "react-router-dom";
import history from "../history";
import { useState, useEffect } from "react";
import { actionSearchChat } from "../Actions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

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
        <div className="bg-light mb-2">
            <input
                className="form-control mb-2 p-2 border border-success border-2"
                placeholder="Serch by title in my chats"
                onInput={(e) => {
                    setSearchStr(e.target.value);
                }}
            ></input>
            {/* <span>🔍</span> */}
            <Button
                className="gradient"
                variant="secondary btn-sm"
                onClick={() => {
                    history.push("/newchat");
                }}
            >
                New Chat
            </Button>
            <Button className="gradient" variant="secondary btn-sm">
                Join to another chat
            </Button>
        </div>
    );
};

export const CAdditionalTools = connect(
    (s) => ({
        _userId: s.auth && s.auth.payloadId,
    }),
    { onSearch: actionSearchChat }
)(AdditionalTools);
