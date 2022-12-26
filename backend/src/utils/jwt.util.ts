import * as jwt from 'jsonwebtoken';
import { config } from '../configs';

export function generateToken(data: object): string {
    const options = {
        expiresIn: '30d'
    } as jwt.SignOptions;
    return jwt.sign(data, config.JWT_SECRET, options);
}

export function verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, config.JWT_SECRET);
}
