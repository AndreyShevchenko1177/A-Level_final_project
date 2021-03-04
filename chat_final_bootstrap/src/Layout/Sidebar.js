import { UserInfo } from "../Layout";
import { CAdditionalTools, ChatsList } from "../Components";

export const Sidebar = () => (
    <aside className="Sidebar">
        <UserInfo />
        <CAdditionalTools />
        <ChatsList className="ChatsList" />
    </aside>
);
