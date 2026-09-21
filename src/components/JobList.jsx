import JobCard from "./JobCard";

function JobList({ jobs, favorites, toggleFavorite }) {
  if (jobs.length === 0) {
    return <p>Nema pronađenih poslova.</p>;
  }

  return (
    <section className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isFavorite={favorites.includes(job.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  );
}

export default JobList;