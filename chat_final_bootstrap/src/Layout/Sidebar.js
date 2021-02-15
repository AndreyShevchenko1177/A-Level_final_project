import { LoginInfo } from "../Layout";
import { NewChatBtn, ChatsList } from "../Components";

export const Sidebar = () => (
    <aside className="Sidebar">
        <b>Sidebar</b>
        <LoginInfo />
        <NewChatBtn />
        <ChatsList />
    </aside>
);
