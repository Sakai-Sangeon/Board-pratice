import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { idToken } = req.body;

    try {
        const { uid, role } = await authService.verifyFirebaseToken(idToken);
        const accessToken = authService.generateAccessToken(uid, role);
        const refreshToken = authService.generateRefreshToken(uid);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 14 * 24 * 60 * 60 * 1000
        });

        res.json({ message: '로그인 성공', uid, role });

    } catch (err) {
        res.status(401).json({ message: '유효하지 않은 토큰입니다' });
    }
};

export const refresh = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({ message: 'Refresh Token이 없습니다' });
        return;
    }

    try {
        const { uid } = authService.verifyRefreshToken(refreshToken);
        const newAccessToken = authService.generateAccessToken(uid, 'user');

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });

        res.json({ message: 'Access Token 갱신 완료' });

    } catch (err) {
        res.status(401).json({ message: 'Refresh Token이 만료됐습니다. 다시 로그인해주세요' });
    }
};

export const logout = (req: Request, res: Response): void => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: '로그아웃 완료' });
};