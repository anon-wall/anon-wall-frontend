# Anon-Wall
by K-Coding


## 사용하려면...
src -> api -> firebase.js

`.env` file required.
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};
```
`REACT_APP_LOCAL_SERVER_URL` 또한 설정해주세요.

## User Guide

먼저 **로그인**을 해주세요.

고민 담벼락, 나의 담벼락을 둘러보세요.
