"use client";
import React from "react";

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <article className={`bg-gray-900 shadow-lg rounded-xl p-6 ${className}`}>
            {children}
        </article>
    );
};
