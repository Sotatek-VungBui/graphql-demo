import { Payload } from '@type';
import jwt from 'jsonwebtoken';
import { addSeconds } from 'date-fns';
export default jwt;

export const config = {
    secretKey: process.env.JWT_SECRET || '',
    accessTokenExpires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 60 * 10,
    refreshTokenExpires:
        Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 60 * 60 * 24 * 30
};
export const createToken = (payload: Payload, expiresIn: number) => {
    return jwt.sign(payload, config.secretKey, {
        expiresIn: `${expiresIn}s`
    });
};

export const createAccessToken = (payload: Payload) => {
    return {
        accessToken: createToken(payload, config.accessTokenExpires),
        expires: addSeconds(new Date(), config.accessTokenExpires)
    };
};

export const createRefreshToken = (payload: Payload) => {
    return {
        refreshToken: createToken(payload, config.refreshTokenExpires),
        expires: addSeconds(new Date(), config.refreshTokenExpires)
    };
};

export const signJwt = (payload: Payload) => {
    const { accessToken, expires } = createAccessToken(payload);
    const { refreshToken } = createRefreshToken(payload);
    return {
        accessToken,
        refreshToken,
        expires: expires.toISOString()
    };
};
