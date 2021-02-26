import { useRef, useState } from "react";
import { urlUploadConst } from "../const";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const PageUpload = () => {
    const formRef = useRef(null);
    const [uploadId, setUploadId] = useState("");
    const [uploadUrl, setUploadUrl] = useState("");
    const [fl, setFl] = useState(false);

    function MyDropzone() {
        const onDrop = useCallback((acceptedFiles) => {
            // console.log("МАССИВ", typeof acceptedFiles[0], acceptedFiles[0]);

            let data = new FormData();
            data.set("media", acceptedFiles[0]);

            // console.log(data, typeof data);
            // for (let [name, value] of data) {
            //     console.log(name, typeof name, value, typeof value);
            // }

            fetch(`${urlUploadConst}/upload`, {
                method: "POST",
                headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
                body: new FormData(formRef.current),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setUploadId(res._id);
                    setUploadUrl(res.url);
                });

            //
        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

        return (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
        );
    }

    const doUpload = async () => {
        setFl(false);
        let formData = new FormData(formRef.current);
        // console.log(formData, typeof formData);
        for (let [name, value] of formData) {
            console.log(name, typeof name, value, typeof value);
        }

        // await fetch(`${urlUploadConst}/upload`, {
        //     method: "POST",
        //     headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
        //     body: new FormData(formRef.current),
        // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setUploadId(res._id);
        //         setUploadUrl(res.url);
        //     });

        setFl(true);
    };

    return (
        <>
            <div>
                PageUpload
                <form action={`${urlUploadConst}/upload`} method="post" encType="multipart/form-data" ref={formRef}>
                    <input type="file" name="media" onChange={doUpload} />
                </form>
                {`_id: ${uploadId}, url: ${uploadUrl}`}
                <br />
                {fl && <img src={`${urlUploadConst}/${uploadUrl}`} />}
            </div>
            <br />
            <MyDropzone />
        </>
    );
};
