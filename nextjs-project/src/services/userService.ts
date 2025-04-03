import { LoginUser, NewUser } from "@/models/userModel"

export const login = async (user: LoginUser) => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/users/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(user)
    })
}

export const register = async (user: NewUser) => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/users/register`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
}

export const logout = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/users/logout`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        credentials: 'include',
      })
}