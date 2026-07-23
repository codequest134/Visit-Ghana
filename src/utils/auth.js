import * as SecureStore from 'expo-secure-store';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { setCurrentUser, clearCurrentUser } from './currentUser';

const USER_KEY = 'visitghana_user';

const authErrorMessage = (code, action) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    default:
      return action === 'signup'
        ? 'Could not create account. Please try again.'
        : 'Something went wrong. Please try again.';
  }
};

export const saveSession = async (user) => {
  setCurrentUser(user);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

export const clearSession = async () => {
  clearCurrentUser();
  await SecureStore.deleteItemAsync(USER_KEY);
};

export const restoreSession = async () => {
  try {
    const stored = await SecureStore.getItemAsync(USER_KEY);
    if (!stored) {
      return null;
    }

    const user = JSON.parse(stored);
    setCurrentUser(user);
    return user;
  } catch {
    await SecureStore.deleteItemAsync(USER_KEY);
    clearCurrentUser();
    return null;
  }
};

export const signUp = async ({ fullName, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName: fullName.trim() });

    const actionCodeSettings = {
      url: 'https://visitghana-7ea8f.firebaseapp.com/__/auth/action',
      handleCodeInApp: true,
    };

    try {
      await sendEmailVerification(firebaseUser, actionCodeSettings);
    } catch (verificationError) {
      console.warn('Verification email could not be sent:', verificationError);
    }

    const user = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      fullName: firebaseUser.displayName || fullName.trim(),
      provider: 'firebase',
    };

    await saveSession(user);
    return user;
  } catch (error) {
    const message = authErrorMessage(error.code, 'signup');
    const wrappedError = new Error(message);
    wrappedError.code = error.code;
    throw wrappedError;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    const firebaseUser = userCredential.user;

    const user = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      fullName: firebaseUser.displayName || 'User',
      provider: 'firebase',
    };

    await saveSession(user);
    return user;
  } catch (error) {
    const message = authErrorMessage(error.code, 'login');
    const wrappedError = new Error(message);
    wrappedError.code = error.code;
    throw wrappedError;
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
  await clearSession();
};
