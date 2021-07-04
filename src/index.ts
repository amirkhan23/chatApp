'use strict';
require('dotenv').config();
import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { initMongoDB } from './Database/config/mongodb';
import { setUpPreMiddleWares } from './middleware/preMiddleware';
import { getPubKey } from './middleware/authMiddleware';
import { schema } from './schema/schema';
import expressJwt = require('express-jwt');
import { ENV_VARIABLES } from './serverConfig';
import { errorHandler } from './Utils/ErrorHandler';
import { JWTAlgorithm } from './Utils/jwtUtils';
import { RequestHandler } from './RequestHandler';
import { UserApiI } from './types/User';
import { login } from './Controllers/User';
import { ResponseHandler } from './ResponseHandler';

const PORT = ENV_VARIABLES.SERVER_PORT;
let app: express.Application = express.default();
app.set('port', PORT);

app.use('/graphql', expressJwt({
    secret: getPubKey(),
    credentialsRequired: true,
    algorithms: [JWTAlgorithm]
}), graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
}));

app.post("/login", async (req, res) => {
    try {
        const input: UserApiI.LoginRequest = RequestHandler.Defaults.getBody(req);
        const data = await login(input);
        return ResponseHandler.sendSuccessResponse(res, { data, message: "logged in successfully" });
    } catch (error: any) {
        ResponseHandler.sendErrorResponse(res, { message: error.message || "error", status: 500 });
    }
})

async function init() {
    await initMongoDB();

    return Promise.resolve();
}


init().then(async () => {
    app.listen(PORT, () => {
        console.info(`🚀 ==>>> 🌎 Server started on  http://localhost:${PORT}/`);
        setUpPreMiddleWares(app);
        // startRoutes(app);
        console.log("Server Load Done....");
    });
}).catch((error) => {
    errorHandler(null, error);
})

