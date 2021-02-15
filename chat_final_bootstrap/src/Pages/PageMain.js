import { ChatContain } from "../Components";
import { Sidebar } from "../Layout";

export const PageMain = () => (
    <div className="PageMain container-fluid">
        <div className="row">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                <ChatContain />
            </div>
        </div>
    </div>
);
