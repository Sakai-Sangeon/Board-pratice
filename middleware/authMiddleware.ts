import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export interface AuthRequest extends Request {
    user?: {
        uid: string;
        role: string;
    };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const accessToken = req.cookies.accessToken; // ← localStorage 대신 쿠키에서 읽기

    if (!accessToken) {
        res.status(401).json({ message: '토큰이 없습니다' });
        return;
    }

    try {
        const decoded = authService.verifyAccessToken(accessToken);
        req.user = {
            uid: decoded.uid,
            role: decoded.role
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Access Token이 만료됐습니다. 갱신해주세요' });
    }
};

export default authMiddleware;