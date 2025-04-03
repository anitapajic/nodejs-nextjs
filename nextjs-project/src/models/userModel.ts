export interface CurrentUser{
    id:string;
    email:string;
    username:string;
}

export interface User{
    id:string;
    username:string;
    email:string;
    password:string;
}

export interface LoginUser{
    email:string;
    password:string;
}

export interface NewUser{
    username:string;
    email:string;
    password:string;
}
