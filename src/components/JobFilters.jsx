function JobFilters({
  location,
  setLocation,
  workMode,
  setWorkMode,
  locations,
}) {
  return (
    <div className="job-filters">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Sve lokacije</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select
        value={workMode}
        onChange={(e) => setWorkMode(e.target.value)}
      >
        <option value="">Svi načini rada</option>
        <option value="U uredu">U uredu</option>
        <option value="Hibridno">Hibridno</option>
        <option value="Remote">Remote</option>
      </select>
    </div>
  );
}

export default JobFilters;