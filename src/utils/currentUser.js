// A simple store to hold the logged-in user across the app.
// Any screen can import this to read or set the current user.

let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const getCurrentUser = () => {
  return currentUser;
};

export const clearCurrentUser = () => {
  currentUser = null;
};