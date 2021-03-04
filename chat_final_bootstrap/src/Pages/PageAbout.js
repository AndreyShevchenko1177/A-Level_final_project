import { Button } from "react-bootstrap";
import history from "../history";

export const PageAbout = () => (
    <>
        FEA-23. Shevchenko Andrey. +38 (098) 852-46-10
        <Button onClick={() => history.push("/")}>Вернуться на главную</Button>
    </>
);
