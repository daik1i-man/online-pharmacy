"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { forwardRef } from "react";

const Quill = forwardRef(function Quill({
    ReadOnly,
    content,
    onChange,
    className,
    reffer,
}: any) {
    return (
        <>
            <ReactQuill
                theme={ReadOnly ? "bubble" : "snow"}
                readOnly={ReadOnly}
                placeholder={ReadOnly ? "" : ` Yozing...`}
                onChange={onChange}
                value={content}
                ref={reffer}
                className={className}
                modules={{
                    toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                    ],
                }}
            />
        </>
    );
});

export default Quill;