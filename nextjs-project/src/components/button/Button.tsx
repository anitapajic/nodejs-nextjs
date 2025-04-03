"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={`mt-10 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;