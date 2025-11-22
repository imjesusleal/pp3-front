import { UserRoles } from "../enums/user_roles.enums";

export interface RegisterModel {
    username: string;
    password: string;
    email: string;
    user_rol: UserRoles
}