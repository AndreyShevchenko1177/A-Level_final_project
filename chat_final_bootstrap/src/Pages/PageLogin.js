import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { actionLogin, actionRegistration } from "../Actions";
import history from "../history";
import { store } from "../Reducers";

const LoginForm = ({ onLogin = null, onRegistration = null, isLoggedIn, mode = "Login" }) => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [nick, setNick] = useState("");
    const login_ref = useRef(null);
    const login2_ref = useRef(null);
    const pass_ref = useRef(null);
    const pass2_ref = useRef(null);
    const nick_ref = useRef(null);
    const btn_ref = useRef(null);
    const containerR_ref = useRef(null);

    // console.log(login, pass, nick);
    // console.log(isLoggedIn, !!isLoggedIn);

    //FIXME: надо засунуть router в redux
    if (store.getState().auth && store.getState().auth.login && localStorage.authToken) {
        history.push(`/main/${store.getState().auth.payloadId}`);
    }

    const clearHooks = () => {
        setLogin("");
        setPass("");
        setNick("");
    };

    const doSignInBtn = () => {
        containerR_ref.current.classList.remove("right-panel-active");
        clearHooks();
    };

    const doSignUpBtn = () => {
        containerR_ref.current.classList.add("right-panel-active");
        clearHooks();
    };

    return (
        <div className="romashka">
            <div className="container " ref={containerR_ref}>
                {/* <!-- Sign Up --> */}
                <div className="container__form container--signup">
                    <div className="form">
                        <h2 className="form__title">Sign Up</h2>
                        <input
                            value={login}
                            type="text"
                            placeholder="Login"
                            className="input"
                            ref={login_ref}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && typeof onRegistration === "function")
                                    onRegistration(login, pass, nick);
                            }}
                            onChange={(e) => {
                                setLogin(e.target.value);
                            }}
                        />
                        <input
                            value={nick}
                            type="text"
                            placeholder="Nick"
                            className="input"
                            ref={nick_ref}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && typeof onRegistration === "function")
                                    onRegistration(login, pass, nick);
                            }}
                            onChange={(e) => {
                                setNick(e.target.value);
                            }}
                        />
                        <input
                            value={pass}
                            type="password"
                            placeholder="Password"
                            className="input"
                            ref={pass_ref}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && typeof onRegistration === "function")
                                    onRegistration(login, pass, nick);
                            }}
                            onChange={(e) => {
                                setPass(e.target.value);
                            }}
                        />
                        <button
                            className="btn_view"
                            onClick={() => {
                                if (typeof onRegistration === "function") onRegistration(login, pass, nick);
                                // console.log("кнопка регистрации нажата");
                            }}
                            disabled={isLoggedIn || !login || !pass || !nick}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* <!-- Sign In --> */}
                <div className="container__form container--signin">
                    <div className="form">
                        <h2 className="form__title">Sign In</h2>
                        <input
                            value={login}
                            type="text"
                            placeholder="Login"
                            className="input"
                            ref={login2_ref}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && typeof onLogin === "function") onLogin(login, pass, nick);
                            }}
                            onChange={(e) => {
                                setLogin(e.target.value);
                            }}
                        />
                        <input
                            value={pass}
                            type="password"
                            placeholder="Password"
                            className="input"
                            ref={pass2_ref}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && typeof onLogin === "function") onLogin(login, pass, nick);
                            }}
                            onChange={(e) => {
                                setPass(e.target.value);
                            }}
                        />
                        <br />
                        <br />
                        <button
                            className="btn_view"
                            onClick={() => {
                                if (typeof onLogin === "function") onLogin(login, pass, nick);
                                // console.log("кнопка логин нажата");
                            }}
                            disabled={isLoggedIn || !login || !pass}
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                {/* <!-- Overlay --> */}
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <button className="btn_view" onClick={doSignInBtn}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <button className="btn_view" onClick={doSignUpBtn}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CLoginForm = connect((s) => ({ isLoggedIn: s.auth.login, mode: "Login" }), {
    onLogin: actionLogin,
    onRegistration: actionRegistration,
})(LoginForm);
// prettier-ignore

export const PageLogin = () => (
    <div className="PageLogin">
        <CLoginForm />
    </div>
);
