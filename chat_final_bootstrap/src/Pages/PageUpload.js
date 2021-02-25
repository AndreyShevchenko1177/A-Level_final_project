import { useRef, useState } from "react";
import { urlUploadConst } from "../const";

export const PageUpload = () => {
    const formRef = useRef(null);
    const [uploadId, setUploadId] = useState("");
    const [uploadUrl, setUploadUrl] = useState("");
    const [fl, setFl] = useState(false);

    const doUpload = async () => {
        setFl(false);
        await fetch(`${urlUploadConst}/upload`, {
            method: "POST",
            headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
            body: new FormData(formRef.current),
        })
            .then((res) => res.json())
            .then((res) => {
                setUploadId(res._id);
                setUploadUrl(res.url);
            });
        setFl(true);
    };

    return (
        <div>
            PageUpload
            <form action="/upload" method="post" encType="multipart/form-data" ref={formRef}>
                <input type="file" name="media" id="media" onChange={doUpload} />
            </form>
            {`_id: ${uploadId}, url: ${uploadUrl}`}
            <br />
            {fl && <img src={`${urlUploadConst}/${uploadUrl}`} />}
        </div>
    );
};
