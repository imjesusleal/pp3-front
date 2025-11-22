import { UserRoles } from "./user_roles.enum";

export interface RegisterModel {
    username: string;
    password: string;
    email: string;
    userRol: UserRoles
}

export interface RegisterResponse {
    message: string;
    user_id: number;
    username: string;
}