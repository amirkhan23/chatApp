import * as express from 'express';
import { validationResult } from 'express-validator';
import { ResponseHandler } from '../ResponseHandler';
import { DEFAULT_FAILURES } from '../Constants/CommonConstants';

export let checkRequestValidationMiddleware = (req: express.Request, res: express.Response, next: Function) => {
    var validationErrors = validationResult(req);
    const isFailed = !validationErrors.isEmpty();
    if (isFailed) {
        let apiFailure = DEFAULT_FAILURES.VALIDATION_FAILED;
        apiFailure.errorData = validationErrors.array();
        ResponseHandler.sendErrorResponse(res, apiFailure);
    }
    else {
        next();
    }
}




