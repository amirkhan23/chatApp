import * as express from 'express';
import { Failure } from 'Constants/CommonConstants';

function sendResponse(res: express.Response, body: Express.ApiResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Expose-Headers', 'access_token');
    res.send(body);
}

function sendSuccessResponse(res: express.Response, okBody: Express.ApiOk) {
    const body: Express.ApiResponse =
    {
        status: 200,
        message: okBody.message,
        data: okBody.data
    };
    sendResponse(res, body);
}

function sendErrorResponse(res: express.Response, errorBody: Failure) {
    console.error(JSON.stringify(errorBody));
    if (!errorBody) {
        errorBody = new Object() as any;
    }

    if (!errorBody.status || !errorBody.message) {
        errorBody.status = 501;
        errorBody.message = "Unexpected error";
    }

    const body: Express.ApiResponse =
    {
        status: errorBody.status,
        message: errorBody.message,
        data: undefined,
        extraErrorData: errorBody.errorData || errorBody
    };

    sendResponse(res, body);
}


export const ResponseHandler =
{
    sendSuccessResponse,
    sendErrorResponse
}