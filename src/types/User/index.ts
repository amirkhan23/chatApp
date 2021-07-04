import { ApiEndPoint } from "../../Constants/CommonConstants";

export declare namespace UserApiI {
    interface UserCreateRequest {
        userName: string,
        password: string
    }

    interface UserCreateResponse {
        _id: string
    }

    interface LoginRequest {
        userName: string,
        password: string
    }

    interface LoginResponse {
        accessToken: string,
    }

}

interface Api {
    Login: ApiEndPoint,
    CreateUser: ApiEndPoint,
    Logout: ApiEndPoint
}


export const UserApi: Api =
{
    Login:
    {
        httpMethod: "POST",
        url: "/api/accounts/login"
    },
    CreateUser:
    {
        httpMethod: "POST",
        url: "/api/accounts/register"
    },
    Logout: {
        httpMethod: "GET",
        url: "/api/accounts/logout"
    }
}