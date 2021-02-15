import history from "../history";

const LoginForm = () => (
    <div className="LoginForm">
        <input></input>
        <input></input>
        <button
            // variant="primary"
            onClick={() => {
                console.log("лагин");
                history.push("/main");
            }}
        >
            Login
        </button>
    </div>
);

export const PageLogin = () => (
    <div className="PageLogin">
        <b>PageLogin</b>
        <LoginForm />
    </div>
);
