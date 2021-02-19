import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { actionLogin } from "../Actions";
import history from "../history";
import { store } from "../Reducers";

const LoginForm = ({ onLogin = null, isLoggedIn }) => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const input_ref = useRef(null);
    const pass_ref = useRef(null);
    const btn_ref = useRef(null);

    //FIXME: надо засунуть router в redux
    if (store.getState().auth && store.getState().auth.login) {
        history.push(`/main/${store.getState().auth.payloadId}`);
    }

    return (
        <div className="LoginForm">
            <input
                ref={input_ref}
                readOnly={isLoggedIn}
                type="text"
                onChange={(e) => {
                    setLogin(e.target.value);
                }}
            ></input>
            <input
                ref={pass_ref}
                readOnly={isLoggedIn}
                type="password"
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></input>
            <button
                ref={btn_ref}
                onClick={() => {
                    onLogin(login, pass);
                    console.log("кнопка лагин");
                }}
                disabled={isLoggedIn || !login || !pass}
            >
                Login
            </button>
        </div>
    );
};

const CLoginForm = connect((s) => ({ isLoggedIn: s.auth.login }), { onLogin: actionLogin })(LoginForm);

export const PageLogin = () => (
    <div className="PageLogin">
        <b>PageLogin</b>
        <CLoginForm />
    </div>
);
