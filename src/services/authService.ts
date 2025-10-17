import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
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
};
