import { useRef, useState } from "react";
import { urlUploadConst } from "../const";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const PageUpload = () => {
    const [fl, setFl] = useState(false);
    const resultArray = useRef([]);

    function MyDropzone() {
        const onDrop = useCallback(async (acceptedFiles) => {
            // console.log("МАССИВ", typeof acceptedFiles[0], acceptedFiles[0]);

            setFl(false);

            let aaryOfFatchs = acceptedFiles.map((file) => {
                let dataSingl = new FormData();
                dataSingl.set("media", file);
                return fetch(`${urlUploadConst}/upload`, {
                    method: "POST",
                    headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
                    body: dataSingl,
                })
                    .then((res) => res.json())
                    .catch((e) => alert("Произошла ошибка."));
            });

            resultArray.current = [];

            await Promise.all(aaryOfFatchs).then((responses) =>
                responses.forEach((response) => resultArray.current.push(response))
            );

            console.log(resultArray.current);

            setFl(true);
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

    return (
        <>
            <div>
                PageUpload <br />
                <br />
            </div>
            <br />
            <MyDropzone />
            {resultArray.current.map((res) => (
                <img src={`${urlUploadConst}/${res.url}`} width="100px" key={res._id} />
            ))}
        </>
    );
};
