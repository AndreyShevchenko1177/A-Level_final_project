//
//
import { urlUploadConst } from "../const";
import { actionPromise } from "../Reducers";
import { gql, actionSearchMessagesByChatId, actionUserInfo } from "../Actions";
import history from "../history";

export const actionMessageUpsert = ({ text, chatId }) => async (dispatch) => {
    // console.log("actionMessageUpsert --- ", text, chatId);

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

    // console.log("MessageUpsert - ", msgData);

    if (msgData && msgData.data && msgData.data.MessageUpsert && msgData.data.MessageUpsert._id) {
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
            let dataSingl = new FormData();
            dataSingl.set("media", avaFile);
            let avaUploadResult = await fetch(`${urlUploadConst}/upload`, {
                method: "POST",
                headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
                body: dataSingl,
            }).then((res) => res.json());

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
