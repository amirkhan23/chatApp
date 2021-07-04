import * as express from "express";
import { Failure, JWTPayload, JWT_TOKEN_EXPIRED_TIME_IN_SEC } from "../Constants/CommonConstants";
import { UserRole } from "../Constants/Constants";
import { RequestHandler } from "../RequestHandler";
import { ResponseHandler } from "../ResponseHandler";
import { PUB_KEY_PATH, PVT_KEY_PATH } from "../staticPathResolver";
import { ApiErrorCodes, ApiErrorMessages } from "../Utils/ApiConstants";
import { errorHandler } from "../Utils/ErrorHandler";
import { verifyJWTToken, generateJWTToken } from "../Utils/jwtUtils";
import * as fs from 'fs';


export const validateAdminToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const payload: JWTPayload = RequestHandler.Custom.getAccessTokenPayload(req) as any;
    if (payload && payload.role === UserRole.ADMIN) {
        next();
    }
    else {
        const apiFailure: Failure =
        {
            message: "Not Authorized",
            status: ApiErrorCodes.UNKNOWN_ERROR_SHOW_TO_USER
        };

        ResponseHandler.sendErrorResponse(res, apiFailure);
    }
}


export const validateTokenMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let isTokenVerified: boolean = false;
    let payloadBody: any;
    const apiFailure: Failure =
    {
        message: ApiErrorMessages.UNEXPECTED_ERROR,
        status: ApiErrorCodes.UNEXPECTED_ERROR
    };
    try {
        let { errorMessage, isVerified, payload, errCode } = await verifyJWTToken(RequestHandler.Defaults.getAccessToken(req), getPubKey());

        if (isVerified) {
            payloadBody = payload;
            isTokenVerified = true;
        }
        else {
            apiFailure.message = errorMessage as any;
            apiFailure.status = errCode;
        }
    }
    catch (e) {
        apiFailure.errorData = e;
    }
    finally {
        if (isTokenVerified) {
            RequestHandler.Custom.setAccessTokenPayload(req, payloadBody);
            next();
        }
        else {
            ResponseHandler.sendErrorResponse(res, apiFailure);
        }
    }
}


export function createJwtToken(payload: JWTPayload): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const pvtKey = fs.readFileSync(PVT_KEY_PATH, "utf-8");
            resolve(await generateJWTToken(payload, pvtKey, JWT_TOKEN_EXPIRED_TIME_IN_SEC));
        } catch (error) {
            errorHandler(reject, error);
        }
    });
}

export function getPubKey(): string {
    return fs.readFileSync(PUB_KEY_PATH, "utf-8");
}






