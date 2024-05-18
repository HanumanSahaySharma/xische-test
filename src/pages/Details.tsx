import { Link, useParams } from "react-router-dom";
import UniversityInfo, { IUniversity } from "../components/UniversityInfo";

const Details = () => {
  const { name } = useParams();
  const universitiesJSON = localStorage.getItem("universities");
  const universities = universitiesJSON ? JSON.parse(universitiesJSON) : [];
  const university = universities.find((item: IUniversity) => item.name.toLowerCase().split(" ").join("-") === name);
  return (
    <div className="container">
      <h2 className="page-title">Details Page</h2>
      <div className="universities universities-details">
        <UniversityInfo university={university} />
        <Link to="/" className="back">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Details;
