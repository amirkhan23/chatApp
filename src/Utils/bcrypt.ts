import * as bcrypt from 'bcryptjs';
import { errorHandler } from './ErrorHandler';


export function getHash(password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(password, 12, async function (err: any, hash: string) {
            if (err) {
                errorHandler(reject, err)
            }
            else {
                resolve(hash);
            }
        });
    });
}

export function checkHash(password: string, hash: string): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
        bcrypt.compare(password, hash, (err: any, check: boolean) => {
            if (err) {
                errorHandler(reject, err);
            }
            else {
                resolve(check);
            }
        })
    });
}

