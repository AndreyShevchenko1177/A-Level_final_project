export const actionMsgAdd = (msgArr) => {
    // console.log("actionMsgAdd - ", JSON.stringify(msgArr, null, 4));
    return { type: "ADDMSG", msgs: { [msgArr[0].chat._id]: msgArr } };
};
