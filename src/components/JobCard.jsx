import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaBriefcase,
  FaHouse,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa6";

function JobCard({ job, isFavorite, toggleFavorite }) {
  return (
    <article className="job-card">
      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
        </div>

        <button
          className="favorite-button"
          onClick={() => toggleFavorite(job.id)}
          title={isFavorite ? "Ukloni iz favorita" : "Dodaj u favorite"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="job-info">
        <p><FaLocationDot /> {job.location}</p>
        <p><FaBriefcase /> {job.employmentType}</p>
        <p><FaHouse /> {job.workMode}</p>
      </div>

      <div className="technologies">
        {job.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      <div className="job-card-footer">
        <span className="salary">
          {job.salaryMin} - {job.salaryMax} €
        </span>

        <Link to={`/jobs/${job.id}`} className="details-link">
          Detalji
        </Link>
      </div>
    </article>
  );
}

export default JobCard;