import history from "../history";

export const NewChatBtn = () => (
    <div className="NewChat">
        <button
            onClick={() => {
                history.push("/newchat");
            }}
        >
            New Chat
        </button>
    </div>
);
