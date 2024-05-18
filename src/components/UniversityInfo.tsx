import { LucideGlobe, LucideMapPin, LucideTrash, LucideUniversity } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface IUniversity {
  country: string;
  web_pages: string[];
  alpha_two_code: string;
  domains: string[];
  ["state-province"]: string | null;
  name: string;
}

export interface IProps {
  university: IUniversity;
  onRemove?: (value: string) => void;
}

const UniversityInfo: FC<IProps> = ({ university, onRemove }) => {
  const slug = university?.name?.toLowerCase().split(" ").join("-");
  return (
    <div className="university-box flex" onClick={() => window.location}>
      <div className="university-icon flex items-center justify-center">
        <LucideUniversity size={30} />
      </div>
      <div>
        <h2>{onRemove ? <Link to={slug}>{university.name}</Link> : university.name}</h2>
        <div className="location flex items-center">
          <span className="icon flex items-center">
            <LucideMapPin size={16} />
          </span>
          <span>
            {university["state-province"] && university["state-province"] + " -"} {university.country}
          </span>
        </div>
        <div className="website flex items-center">
          <span className="icon flex items-center">
            <LucideGlobe size={16} />
          </span>
          <span>
            <Link to={university.web_pages[0]} target="_blank">
              {university.domains.join(", ")}
            </Link>
          </span>
        </div>
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove && onRemove(university.name)}
          className="delete-btn flex items-center justify-center"
        >
          <LucideTrash size={18} />
        </button>
      )}
    </div>
  );
};

export default UniversityInfo;
