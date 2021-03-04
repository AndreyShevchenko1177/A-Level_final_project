import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionUserInfo } from "../Actions";

const LoginInfo = ({ login, nick, _id, getUserInfo }) => {
    useEffect(() => {
        getUserInfo(_id);
    }, [_id]);

    return (
        <span className="mx-2 text-white">
            {login ? (
                <span>
                    {`Login: ${login}`}
                    {" / "}
                    {`Nick: ${nick}`}
                    <br />
                    {`_id: ${_id}`}
                </span>
            ) : (
                <Link to="/">"You should log in"</Link>
            )}
        </span>
    );
};

export const CLoginInfo = connect((s) => ({ login: s.auth.payload, nick: s.auth.nick, _id: s.auth.payloadId }), {
    getUserInfo: actionUserInfo,
})(LoginInfo);
