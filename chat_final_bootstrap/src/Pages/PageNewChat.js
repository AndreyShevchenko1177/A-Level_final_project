import { ButtonToMain } from "../Components";

const ChatDashBoard = () => {
    return (
        <>
            <h4>ChatDashBoard</h4>
        </>
    );
};

const AllUsersConst = [
    {
        _id: "5e25e0a41719bf13be585729",
        login: "test3",
        nick: "",
        avatar: null,
    },
    {
        _id: "5e25bf671719bf13be5856c4",
        login: "t",
        nick: "t",
        avatar: null,
    },
    {
        _id: "5f3e4cd7c3de58221910d207",
        login: "Kiliar",
        nick: "Kiliar",
        avatar: null,
    },
    {
        _id: "5f528e96c3de58221910d20c",
        login: "mdm1",
        nick: "jj",
        avatar: null,
    },
    {
        _id: "5f568538c3de58221910d20e",
        login: "11",
        nick: "11",
        avatar: null,
    },
];

const UserItem = ({ _id, login, nick, avatar }) => {
    const avatarUrl = avatar && avatar.url;
    return (
        <p>
            <div>{_id}</div>
            <div>{login}</div>
            <div>{nick}</div>
            <div>{avatarUrl}</div>
        </p>
    );
};

const AllUsers = ({ allUsersArray = AllUsersConst, getAllUsers = null }) => {
    console.log(allUsersArray);
    return (
        <>
            <h4>AllUsers</h4>
            <div>{!!allUsersArray && allUsersArray.map((user) => <UserItem key={user._id} {...user} />)}</div>
        </>
    );
};

export const PageNewChat = () => {
    return (
        <>
            PageNewChat
            <ButtonToMain />
            <div className="PageMain container-fluid">
                <div className="row g-3">
                    <div className="col-md-4">
                        <AllUsers />
                    </div>
                    <div className="col-md-8">
                        <ChatDashBoard />
                    </div>
                </div>
            </div>
        </>
    );
};
