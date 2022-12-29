import {
  getAuth,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const auth = getAuth();

  //generate captcha
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "visible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  //signup function
  async function signup(number) {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      number,
      appVerifier
    );
    window.confirmationResult = confirmationResult;
  }

  //sign in with verification code
  function signIn(code) {
    let confirmationResult = window.confirmationResult;
    return confirmationResult.confirm(code);
  }

  //update user profile
  async function updateUserProfile(name) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    const user = auth.currentUser;
    setCurrentUser({ ...user });
  }

  //logout function
  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    signIn,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
