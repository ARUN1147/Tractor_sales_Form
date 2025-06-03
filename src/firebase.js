// frontend/src/firebase.js

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
  projectId: 'YOUR_FIREBASE_PROJECT_ID',
  storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_FIREBASE_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID'
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

/**
 * Request permission to send notifications and get FCM token
 * @param {Function} setFcmToken callback to set token in context
 */
export const requestFirebaseNotificationPermission = async (setFcmToken) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey: 'YOUR_FIREBASE_VAPID_KEY'
      });
      if (currentToken) {
        console.log('FCM registration token:', currentToken);
        setFcmToken(currentToken);
      } else {
        console.log('No registration token available.');
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
