import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { Note } from "../utils/types";

export const noteService = {
  getNotes: async (uid: string): Promise<Note[] | []> => {
    try {
      if (!uid) {
        throw new Error("User UID is required to fetch notes.");
      }
      const querySnapshot = await getDocs(
        query(collection(db, "users", uid, "notes"), orderBy("timestamp", "desc"))
      );

      if (querySnapshot.empty) {
        return [];
      }

      const res = querySnapshot.docs.map((doc) => {
        const lastUpdate = noteService.transformTimestamp(doc.data().timestamp as Timestamp);
        const creationDate = noteService.transformTimestamp(doc.data().creationDate as Timestamp);

        return {
          noteId: doc.id,
          title: doc.data().title,
          content: doc.data().content.slice(0, 500),
          color: doc.data().color,
          lastUpdate,
          creationDate,
          bgColor: doc.data().bgColor,
        };
      });

      return res;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },
  getNote: async (uid: string, noteId: string) => {
    try {
      if (!uid) {
        throw new Error("User UID is required to fetch notes.");
      }
      return await getDoc(doc(db, "users", uid, "notes", noteId));
    } catch (error) {
      console.error("Error fetching note:", error);
      throw error;
    }
  },
  deleteNote: async (uid: string, noteId: string) => {
    try {
      if (!uid) {
        throw new Error("User UID is required to delete notes.");
      }
      return await deleteDoc(doc(db, "users", uid, "notes", noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
  transformTimestamp: (timestamp: Timestamp): string => {
    const date = timestamp.toDate().toString().split(" ");
    return date[1] + " " + date[2] + " " + date[3];
  },
};
