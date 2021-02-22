import history from "../history";

export const AdditionalTools = () => (
    <div className="NewChat">
        <input placeholder="Serch chat"></input>
        <button
            onClick={() => {
                history.push("/newchat");
            }}
        >
            New Chat
        </button>
    </div>
);
