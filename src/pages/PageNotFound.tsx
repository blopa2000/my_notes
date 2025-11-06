import pageNotFoundImage from "@/assets/undraw_page-not-found_6wni.svg";
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
