import { Response} from 'express';
import jwt, { config } from '@shared/jwt';

function AuthMiddleware(req: any, _: Response, next: any) {
    const authHeader =  req.get('Authorization');
    if(!authHeader) {
        throw new Error('UNAUTHENTICATED');
    }
    const token = authHeader.split(' ')[1]; // Authorization: Bearer token
    
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, config.secretKey);
    }catch (err) {
        console.log('Error: ', err);
        throw new Error('UNAUTHENTICATED');
    }

    if(!decodedToken) {
        throw new Error('UNAUTHENTICATED');
    }
    return next();
}

export default AuthMiddleware;