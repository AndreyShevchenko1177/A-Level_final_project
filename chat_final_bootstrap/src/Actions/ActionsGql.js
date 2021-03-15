//

import { urlConst } from "../const";
import { actionPromise } from "../Reducers";
import { actionMsgNewChat, actionMsgInsertInHead } from "../Actions";
import { store } from "../Reducers";

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

const toQuery = (str, fields = ["title", "text", "login", "nick", "_id"]) => {
    str = str.replace(/ +/g, " ").trim(); // "/ +/g" - оставляет только по одному пробелу в последовательностях пробелов
    str = "/" + str.split(" ").join("|") + "/";

    let arr = fields.map((s) => {
        return { [s]: str };
    });
    return { $or: arr };
};

export const actionSearchMessagesByChatId = (_chatId, skip = 0, searchStr = "", limit = 10) => async (dispatch) => {
    let searchObj;
    searchStr = toQuery(searchStr);
    // на самом деле searchStr - это теперь уже объект для поиска
    // {
    //     "$or": [
    //         {
    //             "title": "//"
    //         },
    //         {
    //             "text": "//"
    //         },
    //         {
    //             "login": "//"
    //         },
    //         {
    //             "nick": "//"
    //         },
    //         {
    //             "_id": "//"
    //         }
    //     ]
    // }
    // console.log(JSON.stringify(searchStr, null, 4));

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
    } else searchStr = { ...str };
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

export const actionAllUsersFind = (skip = 0, str = "") => async (dispatch) => {
    str = toQuery(str);

    let users = await dispatch(
        actionPromise(
            "UserFind",
            gql(
                `query UserFind($query:String){
                    UserFind(query:$query){
                        _id
                        login
                        nick
                        avatar{url}
                    }
                }`,
                { query: JSON.stringify([str, { sort: [{ _id: -1 }], skip: [skip], limit: [100] }]) }
            )
        )
    );

    if (!users.errors) {
        users = users.data;
        // console.log("actionUserFind - UserFind:", users);
    }
};

// export const actionUsersConcat = (userArr) => {
//     // console.log("actionUsersConcat - ", JSON.stringify(userArr, null, 4));
//     // console.log("actionUsersConcat - ", userArr);
//     return { type: "NEW_USER_PART", userArr };
// };

// это НИЗЗЯ!! это - затянуть всех пользователей сети к себе на Front!!

// export const actionGetAllUsers = () => async (dispatch) => {
//     let userCount = await dispatch(
//         actionPromise(
//             "userCount",
//             gql(
//                 `query UsersCount{
//                     UserCount(query:"[{}]")
//                 }`
//             )
//         )
//     );
//     // console.log("actionUserCount - userCount:", userCount.data.UserCount);
//     if (!userCount.errors) {
//         userCount = userCount.data.UserCount;
//         // console.log("actionUserCount - userCount:", userCount);

//         for (let i = 0; i < userCount; i += 100) {
//             // console.log("++++++++", i);
//             await actionAllUsersFind(i)(dispatch);
//             dispatch(actionUsersConcat(store.getState().promise.UserFind.payload.data.UserFind));
//         }
//     }
// };
