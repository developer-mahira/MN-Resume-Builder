import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext({});
const LOCAL_USERS_KEY = 'rba_users';
const LOCAL_CURRENT_USER_KEY = 'rba_current_user';

const isRedirectPreferredEnvironment = () => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent || '';
  const isMobileViewport = window.innerWidth < 768;
  const isEmbeddedBrowser = /FBAN|FBAV|Instagram|Line|wv|WebView/i.test(userAgent);

  return isMobileViewport || isEmbeddedBrowser;
};

const getReadableAuthError = (err) => {
  switch (err?.code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before finishing. Please try again and keep the popup open.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. We will continue with redirect sign-in instead.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method.';
    case 'auth/unauthorized-domain':
      return 'This app domain is not authorized in Firebase Authentication settings yet.';
    default:
      return err?.message || 'Authentication failed. Please try again.';
  }
};

const normalizeUser = (user) => {
  if (!user) return null;

  return {
    uid: user.uid || user.email,
    name: user.displayName || user.name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    photoURL: user.photoURL || '',
    providerId: user.providerId || user.providerData?.[0]?.providerId || 'local',
  };
};

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(LOCAL_CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

const persistUser = (user) => {
  if (!user) {
    localStorage.removeItem(LOCAL_CURRENT_USER_KEY);
    return;
  }

  localStorage.setItem(LOCAL_CURRENT_USER_KEY, JSON.stringify(user));
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStoredUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const hydrateRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (cancelled || !result?.user) return;

        const normalizedUser = normalizeUser(result.user);
        setUser(normalizedUser);
        persistUser(normalizedUser);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      }
    };

    hydrateRedirectResult();

    return () => {
      cancelled = true;
    };
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const normalizedUser = normalizeUser(user);

      if (normalizedUser) {
        setUser(normalizedUser);
        persistUser(normalizedUser);
      } else {
        const storedUser = readStoredUser();
        setUser(storedUser);
      }

      setLoading(false);
    }, (err) => {
      setError(err.message);
      setUser(readStoredUser());
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithProvider = async (provider) => {
    setError(null);

    if (isRedirectPreferredEnvironment()) {
      await signInWithRedirect(auth, provider);
      return { user: null, redirecting: true };
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const normalizedUser = normalizeUser(result.user);
      setUser(normalizedUser);
      persistUser(normalizedUser);
      return { user: normalizedUser, redirecting: false };
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment') {
        setError(getReadableAuthError(err));
        await signInWithRedirect(auth, provider);
        return { user: null, redirecting: true };
      }

      if (err.code === 'auth/account-exists-with-different-credential' && err.customData?.email) {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, err.customData.email);
          const providerLabelMap = {
            password: 'Email and password',
            'google.com': 'Google',
            'github.com': 'GitHub',
          };
          const readableMethods = methods.map((method) => providerLabelMap[method] || method).join(', ');
          const readableMessage = readableMethods
            ? `This email is already registered with ${readableMethods}. Please use that method first.`
            : getReadableAuthError(err);
          const wrappedError = new Error(readableMessage);
          wrappedError.code = err.code;
          setError(readableMessage);
          throw wrappedError;
        } catch (lookupErr) {
          const fallbackMessage = getReadableAuthError(err);
          const wrappedError = new Error(fallbackMessage);
          wrappedError.code = err.code;
          setError(fallbackMessage);
          throw wrappedError;
        }
      }

      const readableMessage = getReadableAuthError(err);
      const wrappedError = new Error(readableMessage);
      wrappedError.code = err.code;
      setError(readableMessage);
      throw wrappedError;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    return loginWithProvider(provider);
  };

  const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');
    provider.addScope('read:user');
    return loginWithProvider(provider);
  };

  const loginWithEmail = async (email, password) => {
    setError(null);

    const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    const matchedUser = users.find((storedUser) => storedUser.email === email && storedUser.password === password);

    if (!matchedUser) {
      const err = new Error('Invalid email or password.');
      setError(err.message);
      throw err;
    }

    const normalizedUser = normalizeUser({ ...matchedUser, providerId: 'local' });
    setUser(normalizedUser);
    persistUser(normalizedUser);
    return normalizedUser;
  };

  const signupWithEmail = async ({ name, email, password }) => {
    setError(null);

    const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    if (users.some((storedUser) => storedUser.email === email)) {
      const err = new Error('An account with this email already exists.');
      setError(err.message);
      throw err;
    }

    const newUser = {
      uid: `local-${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      providerId: 'local',
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedUsers));

    const normalizedUser = normalizeUser(newUser);
    setUser(normalizedUser);
    persistUser(normalizedUser);
    return normalizedUser;
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      if (err.code && err.code !== 'auth/no-current-user') {
        setError(err.message);
      }
    } finally {
      setUser(null);
      persistUser(null);
    }
  };

  const resetPassword = async (email) => {
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      return {
        status: 'firebase',
        message: 'Password reset email sent. Please check your inbox.'
      };
    } catch (err) {
      const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
      const hasLocalAccount = users.some((storedUser) => storedUser.email === email);

      if (hasLocalAccount) {
        return {
          status: 'local-account',
          message: 'This email belongs to a local demo account. Password reset emails are only available for Firebase email accounts.'
        };
      }

      const readableMessage = getReadableAuthError(err);
      setError(readableMessage);
      throw new Error(readableMessage);
    }
  };

  const value = {
    user,
    loading,
    error,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithGithub,
    resetPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

