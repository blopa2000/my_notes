import pageNotFoundImage from "@/assets/pagenotFountImg.png";
import "@/styles/pageNotFound.css";
import { useNavigate } from "react-router";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-404">
      <img className="not-found-404-img" src={pageNotFoundImage} alt="not found 404" />
      <p className="not-found-404-text">No encuentro esta pagina</p>

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};
