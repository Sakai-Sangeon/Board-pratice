import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// 연결 확인용
admin.auth().listUsers(1)
    .then(() => console.log('Firebase Admin 연결 완료'))
    .catch((err) => console.error('Firebase Admin 연결 실패:', err));

export default admin;