import { Button } from "react-bootstrap";
import history from "../history";

export const ButtonToMain = () => (
    <>
        <Button className="gradient mx-2" variant="success btn-sm" onClick={() => history.push("/main")}>
            Вернуться на главную
        </Button>
    </>
);
