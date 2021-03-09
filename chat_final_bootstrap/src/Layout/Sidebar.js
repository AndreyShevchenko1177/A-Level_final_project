import { CUserInfo } from "../Layout";
import { CAdditionalTools, ChatsList } from "../Components";

export const Sidebar = () => (
    <aside className="Sidebar">
        <CUserInfo />
        <CAdditionalTools />
        <ChatsList className="ChatsList" />
    </aside>
);
