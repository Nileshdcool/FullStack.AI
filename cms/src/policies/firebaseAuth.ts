import { Context } from 'koa';
import admin from '../../config/firebaseAdmin';

export default async (ctx: Context, _config: any) => {
    const authHeader = ctx.request.headers.authorization;

    if (!authHeader) {
        ctx.response.status = 401;
        ctx.response.body = {
            error: {
                status: 401,
                message: 'No authorization token provided',
            },
        };
        return;
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        ctx.state.user = decodedToken;  // Set the user in the context
        return true;  // If authentication passes, allow the request to continue
    } catch (err) {
        ctx.response.status = 401;
        ctx.response.body = {
            error: {
                status: 401,
                message: 'Invalid authorization token',
            },
        };
        return;
    }
};
