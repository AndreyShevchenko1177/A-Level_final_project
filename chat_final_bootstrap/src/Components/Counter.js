import { useEffect } from "react";
import { useRef, useState } from "react";
import { gql } from "../Actions";

export const Counter = (chatId) => {
    const [res, setRes] = useState("error");
    const [id, setId] = useState(chatId);

    useEffect(() => messageCountByChatId(id), [id]);

    const messageCountByChatId = async (id) => {
        let count = await gql(
            `query MessageCountByChatId ($chatId:String){
            MessageCount(query: $chatId)
        }`,
            { chatId: JSON.stringify([{ "chat._id": id }]) }
        );

        if (!count.data.errors) setRes(count.data.MessageCount);
    };

    if (!id) return <span>0</span>;
    // console.log(typeof res, res);

    return <span>{res}</span>;
};
