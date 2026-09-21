import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteJob, getJob } from "../services/jobService";
import {
  FaLocationDot,
  FaBriefcase,
  FaHouse,
  FaEuroSign,
} from "react-icons/fa6";

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}.`;
}

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await getJob(id);
        setJob(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

async function handleDelete() {
  const confirmed = window.confirm(
    "Jeste li sigurni da želite obrisati ovaj oglas?"
  );

  if (!confirmed) {
    return;
  }

  try {
  await deleteJob(id);

  const savedFavorites = localStorage.getItem("favorites");

  if (savedFavorites) {
    const favorites = JSON.parse(savedFavorites);

    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  }

    navigate("/");
    } catch (error) {
    setError(error.message);
    }
}

  if (loading) {
    return (
      <main>
        <p>Učitavanje oglasa...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p className="error-message">{error}</p>
        <Link to="/">Povratak na poslove</Link>
      </main>
    );
  }

  return (
    <main>
      <article className="job-details">
        <Link to="/" className="back-link">
          ← Povratak na poslove
        </Link>

        <h1>{job.title}</h1>
        <h2>{job.company}</h2>

        <div className="job-details-info">
            <p>
                <FaLocationDot /> <strong>Lokacija:</strong> {job.location}
            </p>
            <p>
                <FaBriefcase /> <strong>Vrsta zaposlenja:</strong> {job.employmentType}
            </p>
            <p>
                <FaHouse /> <strong>Način rada:</strong> {job.workMode}
            </p>
            <p>
                <FaEuroSign /> <strong>Plaća:</strong> {job.salaryMin} - {job.salaryMax} €
            </p>
        </div>

        <section>
          <h3>Opis posla</h3>
          <p>{job.description}</p>
        </section>

        <section>
          <h3>Potrebna znanja i vještine</h3>
          <p>{job.requirements}</p>
        </section>

        <section>
          <h3>Tehnologije</h3>

          <div className="technologies">
            {job.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        <p className="published-date">
          Datum objave: {formatDate(job.publishedDate)}
        </p>

        <div className="job-details-actions">
            <Link to={`/jobs/${job.id}/edit`} className="edit-link">
                Uredi oglas
            </Link>

            <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
            >
                Obriši oglas
            </button>
            </div>
      </article>
    </main>
  );
}

export default JobDetailsPage;