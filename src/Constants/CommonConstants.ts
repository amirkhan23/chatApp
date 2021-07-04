import { UserRole } from "./Constants";

export enum ERROR_CODES {
    VALIDATION_FAILED = 501,
    OUTGOING_API_ERROR = 777,
    ERROR_UNKNOWN_SHOW_TO_USER = 408,
    ERROR_UNKNOWN = 409,
    ERROR_CANNOT_FULLFILL_REQUEST = 417,
    DATABASE_ERROR = 402,
    DATABASE_DUPLICATE_ERROR_CODE = 1062,
    INVALID_UPLOADING = 1103,
    TOKEN_INVALID = 511,
    ACCESS_DENIED = 403,
    INVALID_ROUTE_URL = 608,
    INVALID_BASE_URL = 609
}

export type SortType = "ASC" | "DESC"
export type HttpMethod = "POST" | "GET" | "PUT" | "DELETE"

export interface ApiEndPoint {
    httpMethod: HttpMethod,
    url: string
}

export interface GenericApiResponse {
    status: number;
    message: string;
    data: any;
}


export var ExpressExtendedRequestParams =
{
    IP: "ip_address",
    START_TIME: "start_timeStamp",
    PAYLOAD: "payload",
    UPLOAD_DATA: "upload_data"
}


export interface Failure {
    status: number,
    message: string,
    errorData?: any | null,
}

interface X {
    VALIDATION_FAILED: Failure
}

export var DEFAULT_FAILURES: X =
{
    VALIDATION_FAILED: { status: ERROR_CODES.VALIDATION_FAILED, message: "Validation Failed" },
};

export enum HeaderConstants {
    USER_ID = "userid",
    HMAC_SIGNATURE = "signature",
    PRODUCT_NAME = "product_name"
}


export const JWT_TOKEN_EXPIRED_TIME_IN_SEC = 60 * 60; // 1 hour = 60*60 || 1sec = 1 || 1 min = 60 *1

export interface JWTPayload {
    _id: string,
    userName: string,
    role: UserRole
}