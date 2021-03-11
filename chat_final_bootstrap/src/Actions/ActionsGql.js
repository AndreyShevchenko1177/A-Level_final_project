//

import { urlConst } from "../const";
import { actionPromise } from "../Reducers";
import { actionMsgNewChat, actionMsgInsertInHead } from "../Actions";

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

export const actionSearchMessagesByChatId = (_chatId, skip = 0, searchStr = "", limit = 10) => async (dispatch) => {
    let searchObj;
    searchStr = toQuery(searchStr);

    if (_chatId) {
        searchObj = { $and: [{ "chat._id": _chatId }] };
        searchObj.$and.push(searchStr);
    } else searchObj = { searchStr };

    let messages = await dispatch(
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
                            avatar{url}
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
                { searchMsgStr: JSON.stringify([searchObj, { sort: [{ _id: -1 }], skip: [skip], limit: [limit] }]) }
            )
        )
    );
    // console.log("actionFindMessagesByChatId result: ", messages);

    if (messages && messages.data && messages.data.MessageFind && messages.data.MessageFind.length) {
        if (!skip) {
            dispatch(actionMsgNewChat(messages.data.MessageFind.reverse()));
        } else {
            dispatch(actionMsgInsertInHead(messages.data.MessageFind.reverse()));
        }
    }
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
                        members {login}
                        messages {
                            _id
                            createdAt
                            owner {
                                login
                                nick
                            }
                            text
                        }
                        avatar {url}
                    }
                    }`,
                { chatId: JSON.stringify([{ _id: _chatId }, { sort: [{ _id: 1 }] }]) }
            )
        )
    );
    console.log("actionGetMessagesByChatId");
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
    console.log("actionSearchChat - searchData:", searchData);
};
