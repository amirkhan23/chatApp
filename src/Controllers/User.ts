
import { UserApiI } from "../types/User";
import { getHash, checkHash } from "../Utils/bcrypt";
import { errorHandler } from "../Utils/ErrorHandler";
import { ERROR_CODES, JWTPayload } from "../Constants/CommonConstants";
import { UserRole } from "../Constants/Constants";
import { blackListToken, isBlackListToken } from "../Database/mongodb/JWTBlackList";
import { createUser, getUserByUserName } from "../Database/mongodb/User";
import { createJwtToken } from "../middleware/authMiddleware";

export function registerUser(input: UserApiI.UserCreateRequest): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { userName, password } = input;
            const user = await getUserByUserName(userName);
            if (user) {
                errorHandler(reject, { message: "userName already exits", status: ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER });
                return;
            } else {

                const passwordHash = await getHash(password);

                const res = await createUser(userName, passwordHash);
                resolve(res);
            }

        } catch (error) {
            errorHandler(null, error);
            resolve(null)
        }
    });
}

export function login(input: UserApiI.LoginRequest): Promise<{ accessToken: string }> {
    return new Promise(async (resolve, reject) => {
        try {
            const { userName, password } = input;
            console.log(input)
            const payload: JWTPayload = {
                _id: "",
                userName: "",
                role: UserRole.NORMAL
            }

            let loginSuccess = false;
            const user = await await getUserByUserName(userName);
            if (user) {
                const isValidPassword = await checkHash(password, user.password);
                if (isValidPassword) {
                    loginSuccess = true;
                    payload.userName = user.userName;
                    payload.role = user.role ? user.role : UserRole.NORMAL;
                    payload._id = user._id;
                }
            }


            if (!loginSuccess) {
                resolve({ accessToken: "null" });
                return;
            }

            resolve({ accessToken: await createJwtToken(payload) });
        } catch (error) {
            errorHandler(null, error);
            resolve({ accessToken: "null" });
        }
    });
}

export function logout(token: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await isBlackListToken(token);
            if (check) {
                console.log(token)
                resolve({ token: "null" });
                return;
            }
            await blackListToken(token);
            resolve({ token });
        } catch (error) {
            errorHandler(null, error);
            resolve({ token: "null" });
        }
    });
}