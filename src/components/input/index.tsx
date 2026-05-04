import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
    return (
        <input
            className="w-full h-10 rounded-md px-3 bg-gray-200 text-black outline-none mb-3"
            {...props}
        />
    );
}
