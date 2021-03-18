//

export const actionMsgNewChat = (msgArr) => {
    // console.log("actionMsgAdd - ", JSON.stringify(msgArr, null, 4));
    return { type: "NEW_CHAT", msgs: { [msgArr[0].chat._id]: msgArr } };
};

export const actionMsgInsertInHead = (msgArr) => {
    // console.log("actionMsgAdd - ", JSON.stringify(msgArr, null, 4));
    return { type: "CHAT_INS_HEAD", msgs: { [msgArr[0].chat._id]: msgArr } };
};

export const actionCurChatId = (curChatId) => ({ type: "CURRENTID", curChatId });

export const actionUpdateChatCreatedAt = (_chatId, lastMsgCreatedAt) => ({
    type: "UPDATE_CHAT_CREATEDAT",
    _chatId,
    lastMsgCreatedAt,
});
