import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "../utils/types";

export const authService = {
  subscribeToAuthState(callback: (user: (User & { uid: string }) | null) => void) {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return callback(null);

      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        callback({ uid: currentUser.uid, ...(userDoc.data() as User) });
      } else {
        callback(null);
      }
    });

    return unsubscribe;
  },

  async signInRequest(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async signOutRequest() {
    return await auth.signOut();
  },

  async signupRequest(email: string, password: string, name: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return await setDoc(doc(db, "users", userCredential.user.uid), { email, name });
  },

  resetPasswordRequest(email: string) {
    return sendPasswordResetEmail(auth, email);
  },
};
