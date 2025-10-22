import { useLocation } from "react-router";

const EditNote = () => {
  const location = useLocation();
  const { noteId } = location.state || {};

  return <div>EditNote:{noteId}</div>;
};

export default EditNote;
