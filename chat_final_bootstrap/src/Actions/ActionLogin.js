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

    if (loginData && loginData.data.login) {
        dispatch(actionAuthLogin(loginData.data.login));
        history.push(`/main/${store.getState().auth.payloadId}`);
    }
};