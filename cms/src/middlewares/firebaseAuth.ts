import { Context } from 'koa';
import admin from '../../config/firebaseAdmin';

const firebaseAuth = () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const authHeader = ctx.request.headers.authorization;

    if (!authHeader) {
      return ctx.unauthorized('No authorization token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      ctx.state.user = decodedToken;
      console.log("decodedToken", decodedToken);

      await next();
    } catch (err) {
      console.log("Error verifying Firebase token:", err);
      return ctx.unauthorized('Invalid authorization token');
    }
  };
};

export default firebaseAuth;