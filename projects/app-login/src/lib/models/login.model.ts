import { UserRoles } from "./user_roles.enum";

export interface LoginModel {
    username: string;
    password: string;
}

export class LoginResponseModel {
    access_token?: string;
    refresh_token?: string;
    id_user?: number;
    username?: string;
    user_rol?: UserRoles

    public static Create(): LoginResponseModel {
        return {
            access_token: undefined,
            refresh_token: undefined,
            id_user: undefined,
            username: undefined, 
            user_rol: undefined
        } as LoginResponseModel;
    }
}