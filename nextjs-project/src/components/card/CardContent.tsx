"use client";
import React from "react";

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <section className="p-4">{children}</section>;
};
