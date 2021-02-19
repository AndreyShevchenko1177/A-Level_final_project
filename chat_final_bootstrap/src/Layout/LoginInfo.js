import myPhoto from "../images/Iam_new2.jpg";
import { CButtonLogout, CYourLogin } from "../Components";

export const LoginInfo = () => (
    <div className="LoginInfo">
        <img src={myPhoto} />
        <CYourLogin />
        <CButtonLogout />
    </div>
);
