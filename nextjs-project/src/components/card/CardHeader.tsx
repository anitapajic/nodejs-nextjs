"use client";
import React from "react";

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <section className="text-xl font-semibold">{children}</section>;
};
