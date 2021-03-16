//
//
import { urlUploadConst } from "../const";
import { actionPromise } from "../Reducers";
import { gql, actionSearchMessagesByChatId } from "../Actions";

export const actionMessageUpsert = ({ text, chatId }) => async (dispatch) => {
    console.log("actionMessageUpsert --- ", text, chatId);

    let msgData = await dispatch(
        actionPromise(
            "MessageUpsert",
            gql(
                `mutation MessageUpsert($messageData:MessageInput){
                    MessageUpsert(message: $messageData){
                        _id
                    }
                }`,
                { messageData: { text, chat: { _id: chatId } } }
            )
        )
    );

    console.log("MessageUpsert - ", msgData);

    if (msgData && msgData.data && msgData.data.MessageUpsert && msgData.data.MessageUpsert._id) {
        console.log("MessageUpsert - ", msgData);
        dispatch(actionSearchMessagesByChatId(chatId));
    }
};

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

export const actionCreateNewChat = ({ title, members, avaFile }) => async (dispatch) => {
    members = members.map((mem) => ({ _id: mem._id }));

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
                { newChat: { title, members } }
            )
        )
    );

    if (avaFile) {
        let dataSingl = new FormData();
        dataSingl.set("media", avaFile);
        let avaUploadResult = await fetch(`${urlUploadConst}/upload`, {
            method: "POST",
            headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
            body: dataSingl,
        }).then((res) => res.json());

        dispatch(actionMediaUpsert({ chatId: chatData.data.ChatUpsert._id, mediaId: avaUploadResult._id }));
    }

    // if (userData && userData.data.UserFindOne) {
    //     dispatch(actionAuthInfo(userData.data.UserFindOne));
    // } else {
    //     console.log("UserFindOne - ошибка");
    // }
};
