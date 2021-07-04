import { Failure, ERROR_CODES } from '../Constants/CommonConstants';
import * as  os from 'os';
import * as  stackTrace from 'stack-trace';
import { getIndianTime } from './BasicUtils';


export function errorHandler(reject: Function | null, obj: Failure | Error | string | any) {
    if (typeof obj != "object") {
        const f: Failure =
        {
            message: obj,
            status: ERROR_CODES.ERROR_UNKNOWN,
        }
        obj = f;
    }
    console.error(obj)
    if (reject)
        reject(obj);
}

function getProcessInfo() {
    return {
        pid: process.pid,
        // uid: process.getuid ? process.getuid() : null,
        // gid: process.getgid ? process.getgid() : null,
        cwd: process.cwd(),
        // execPath: process.execPath,
        // version: process.version,
        // argv: process.argv,
        // memoryUsage: process.memoryUsage()
    };
}

interface ErrorI {
    message: string,
    error: any,
    trace?: any[],
    stack?: any,
    date: string,
    process: any,
    os?: any
}

function getAllInfo(err: Failure | Error | any): ErrorI {
    const info: ErrorI =
    {
        message: (err.message) ? err.message : 'No message',
        error: err,
        stack: err.stack,
        trace: getTrace(err),
        process: getProcessInfo(),
        os: getOsInfo(),
        date: getIndianTime()
    };

    return (info);
}

function getOsInfo() {
    return {
        loadavg: os.loadavg(),
        uptime: os.uptime()
    };
}

function getTrace(err: any) {
    const trace = err ? stackTrace.parse(err) : stackTrace.get();
    return trace.map(function (site: any) {
        return {
            column: site.getColumnNumber(),
            file: site.getFileName(),
            function: site.getFunctionName(),
            line: site.getLineNumber(),
            method: site.getMethodName(),
            native: site.isNative()
        };
    });
}

