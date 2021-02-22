import { LoginInfo } from "../Layout";
import { AdditionalTools, ChatsList } from "../Components";

export const Sidebar = () => (
    <aside className="Sidebar">
        <b>Sidebar</b>
        <LoginInfo />
        <AdditionalTools />
        <ChatsList className="ChatsList" />
    </aside>
);
