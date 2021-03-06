//
//
import { urlUploadConst } from "../const";
import { actionPromise } from "../Reducers";
import { gql, actionSearchMessagesByChatId, actionUserInfo, actionAuthLogout } from "../Actions";
import history from "../history";
import { store } from "../Reducers";

export const actionMessageUpsert = ({ text, chatId, imgArray = [] }) => async (dispatch) => {
    // console.log("actionMessageUpsert --- ", text, chatId, imgArray.current);

    let messageData = {
        text,
        chat: {
            _id: chatId,
        },
    };

    if (imgArray.current[0]) {
        messageData.media = imgArray.current.map((el) => ({
            _id: el._id,
        }));
    }
    // console.log(messageData);

    let msgData = await dispatch(
        actionPromise(
            "MessageUpsert",
            gql(
                `mutation MessageUpsert($messageData:MessageInput){
                    MessageUpsert(message: $messageData){
                        _id
                        media{
                            _id
                            url
                        }
                    }
                }`,
                { messageData }
            )
        )
    );

    // console.log("MessageUpsert - ", msgData);

    if (msgData.errors && msgData.errors[0] && msgData.errors[0].message) {
        // console.log(`Ошибка отправки сообщения: \nСкорее всего Вас удалили из чата...\n ${msgData.errors[0].message}`);
        dispatch(actionUserInfo(store.getState().auth.payloadId));
        history.push("/");
    }
};

// пока что это только привязка аватарки к чату
const actionMediaUpsert = ({ chatId, mediaId }) => async (dispatch) => {
    let mediaData = await dispatch(
        actionPromise(
            "MediaUpsert",
            gql(
                `mutation med($mediaData:MediaInput){
                    MediaUpsert(media: $mediaData){
                        _id
                        owner{login}
                        text
                        url
                        type
                        userAvatar{login}
                        chatAvatars{title}
                    }
                }`,
                { mediaData: { _id: mediaId, chatAvatars: [{ _id: chatId }] } }
            )
        )
    );
};

export const actionCreateNewChat = ({ _id, title, members, avaFile }) => async (dispatch) => {
    // console.log(avaFile);

    members = members.map((mem) => ({ _id: mem._id }));

    let tempObj = { title, members };

    if (_id) {
        tempObj._id = _id;
    }

    let chatData = await dispatch(
        actionPromise(
            "ChatUpsert",
            gql(
                `mutation ChatUpsert($newChat:ChatInput){
                    ChatUpsert(chat:$newChat){
                        _id
                        title
                        owner{login}
                        members{login}
                    }
                }`,
                { newChat: tempObj }
            )
        )
    );

    // console.log("898989898 ---- ", chatData);

    if (chatData && chatData.data && chatData.data.ChatUpsert && chatData.data.ChatUpsert._id) {
        if (avaFile) {
            let avaUploadResult = await uploadMedia(avaFile);

            await dispatch(actionMediaUpsert({ chatId: chatData.data.ChatUpsert._id, mediaId: avaUploadResult._id }));
        }

        // обновить списки моих чатов
        await dispatch(actionUserInfo(members[0]._id));

        history.push(`/main/${chatData.data.ChatUpsert._id}`);
    } else {
        alert("Ошибка создания/обновления чата");
        history.goBack();
    }
};

const uploadMedia = async (media) => {
    let dataSingl = new FormData();
    dataSingl.set("media", media);
    return await fetch(`${urlUploadConst}/upload`, {
        method: "POST",
        headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
        body: dataSingl,
    }).then((res) => res.json());
};

export const actionUserUpdate = ({ _id, login, nick, password, avaFile, isNeedLogout }) => async (dispatch) => {
    // console.log("+++++++ ", isNeedLogout, _id, login, nick, password, avaFile);

    let dataObj = { _id };

    if (login) dataObj.login = login;
    if (nick) dataObj.nick = nick;
    if (password) dataObj.password = password;

    if (avaFile) {
        let avaUploadResult = await uploadMedia(avaFile);

        if (avaUploadResult && avaUploadResult._id) {
            dataObj.avatar = { _id: avaUploadResult._id };
        } else {
            alert("Ошибка загрузки аватарки");
        }
    }

    // console.log("dataObj - ", dataObj);

    let userUpserResult = await dispatch(
        actionPromise(
            "UserUpsert",
            gql(
                `mutation UserUpsert($userData:UserInput){
                    UserUpsert(user: $userData){
                        _id
                        login
                        nick
                        avatar {url}
                        chats {
                            _id
                            title
                            owner{_id}
                            avatar {url}
                            members{_id login nick avatar{url}}
                        }
                    }
                }`,
                { userData: dataObj }
            )
        )
    );

    // console.log("userUpserResult - ", userUpserResult);

    if (!userUpserResult.errors) {
        if (isNeedLogout) {
            await dispatch(actionAuthLogout());
        } else {
            await dispatch(actionUserInfo(_id));
        }
    } else {
        alert(`Обновить данные пользователя не удалось \n ${userUpserResult.errors}`);
    }

    history.push("/main");
};
