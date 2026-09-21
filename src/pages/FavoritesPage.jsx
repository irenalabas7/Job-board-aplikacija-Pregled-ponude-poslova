
import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getJobs } from "../services/jobService";

function FavoritesPage() {
  const [jobs, setJobs] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(
        favorites.filter((favoriteId) => favoriteId !== id)
      );
    } else {
      setFavorites([...favorites, id]);
    }
  }

  const favoriteJobs = jobs.filter((job) =>
    favorites.includes(job.id)
  );

  if (loading) {
    return (
      <main>
        <p>Učitavanje favorita...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p className="error-message">{error}</p>
      </main>
    );
  }

  return (
    <main>
      <section className="intro">
        <h1>Favoriti</h1>
        <p>Oglasi za posao koje ste spremili u favorite.</p>
      </section>

      {favoriteJobs.length === 0 ? (
        <p>Trenutno nemate spremljenih oglasa.</p>
      ) : (
        <>
          <h2 className="jobs-title">
            Spremljeni oglasi ({favoriteJobs.length})
          </h2>

          <JobList
            jobs={favoriteJobs}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </>
      )}
    </main>
  );
}

export default FavoritesPage;