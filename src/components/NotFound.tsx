import NotFoundImage from "@/assets/undraw_not-found_6bgl.svg";
import "@/styles/notFound.css";
const NotFound = () => {
  return (
    <div className="not-Found-container">
      <img className="not-found-img" src={NotFoundImage} alt="not found note" />
      <p className="not-fount-text">No encuentro la nota que buscas</p>
    </div>
  );
};

export default NotFound;
