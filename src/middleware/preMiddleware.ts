import { Application } from 'express-serve-static-core';
import * as cors from 'cors';
import * as userAgent from 'express-useragent';
import * as express from 'express'
import { RequestHandler } from './../RequestHandler';

export function setUpPreMiddleWares(app: Application) {
    function getIpAddress(req: any) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    }

    app.get('', function (req, res) {
        res.status(500).send("🚀 ==>>> 🌎 Server is Running...");
    });
    app.use(userAgent.express()); // req.useragent
    app.use(cors.default({ origin: '*' }));
    app.use(express.json({ 'limit': '5MB' }));
    app.use(express.urlencoded({ extended: true }));

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        RequestHandler.Custom.setIpAddress(req, getIpAddress(req));
        RequestHandler.Custom.setIncomingTimeStamp(req);
        // RequestHandler.Custom.setUploadData(req);

        next();
    })
}
