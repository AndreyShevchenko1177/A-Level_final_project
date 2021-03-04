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

const toQuery = (str, fields = ["title", "text"]) => {
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";

    let arr = fields.map((s) => {
        return { [s]: str };
    });
    return { $or: arr };
};

export const actionSearchMessagesByChatId = (_chatId, str) => async (dispatch) => {
    let searchStr;
    str = toQuery(str);

    if (_chatId) {
        searchStr = { $and: [{ "chat._id": _chatId }] };
        searchStr.$and.push(str);
    } else searchStr = { str };

    let ChatFindOne = await dispatch(
        actionPromise(
            "MessageFind",
            gql(
                `query MessageFind($searchMsgStr: String) {
                    MessageFind(query: $searchMsgStr) {
                        _id
                        createdAt
                        owner {
                            _id
                            login
                            nick
                        }
                        text
                        createdAt
                        chat {
                            _id
                            title
                            avatar{url}
                        }
                    }
                }`,
                { searchMsgStr: JSON.stringify([searchStr, { sort: [{ _id: 1 }] }]) }
            )
        )
    );
    // console.log("actionFindMessagesByChatId result: ", ChatFindOne);
};

// получить все сообщения из чата с такм-то _id
export const actionGetMessagesByChatId = (_chatId) => async (dispatch) => {
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

export const actionSearchChat = (_userId = "", str = "") => async (dispatch) => {
    let searchStr;
    str = toQuery(str);

    if (_userId) {
        searchStr = { $and: [{ ___owner: _userId }] };
        searchStr.$and.push(str);
    } else searchStr = { str };
    // console.log("actionSearchChat-searchStr: ", searchStr);

    let searchData = await dispatch(
        actionPromise(
            "searchChat",
            gql(
                `query search( $query:String){
                ChatFind(query:$query) {
                    _id
                    title
                    createdAt
                    avatar {url}
                    messages {_id createdAt}
              }
            }`,
                { query: JSON.stringify([searchStr]) }
            )
        )
    );
    // console.log("actionSearchChat - searchData:", searchData);
};
