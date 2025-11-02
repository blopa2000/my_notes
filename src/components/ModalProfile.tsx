import { useAuth } from "@/context/auth/AuthContext";
import Modal from "./Modal";
import "@/styles/modalProfile.css";
import { useState } from "react";
import { userServices } from "@/services/userServices";

const ModalProfile = ({ toggleModalProfile }: { toggleModalProfile: () => void }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.uid && name !== undefined && name.length > 5) {
      userServices.updateUser({ name, uid: user.uid });

      updateUser({
        name,
      });
      toggleModalProfile();
    } else {
      console.log("minimo 5 caracteres");
    }
  };

  return (
    <Modal toggleshowModalDelete={toggleModalProfile}>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-container-name">
          <label htmlFor="name">Nombre de usuario:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <button className="">Enviar</button>
      </form>
    </Modal>
  );
};

export default ModalProfile;
