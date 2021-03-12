export const actionUser = (msgArr) => {
    // console.log("actionMsgAdd - ", JSON.stringify(msgArr, null, 4));
    return { type: "NEW_CHAT", msgs: { [msgArr[0].chat._id]: msgArr } };
};
