import admin from '../firebaseAdmin';
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = 'access_secret_key';
const REFRESH_SECRET = 'refresh_secret_key';

// Firebase 토큰 검증 후 uid, role 반환
export const verifyFirebaseToken = async (idToken: string) => {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return {
        uid: decoded.uid,
        role: (decoded.role as string) || 'user'
    };
};

// Access Token 발급 (1시간)
export const generateAccessToken = (uid: string, role: string) => {
    return jwt.sign({ uid, role }, ACCESS_SECRET, { expiresIn: '1h' });
};

// Refresh Token 발급 (2주)
export const generateRefreshToken = (uid: string) => {
    return jwt.sign({ uid }, REFRESH_SECRET, { expiresIn: '14d' });
};

// Access Token 검증
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET) as { uid: string; role: string };
};

// Refresh Token 검증
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET) as { uid: string };
};