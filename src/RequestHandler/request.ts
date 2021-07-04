import * as express from 'express';
import { ExpressExtendedRequestParams } from '../Constants/CommonConstants';

function getBody(req: express.Request) {
    return req.body;
}

function getParams(req: express.Request): any {
    return req.params;
}

function getQuery(req: express.Request): any {
    return req.query;
}

function getCookies(req: express.Request) {
    return req.cookies;
}

function getAccessToken(req: express.Request): string | null {
    if (req && req.headers && (req.headers as any).access_token)
    {
        return (req.headers as any).access_token;
    }
    return null;
}

function getRefreshToken(req: express.Request): string | null {
    if (req && req.headers && (req.headers as any).refresh_token)
    {
        return (req.headers as any).refresh_token;
    }
    return null;
}

function getHmacSignature(req: express.Request):string | null {
    if (req && req.headers && (req.headers as any).signature)
    {
        return (req.headers as any).signature;
    }
    return null;
}
const Defaults =
{
    getBody,
    getParams,
    getQuery,
    getCookies,
    getAccessToken,
    getRefreshToken,
    getHmacSignature
}



function getAccessTokenPayload(req: express.Request): any {
    let payload = (req as any)[ExpressExtendedRequestParams.PAYLOAD];
    if (!payload)
    {
        throw new Error("cannot get null payload");
    }
    return payload;
}

function setAccessTokenPayload(req: express.Request, payload: Object) {
    if (!payload)
    {
        throw new Error("cannot set null payload");
    }
    (req as any)[ExpressExtendedRequestParams.PAYLOAD] = payload;
}

function setIncomingTimeStamp(req: express.Request) {
    (req as any)[ExpressExtendedRequestParams.START_TIME] = Date.now();
}

function setIpAddress(req: express.Request, ip: string) {
    (req as any)[ExpressExtendedRequestParams.IP] = ip;
}

function getIpAddress(req: express.Request) {
    let ip = (req as any)[ExpressExtendedRequestParams.IP];
    return ip;
}


function setUploadData(req: express.Request, uploadData: any) {
    (req as any)[ExpressExtendedRequestParams.UPLOAD_DATA] = uploadData;
}

function getUploadData(req: express.Request) {
    return (req as any)[ExpressExtendedRequestParams.UPLOAD_DATA];
}





const Custom =
{
    getAccessTokenPayload, setAccessTokenPayload,
    setIncomingTimeStamp, setIpAddress,
    getIpAddress, setUploadData, getUploadData
}

// setUploadData


export const RequestHandler =
{
    Custom,
    Defaults
}


