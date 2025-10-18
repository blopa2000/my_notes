import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import type { User } from "../utils/types";

export const userServices = {
  updateUser: async ({ name, uid }: User) => {
    if (!uid) {
      throw new Error("User UID is required to create a user document.");
    }

    return await updateDoc(doc(db, "users", uid), { name });
  },
};
