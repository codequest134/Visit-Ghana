import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBrs3P3PmqG5vpeMea3iigKUvl1Q8d8Tck",
  authDomain: "visitghana-7ea8f.firebaseapp.com",
  projectId: "visitghana-7ea8f",
  storageBucket: "visitghana-7ea8f.firebasestorage.app",
  messagingSenderId: "1019967000233",
  appId: "1:1019967000233:web:41e59f4c0ee6a397fee3b8",
  measurementId: "G-4JHQ964YX8"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

let analytics = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(() => {
  analytics = null;
});

export default app;
