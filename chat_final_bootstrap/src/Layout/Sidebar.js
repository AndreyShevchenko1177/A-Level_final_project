import { LoginInfo } from "../Layout";
import { CAdditionalTools, ChatsList } from "../Components";

export const Sidebar = () => (
    <aside className="Sidebar">
        <b>Sidebar</b>
        <LoginInfo />
        <CAdditionalTools />
        <ChatsList className="ChatsList" />
    </aside>
);
