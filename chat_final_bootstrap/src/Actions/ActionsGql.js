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
            "userFindOne",
            gql(
                `query UserFindOne($randomId: String) {
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

export const actionFindMessagesByChatId = (_chatId) => async (dispatch) => {
    let ChatFindOne = await dispatch(
        actionPromise(
            "chatFindOne",
            gql(
                `query ChatFindOne($chatId: String) {
                    ChatFindOne(query: $chatId) {
                        _id
                        title
                        createdAt
                        members {
                            login
                        }
                        messages {
                            _id
                            createdAt
                            owner {
                                login
                                nick
                            }
                            text
                        }
                        avatar {
                            url
                        }
                    }
                    }`,
                { chatId: JSON.stringify([{ _id: _chatId }, { sort: [{ _id: 1 }] }]) }
            )
        )
    );
    // console.log(ChatFindOne);
};

const toQuery = (str, fields = ["title"]) => {
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";

    let arr = fields.map((s) => {
        return { [s]: str };
    });
    return { $or: arr };
};

const actionSearch = (str = "community") => async (dispatch) => {
    let searchData = await dispatch(
        actionPromise(
            "search",
            gql(
                `query search( $query:String){
                ChatFind(query:$query) {
                    _id
                    title
              }
            }`,
                { query: JSON.stringify([toQuery(str)], { sort: [{ _id: 1 }] }) }
            )
        )
    );
    console.log(searchData);
};
