import { UserInfo } from "../Layout";
import { CAdditionalTools, ChatsList } from "../Components";

export const Sidebar = () => (
    <aside className="Sidebar">
        <b>Sidebar</b>
        <UserInfo />
        <CAdditionalTools />
        <ChatsList className="ChatsList" />
    </aside>
);
