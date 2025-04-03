"use client";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { CardContent } from "@/components/card/CardContent";
import { CardHeader } from "@/components/card/CardHeader";
import { Content } from "../content";
import { NewUser } from "@/models/userModel";
import { register } from "@/services/userService";
import { InputField } from "@/components/input/InputField";

export default function SignUp() {
    const [user, setUser] = useState<NewUser>({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const onSignUp = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const response = await register(user);

        if (response.ok) {
            router.push('/login');
            setLoading(false);
        } else {
            setError("Registration failed. Try again.");
            setLoading(false); 
        }
    }

    return (
        <Content>
            <div className="mt-[7rem] flex items-center justify-center  bg-grey-900 p-4">
                <Card className="w-full max-w-md bg-stone-800 shadow-lg rounded-xl p-10">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold text-center text-white">Sign Up</h1>
                    </CardHeader>
                    <CardContent>
                        <section className="space-y-4">
                            <InputField 
                                id="username" 
                                label="Username" 
                                type="username" 
                                value={user.username} 
                                placeholder="Enter your username" 
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className="w-full mt-1"
                            />
                            <InputField 
                                id="email" 
                                label="Email Address" 
                                type="email" 
                                value={user.email} 
                                placeholder="Enter your email" 
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="w-full mt-1"
                            />
                            <InputField 
                                id="password" 
                                label="Password" 
                                type="password" 
                                value={user.password} 
                                placeholder="Enter your password" 
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="w-full mt-1"
                            />

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <Button 
                                onClick={onSignUp} 
                                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition duration-300" 
                                disabled={loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                            </Button>

                            <p className="text-center text-sm text-gray-200">
                                Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Login here!</Link>
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </Content>
    );
}
