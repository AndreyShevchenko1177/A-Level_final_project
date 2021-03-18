import React, { Component, useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";
import history from "../history";
import { actionUserInfo } from "../Actions";

function authReducer(state, action) {
    if (state === undefined) {
        if (!localStorage.authToken) {
            return {};
        } else {
            action.type = "LOGIN";
            action.jwt = localStorage.authToken;
        }
    }

    if (action.type === "LOGIN") {
        try {
            localStorage.authToken = action.jwt;
            console.log("ЛОГИН", jwt_decode(action.jwt).sub.login);
            return {
                login: true,
                token: action.jwt,
                payload: jwt_decode(action.jwt).sub.login,
                payloadId: jwt_decode(action.jwt).sub.id,
                //FIXME: ниже отладочный _userId Antipmen
                // payloadId: "5e97105693e2915e617c6fc1",
            };
        } catch (error) {
            console.log(error);
            localStorage.removeItem("authToken");
            return {};
        }
    }

    if (action.type === "LOGOUT") {
        console.log("ЛОГАУТ");
        localStorage.removeItem("authToken");
        return {};
    }

    if (action.type === "INFO") {
        // console.log("INFO **************** ", action.userInfo);
        return {
            ...state,
            payload: action.userInfo.login,
            payloadId: action.userInfo._id,
            nick: action.userInfo.nick,
            avatarUrl: action.userInfo.url,
            chats: action.userInfo.chats,
        };
    }

    // для корректной сортировки чатов по дате последнего сообщения
    if (action.type === "UPDATE_CHAT_CREATEDAT") {
        if (Array.isArray(state.chats)) {
            for (let i in state.chats) {
                if (state.chats[i]._id === action._chatId) {
                    // надо пересобрать объект, чтобы React "почуствовал" изменения
                    state.chats[i] = { ...state.chats[i], createdAt: action.lastMsgCreatedAt };
                }
            }
        }

        // теперь пересобрать массив, чтобы React "почуствовал" изменения
        if (Array.isArray(state.chats)) {
            state.chats = [...state.chats];
        }

        // ну и пересобрать state, чтобы React "почуствовал" изменения
        return { ...state };
    }

    return state;
}

// счетчики общего числа сообщений в чатах
function countReduser(state = {}, action) {
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};

    if (action.type === "NEW_COUNT") {
        return { ...state, ...action.count };
    }

    return state;
}

function msgReduser(state = {}, action) {
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};

    if (action.type === "NEW_CHAT") {
        return { ...state, ...action.msgs };
    }

    if (action.type === "CHAT_INS_HEAD") {
        let [key, value] = Object.entries(action.msgs)[0];
        return { ...state, [key]: [...value, ...state[key]] };
    }

    return state;
}

function newChatUsersReduser(state = {}, action) {
    // console.log(action);
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};

    if (action.type === "ADD_USER_TO_CHAT_LIST") {
        return { ...state, ...action.user };
    }

    if (action.type === "DELETE_USER_FROM_CHAT_LIST") {
        delete state[action._id];
        return { ...state };
    }

    if (action.type === "NEW_CHAT_LIST") {
        return { ...action.user };
    }

    return state;
}

function currentChatIdReduser(state = {}, action) {
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};

    if (action.type === "CURRENTID") {
        return { curChatId: action.curChatId };
    }

    return state;
}

function promiseReducer(state = {}, action) {
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};
    if (action.type === "PROMISE") {
        const { name = "default", status, payload, error } = action;
        if (status) {
            return {
                ...state,
                [name]: {
                    status,
                    payload: (status === "PENDING" && state[name] && state[name].payload) || payload,
                    error,
                },
            };
        }
    }
    return state;
}

export const actionPromise = (name, promise) => {
    const actionPending = () => ({ type: "PROMISE", name, status: "PENDING", payload: null, error: null });
    const actionResolved = (payload) => ({ type: "PROMISE", name, status: "RESOLVED", payload, error: null });
    const actionRejected = (error) => ({ type: "PROMISE", name, status: "REJECTED", payload: null, error });

    return async (dispatch) => {
        dispatch(actionPending());
        let payload;
        try {
            payload = await promise;
            dispatch(actionResolved(payload));
        } catch (e) {
            dispatch(actionRejected(e));
        }
        return payload;
    };
};

export const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        msg: msgReduser,
        curChatId: currentChatIdReduser,
        newChatUsers: newChatUsersReduser,
        countMsg: countReduser,
    }),
    applyMiddleware(thunk)
);

store.subscribe(() => console.log(store.getState()));
