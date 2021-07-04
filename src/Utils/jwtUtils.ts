import * as jwt from 'jsonwebtoken';
import { ApiErrorMessages, ApiErrorCodes } from './ApiConstants';
import { errorHandler } from './ErrorHandler';
import { Failure } from '../Constants/CommonConstants';

export interface JWTTokenVerificationResult {
    isVerified: boolean,
    errorMessage: ApiErrorMessages | null,
    payload: any,
    errCode: ApiErrorCodes
};

export const JWTAlgorithm: jwt.Algorithm = "RS256";


/***
 *Always Resolve
 */
export function verifyJWTToken(token: string | null, pubKey: string): Promise<JWTTokenVerificationResult> {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            resolve({ isVerified: false, errorMessage: ApiErrorMessages.JWT_NOT_FOUND, payload: null, errCode: ApiErrorCodes.JWT_NOT_FOUND });
            return;
        }
        else {
            jwt.verify(token, pubKey, { algorithms: [JWTAlgorithm] }, function (err, payload)//err: jwt.VerifyErrors, payload:any
            {
                if (err || !payload) {
                    if (err && err instanceof jwt.TokenExpiredError) {
                        resolve({ isVerified: false, errorMessage: ApiErrorMessages.JWT_TOKEN_EXPIRED, payload: null, errCode: ApiErrorCodes.JWT_TOKEN_EXPIRED });
                    }
                    else {
                        resolve({ isVerified: false, errorMessage: ApiErrorMessages.JWT_TOKEN_INVALID, payload: null, errCode: ApiErrorCodes.JWT_TOKEN_INVALID });
                    }
                }
                else {
                    resolve({ isVerified: true, errorMessage: null, payload, errCode: 0 });
                }
            });
        }
    });
}


/**
 * @param payload
 * @param expiryTimeInsecs if <=0 NEVER EXPIRE
*/
export function generateJWTToken(payload: any, pvtKey: string, expiryTimeStamp: number): Promise<string> {
    return new Promise((resolve, reject) => {
        let signOptions = { expiresIn: expiryTimeStamp, algorithm: JWTAlgorithm };

        jwt.sign(payload, pvtKey, signOptions, function (err, token) {
            if (err || !token) {
                const failure: Failure =
                {
                    message: "Error creating Token",
                    status: ApiErrorCodes.UNKNOWN_ERROR_SHOW_TO_USER,
                    errorData: err
                };

                errorHandler(reject, failure);
            }
            else {
                resolve(token);
            }
        })
    })
};