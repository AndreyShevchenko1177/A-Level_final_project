import { ButtonToMain } from "../Components";
import { urlUploadConst } from "../const";
import { actionDelUserFromChatList, actionCreateNewChat } from "../Actions";
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

const MemberItem = ({ member, myId, dellFromList = null }) => {
    return (
        <span className="fs-5">
            <span className="badge bg-success  m-1 rounded-pill gradient">
                {member.nick || member.login}

                <button
                    type="button"
                    className="btn-close ms-2 text-light "
                    aria-label="Close"
                    disabled={member._id === myId}
                    onClick={() => {
                        if (typeof dellFromList === "function") dellFromList(member._id);
                    }}
                ></button>
            </span>
        </span>
    );
};

const CMemberItem = connect(
    (s, { member }) => ({
        member,
        myId: s.auth.payloadId,
    }),
    { dellFromList: actionDelUserFromChatList }
)(MemberItem);

const NewChatDashBoard = ({ members = {}, createNewChat = null }) => {
    const [chatMembers, setChatMembers] = useState(Object.values(members));
    const [inpTitle, setInpTitle] = useState("");
    const uploadRef = useRef(null);
    const uploadImgRef = useRef(null);
    const [srcAva, setSrcAva] = useState("");

    // console.log(members);

    useEffect(() => {
        setChatMembers(Object.values(members));
    }, [members]);

    const doCreateNewChat = () => {
        createNewChat({
            title: inpTitle,
            members: chatMembers,
            avaFile: uploadRef.current && uploadRef.current.files && uploadRef.current.files[0],
        });
    };

    function previewFile() {
        let preview = uploadImgRef.current;
        let file = uploadRef.current && uploadRef.current.files && uploadRef.current.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            setSrcAva(reader.result);
        };

        if (file) {
            // console.log(file);
            reader.readAsDataURL(file);
        } else {
            setSrcAva("");
        }
    }

    return (
        <>
            <div className="ChatDashBoard bg-light">
                <h4>ChatDashBoard</h4>
                <table className="table table-bordered align-middle">
                    <tbody>
                        <tr>
                            <td className="fw-bolder">Chat title:</td>
                            <td>
                                <input
                                    className="form-control mb-2 p-2 border border-success border-2"
                                    placeholder="Input title for new chat"
                                    onChange={(e) => setInpTitle(e.target.value)}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Chat avatar:</td>
                            <td>
                                <div className="avatarka ">
                                    {srcAva ? (
                                        <img
                                            // src={`${urlUploadConst}/${avatarUrl}`}
                                            src={srcAva}
                                            className="border border-2 border-success"
                                        ></img>
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center bg-success border border-2 border-success gradient">
                                            <div className="fs-5 text-light fw-bolder">
                                                {!!inpTitle &&
                                                    `${
                                                        inpTitle.trim().split(" ")[0] &&
                                                        inpTitle.trim().split(" ")[0][0] &&
                                                        inpTitle.trim().split(" ")[0][0].toUpperCase()
                                                    }` +
                                                        `${
                                                            (inpTitle.trim().split(" ").slice(1).pop() &&
                                                                inpTitle.trim().split(" ").slice(1).pop()[0] &&
                                                                inpTitle
                                                                    .trim()
                                                                    .split(" ")
                                                                    .slice(1)
                                                                    .pop()[0]
                                                                    .toUpperCase()) ||
                                                            ""
                                                        }`}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    onChange={previewFile}
                                    ref={uploadRef}
                                    accept="image/*,image/jpeg"
                                    className="form-control form-control-sm m-2"
                                    aria-label="file example"
                                />
                                {/* <br />
                                <img src={srcAva} height="200" alt="Image preview..." ref={uploadImgRef}></img> */}

                                {/*  */}

                                {/* <span className="avatarka">
                                    <img
                                        src={chat_square_text}
                                        className="border border-2 border-success bg-light "
                                        alt="Avatar"
                                    />
                                </span> */}
                            </td>
                        </tr>
                        <tr>
                            <td>Chat members:</td>
                            <td>
                                {chatMembers.map((member) => (
                                    <CMemberItem key={member._id} member={member} />
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn-success gradient rounded" disabled={!inpTitle} onClick={doCreateNewChat}>
                    Create new chat
                </button>
                {!inpTitle && <span className="text-danger"> You should fill in the 'Chat title' field.</span>}
            </div>
        </>
    );
};

export const CNewChatDashBoard = connect((s) => ({ members: s.newChatUsers }), { createNewChat: actionCreateNewChat })(
    NewChatDashBoard
);
