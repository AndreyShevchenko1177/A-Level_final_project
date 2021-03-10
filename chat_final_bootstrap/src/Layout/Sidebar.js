import { CUserInfo } from "../Layout";
import { CAdditionalTools, ChatsList } from "../Components";

export const Sidebar = () => {
    return (
        <aside className="bg-light gradient shadow-sm border-2 rounded-3">
            <CUserInfo />
            <CAdditionalTools />
            <ChatsList className="ChatsList" />
        </aside>
    );
};
