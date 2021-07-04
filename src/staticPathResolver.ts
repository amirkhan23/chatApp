import path from 'path';
import { ENV } from './Environemnt';


const keyPublic = `../assets/keys/${ENV.toLowerCase()}_jwt.pub`;
const keyPrivate = `../assets/keys/${ENV.toLowerCase()}_jwt`;

export const PUB_KEY_PATH: string = path.join(__dirname, keyPublic);
export const PVT_KEY_PATH: string = path.join(__dirname, keyPrivate);

