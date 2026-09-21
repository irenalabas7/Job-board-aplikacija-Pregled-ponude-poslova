import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import SearchBar from "../components/SearchBar";
import JobFilters from "../components/JobFilters";
import { getJobs } from "../services/jobService";

function HomePage() {
  
  const [jobs, setJobs] = useState([]);
const [search, setSearch] = useState("");
const [location, setLocation] = useState("");
const [workMode, setWorkMode] = useState("");

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

const locations = [...new Set(jobs.map((job) => job.location))];
const filteredJobs = jobs.filter((job) => {
  const searchText = search.toLowerCase();

  const matchesSearch =
    job.title.toLowerCase().includes(searchText) ||
    job.company.toLowerCase().includes(searchText);

  const matchesLocation =
    location === "" || job.location === location;

  const matchesWorkMode =
    workMode === "" || job.workMode === workMode;

  return matchesSearch && matchesLocation && matchesWorkMode;
});

if (loading) {
  return (
    <main>
      <p>Učitavanje poslova...</p>
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
        <h1>Pregled ponude poslova</h1>
        <p>Pronađite posao koji vam odgovara.</p>
      </section>

        <section className="search-section">
        <SearchBar
            search={search}
            setSearch={setSearch}
        />

        <JobFilters
            location={location}
            setLocation={setLocation}
            workMode={workMode}
            setWorkMode={setWorkMode}
            locations={locations}
        />
        </section>
      <h2 className="jobs-title">
        Aktualni oglasi ({filteredJobs.length})
        </h2>

      <JobList
  jobs={filteredJobs}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
/>
    </main>
  );
}

export default HomePage;