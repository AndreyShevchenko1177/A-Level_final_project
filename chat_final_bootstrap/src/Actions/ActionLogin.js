import { actionPromise } from "../Reducers";
import history from "../history";
import { store } from "../Reducers";
import { gql, actionSearchMessagesByChatId } from "../Actions";

export const actionAuthLogin = (jwt) => ({ type: "LOGIN", jwt });

export const actionAuthLogout = () => {
    history.push("/");
    return { type: "LOGOUT" };
};

export const actionAuthInfo = ({ login, nick, _id, avatar, chats = [] }) => {
    let url = avatar && avatar.url;
    return { type: "INFO", userInfo: { login, nick, _id, url, chats } };
};

// получить дополнительную более полную инфу о пользователе
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
                                createdAt
                                owner{_id}
                                avatar {url}
                                members{_id login nick avatar{url}}
                            }
                        }
                    }`,
                { userId: JSON.stringify([{ _id: userId }]) }
            )
        )
    );

    // console.log("UserFindOne - ##########", userData.data.UserFindOne);

    if (userData && userData.data.UserFindOne) {
        dispatch(actionAuthInfo(userData.data.UserFindOne)); // получить доп инфу о юзере
        if (userData.data.UserFindOne.chats) {
            userData.data.UserFindOne.chats.forEach(async (chat) => {
                // получить по 10 первых сообщений и каждого из моих чатов
                await dispatch(actionSearchMessagesByChatId(chat._id));
            });
        }
        //
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
        alert(
            `Авторизация не прошла. ${
                (store.getState().promise.login &&
                    store.getState().promise.login.error &&
                    store.getState().promise.login.error.message) ||
                "Проверьте login password"
            }`
        );
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

    console.log("regdata - ", regData);
    if (!regData.error) {
        if (regData && regData.data && regData.data.UserUpsert && regData.data.UserUpsert.login) {
            await actionLogin(login, password)(dispatch);
        } else {
            alert(`Ошибка: ${regData.errors[0].message}`);
        }
    } else {
        alert(
            `Ошибка регистрации: ${
                (store.getState().promise.registration &&
                    store.getState().promise.registration.error &&
                    store.getState().promise.registration.error.message) ||
                "Проблемы с сетью/сервером"
            }`
        );
    }
};
