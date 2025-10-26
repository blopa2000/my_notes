import { db } from "@/firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { User } from "@/utils/types";

export const userServices = {
  getUser: async (uid: string) => {
    return await getDoc(doc(db, "users", uid));
  },
  createUser: async (user: User, uid: string) => {
    const { email, name } = user;
    if (!uid) {
      throw new Error("User UID is required to create a user document.");
    }
    return await setDoc(doc(db, "users", uid), { email, name });
  },
  updateUser: async ({ name, uid }: User) => {
    if (!uid) {
      throw new Error("User UID is required to create a user document.");
    }
    return await updateDoc(doc(db, "users", uid), { name });
  },
};
