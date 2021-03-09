import { actionPromise } from "../Reducers";
import history from "../history";
import { store } from "../Reducers";
import { gql } from "../Actions";

export const actionAuthLogin = (jwt) => ({ type: "LOGIN", jwt });

export const actionAuthLogout = () => {
    //FIXME: надо засунуть router в redux
    history.push("/");
    return { type: "LOGOUT" };
};

export const actionAuthInfo = ({ login, nick, _id, avatar: { url } = { url: null }, chats = [] }) => {
    // console.log("actionAuthInfo - ", login, nick, _id, url);
    return { type: "INFO", userInfo: { login, nick, _id, url, chats } };
};

export const actionUserInfo = (userId) => async (dispatch) => {
    // console.log("actionUserInfo - ########### ", userId);
    let userData = await dispatch(
        actionPromise(
            "UserFindOne",
            gql(
                `query UserFindOne($userId: String) {
                        UserFindOne(query: $userId) {
                            login
                            nick
                            _id
                            avatar {url}
                            chats {
                                _id
                                title
                                avatar {url}
                                }
                        }
                    }`,
                { userId: JSON.stringify([{ _id: userId }]) }
            )
        )
    );

    // console.log("UserFindOne - ##########", userData.data.UserFindOne);

    if (userData && userData.data.UserFindOne) {
        dispatch(actionAuthInfo(userData.data.UserFindOne));
    } else {
        console.log("UserFindOne - ошибка");
    }
};

export const actionLogin = (login, password) => async (dispatch) => {
    let loginData = await dispatch(
        actionPromise(
            "login",
            gql(
                `query login($login:String, $password:String){
                    login(login:$login,password:$password)
                }`,
                { login, password }
            )
        )
    );

    // console.log("loginData", loginData);

    if (loginData && loginData.data.login) {
        dispatch(actionAuthLogin(loginData.data.login));
        dispatch(actionUserInfo(store.getState().auth.payloadId));

        history.push(`/main`);
    } else {
        alert("Авторизация не прошла. Проверьте логин и пароль.");
    }
};

export const actionRegistration = (login, password, nick) => async (dispatch) => {
    let regData = await dispatch(
        actionPromise(
            "registration",
            gql(
                `mutation NewUser ( $login:String, $password:String, $nick:String ){
                    UserUpsert(user:{  login:$login, password:$password, nick:$nick }){
                        _id
                        createdAt
                        login
                        nick
                        acl
                    }
                }`,
                { login, password, nick }
            )
        )
    );

    // console.log("regdata - ", regData);

    if (regData && regData.data && regData.data.UserUpsert && regData.data.UserUpsert.login) {
        await actionLogin(login, password)(dispatch);
    } else {
        alert(`Ошибка регистрации: ${regData.errors && regData.errors[0].message}`);
    }
};
