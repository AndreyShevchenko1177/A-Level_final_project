//

import { urlConst } from "../const";
import { actionPromise } from "../Reducers";

const getGQL = (url) => (query, variables = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: `Bearer ${localStorage.authToken}` } : {}),
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
};

export const gql = getGQL(urlConst);

export const actionFindChatsByUserId = (_userId) => async (dispatch) => {
    let chatList = await dispatch(
        actionPromise(
            "chatsList",
            gql(
                `query FindChatsByUserId($randomId: String) {
                    UserFindOne(query: $randomId) {
                        login
                        _id
                        chats {
                            _id
                            title
                            avatar {url}
                        }
                    }
                }`,
                { randomId: JSON.stringify([{ _id: _userId }, { sort: [{ _id: -1 }] }]) }
            )
        )
    );
    // console.log(chatList);
};
