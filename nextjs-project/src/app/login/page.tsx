"use client";
import Link from "next/link";
import React, { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { CardContent } from "@/components/card/CardContent";
import { CardHeader } from "@/components/card/CardHeader";
import { Content } from "../content";
import { useUser } from "@/contexts/UserContext";
import { LoginUser } from "@/models/userModel";
import { login } from "@/services/userService";
import { InputField } from "@/components/input/InputField";


export default function LoginPage(){
    const [loginUser, setLoginUser] = useState<LoginUser>({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { refreshUser } = useUser();

    const onLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
       
        const response = await login(loginUser);

        if (response.ok) {
            refreshUser();
            router.push('/')   
            setLoading(false);
        } else {
            setError("Wrong email or password.");
            setLoading(false);
        } 
    };

    return (
        <Content>
            <section className="mt-[10rem] flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-stone-800 shadow-lg rounded-xl p-6">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold text-center text-white">Log In</h1>
                    </CardHeader>
                    <CardContent>
                        <section className="space-y-4">
                            <InputField 
                                id="email" 
                                label="Email Address" 
                                type="email" 
                                value={loginUser.email} 
                                placeholder="Enter your email" 
                                onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
                            />
                            <InputField 
                                id="password" 
                                label="Password" 
                                type="password" 
                                value={loginUser.password} 
                                placeholder="Enter your password" 
                                onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                            />

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>} 

                            <Button 
                                onClick={onLogin} 
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition duration-300" 
                                disabled={loading}
                            >
                                {loading ? "Logging In..." : "Log In"}
                            </Button>

                            <p className="text-center text-sm text-gray-200">
                                Don't have an account? <Link href="/signup" className="text-indigo-600 hover:underline">Sign up here!</Link>
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </section>
        </Content>
    )
}