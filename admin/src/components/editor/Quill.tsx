'use client'

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill"
import { forwardRef } from "react";

const Quill = forwardRef(function Quill({ value, onChange, className, reffer }: any) {
    return (
        <ReactQuill
            placeholder="Description..."
            onChange={onChange}
            className={className}
            value={value}
            ref={reffer}
            modules={{
                toolbar: [
                    [{ size: [] }],
                    ["bold", "italic", "underline"],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                    ],
                    ["clean"],
                ],
            }}
        />
    )
})

export default Quill