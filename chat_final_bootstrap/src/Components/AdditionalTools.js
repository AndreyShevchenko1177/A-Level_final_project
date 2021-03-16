import { Redirect } from "react-router-dom";
import history from "../history";
import { useState, useEffect } from "react";
import { actionSearchChat } from "../Actions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

export const AdditionalTools = ({ _userId, onSearch = null }) => {
    // const [searchStr, setSearchStr] = useState("");

    // useEffect(() => {
    //     if (typeof onSearch === "function") {
    //         onSearch(_userId, searchStr);
    //         // console.log("AdditionalTools - run searchStr", _userId, searchStr);
    //     }
    // }, [searchStr]);

    return (
        <div className="bg-light  text-nowrap ">
            {/* <input
                className="form-control mb-2 p-2 border border-success border-2"
                placeholder="Search by title in my chats"
                onInput={(e) => {
                    setSearchStr(e.target.value);
                }}
            ></input> */}
            {/* <span>🔍</span> */}
            <Button
                className="gradient ms-2 mb-2"
                variant="success btn-sm"
                onClick={() => {
                    history.push("/newchat");
                }}
            >
                <i class="bi bi-chat-left-text"></i> New Chat
            </Button>
            {/* <Button className="gradient" variant="secondary btn-sm  m-2">
                Join to another chat
            </Button> */}
        </div>
    );
};

export const CAdditionalTools = connect(
    (s) => ({
        _userId: s.auth && s.auth.payloadId,
    })
    // { onSearch: actionSearchChat }
)(AdditionalTools);
