import myPhoto from "../images/Iam_new2.jpg";
import personFillIcon from "../icons/person-fill.svg";
import { CButtonLogout, CLoginInfo, ButtonCancel } from "../Components";
import { Link } from "react-router-dom";
import { urlUploadConst } from "../const";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { actionUserUpdate } from "../Actions";

const UserInfo = ({ myId, avatarUrl, login, nick, doUpdate = null }) => {
    // console.log(avatarUrl, login, nick);

    const [show, setShow] = useState(false);

    const [srcAva, setSrcAva] = useState("");
    const uploadRef = useRef(null); // ссылка на input type=file для авы

    const [inpLogin, setInpLogin] = useState(login);
    const inpLoginRef = useRef(null);

    const [inpNick, setInpNick] = useState(nick);
    const inpNickRef = useRef(null);
    const [tempNick, setTempNick] = useState(nick);

    const [inpPass, setInpPass] = useState("");
    const inpPassRef = useRef(null);

    const [isNeedLogout, setIsNeedLogout] = useState(false);

    const initialization = () => {
        setSrcAva("");
        setInpLogin(login);
        setInpNick(nick);
        setInpPass("");
    };

    useEffect(() => {
        if (inpLoginRef.current) inpLoginRef.current.value = inpLogin;
        if (inpNickRef.current) inpNickRef.current.value = inpNick;
        setTempNick(inpNick ? inpNick : inpLogin);
    });

    useEffect(() => {
        setTempNick(inpNick ? inpNick : inpLogin);
    }, [inpNick, inpLogin]);

    function previewFile() {
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

    const handleClose = () => setShow(false);

    const handleShow = () => {
        initialization();
        setShow(true);
    };

    return (
        <>
            <div className="position-relative">
                <div className="bg-gradient bg-success text-white p-1 py-2 mb-2 text-white" onClick={handleShow}>
                    <span className="m-2 text-nowrap avatarka">
                        <img
                            className="border border-2 border-success bg-light"
                            src={avatarUrl ? `${urlUploadConst}/${avatarUrl}` : personFillIcon}
                        />
                        <CLoginInfo />
                    </span>
                </div>
                <span className="position-absolute bottom-0 end-0">
                    <i className="bi bi-pencil-fill text-light m-2"></i>
                </span>
            </div>

            <Modal show={show} onHide={handleClose}>
                {/* <Modal.Header closeButton> */}
                <Modal.Header>
                    <Modal.Title>User dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="d-flex align-items-center">
                            <div className="avatarka mb-4">
                                {srcAva || avatarUrl ? (
                                    <img
                                        src={srcAva || `${urlUploadConst}/${avatarUrl}`}
                                        className="border border-2 border-success"
                                    ></img>
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center bg-success border border-2 border-success gradient">
                                        <div className="fs-5 text-light fw-bolder">
                                            {!!tempNick &&
                                                `${
                                                    tempNick.trim().split(" ")[0] &&
                                                    tempNick.trim().split(" ")[0][0] &&
                                                    tempNick.trim().split(" ")[0][0].toUpperCase()
                                                }` +
                                                    `${
                                                        (tempNick.trim().split(" ").slice(1).pop() &&
                                                            tempNick.trim().split(" ").slice(1).pop()[0] &&
                                                            tempNick
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

                            <label className="btn btn-default btn-file">
                                <input
                                    type="file"
                                    onChange={previewFile}
                                    ref={uploadRef}
                                    accept="image/*,image/jpeg"
                                    className="form-control form-control-sm m-2"
                                    aria-label="file example"
                                    style={{ display: "none" }}
                                />
                                Browse...
                            </label>
                        </div>

                        <Form.Group controlId="fromBasicLogin" className="mb-4">
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter login"
                                ref={inpLoginRef}
                                onChange={(e) => {
                                    setInpLogin(e.target.value);
                                    setIsNeedLogout(true);
                                }}
                            />
                            <Form.Text className="text-muted">If change then need to re-login</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="fromBasicNick" className="mb-4">
                            <Form.Label>Nick name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter nick name"
                                ref={inpNickRef}
                                onChange={(e) => {
                                    setInpNick(e.target.value);
                                    // setIsNeedLogout(true);
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="fromBasicPassword" className="mb-4">
                            <Form.Label>New password (if need)</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter NEW password"
                                ref={inpPassRef}
                                onChange={(e) => {
                                    setInpPass(e.target.value);
                                    setIsNeedLogout(true);
                                }}
                            />
                            <Form.Text className="text-muted">If change then need to re-login</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <ButtonCancel cansel={handleClose} />
                            <Button
                                className="gradient rounded-3 ms-2 mb-2"
                                disabled={!inpLogin}
                                onClick={() => {
                                    doUpdate({
                                        _id: myId,
                                        login: inpLogin && inpLogin.trim(),
                                        nick: inpNick && inpNick.trim(),
                                        password: inpPass,
                                        avaFile:
                                            uploadRef.current && uploadRef.current.files && uploadRef.current.files[0],
                                        isNeedLogout,
                                    });
                                    handleClose();
                                }}
                                variant="success btn-sm"
                            >
                                <i className="bi bi-check-square"></i>
                                <span className="ms-2">Update</span>
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export const CUserInfo = connect(
    (s) => ({
        avatarUrl: s.auth && s.auth.avatarUrl,
        myId: s.auth && s.auth.payloadId,
        login: s.auth && s.auth.payload,
        nick: s.auth && s.auth.nick,
    }),
    { doUpdate: actionUserUpdate }
)(UserInfo);
