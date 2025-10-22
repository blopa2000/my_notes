import { useEffect, useState } from "react";
import { noteService } from "../services/noteService";
import { useAuth } from "../context/auth/AuthContext";
import type { Note } from "../utils/types";
import MasonryGrid from "../components/MasonryGrid";

export const Home = () => {
  const [loadingHome, setloadingHome] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  // Fetch notes when user changes
  useEffect(() => {
    (async () => {
      if (user?.uid) {
        setloadingHome(true);
        const getNotes = await noteService.getNotes(user.uid);
        setNotes(getNotes);
        setloadingHome(false);
      }
    })();
  }, [user]);

  if (loadingHome) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MasonryGrid notes={notes} />
    </div>
  );
};
