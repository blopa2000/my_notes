import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Note } from "@/utils/types";

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
          content: doc.data().content,
          lastUpdate,
          creationDate,
          bgColor: doc.data()?.bgColor || "#ffffff",
          pinned: doc.data().pinned,
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
      const res = await getDoc(doc(db, "users", uid, "notes", noteId));
      return res.exists() ? res.data() : null;
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
  updateNote: async (
    uid: string,
    noteId: string,
    note: { title: string; content: string; bgColor: string }
  ) => {
    try {
      if (!uid) {
        throw new Error("User UID is required to delete notes.");
      }

      await updateDoc(doc(db, "users", uid, "notes", noteId), {
        title: note.title,
        content: note.content,
        bgColor: note.bgColor,
        timestamp: serverTimestamp(),
      });
      const fakeTimestamp = {
        toDate: () => new Date(),
      };
      return noteService.transformTimestamp(fakeTimestamp as Timestamp);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
  createNote: async (uid: string, note: { title: string; bgColor: string; content: string }) => {
    try {
      if (!uid) {
        throw new Error("User UID is required to delete notes.");
      }

      const data = {
        title: note.title,
        content: note.content,
        bgColor: note.bgColor,
        creationDate: Timestamp.now(),
        timestamp: serverTimestamp(),
      };

      const res = await addDoc(collection(db, "users", uid, "notes"), data);

      const fakeTimestamp = {
        toDate: () => new Date(),
      };

      return {
        ...data,
        noteId: res.id,
        lastUpdate: noteService.transformTimestamp(fakeTimestamp as Timestamp),
        creationDate: noteService.transformTimestamp(data.creationDate),
      };
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
  changeColor: async (uid: string, noteId: string, newColor: string) => {
    try {
      if (!uid) {
        throw new Error("User UID is required to delete notes.");
      }

      await updateDoc(doc(db, "users", uid, "notes", noteId), {
        bgColor: newColor,
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
  changePinned: async (userId: string, noteId: string, pinned: boolean) => {
    const noteRef = doc(db, "users", userId, "notes", noteId);
    await updateDoc(noteRef, { pinned });
  },
  transformTimestamp: (timestamp: Timestamp): string => {
    const date = timestamp.toDate().toString().split(" ");
    return date[1] + " " + date[2] + " " + date[3];
  },
};
