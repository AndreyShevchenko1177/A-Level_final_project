import { connect } from "react-redux";

const YourLogin = ({ payload }) => <span>{payload ? `Ваш логин: ${payload}` : "Надо бы залогигиниться"}</span>;

export const CYourLogin = connect((s) => ({ payload: s.auth.payload }))(YourLogin);
