import { useState } from "react";

function JobForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
  title: initialData?.title || "",
  company: initialData?.company || "",
  location: initialData?.location || "",
  employmentType: initialData?.employmentType || "",
  workMode: initialData?.workMode || "",
  salaryMin: initialData?.salaryMin || "",
  salaryMax: initialData?.salaryMax || "",
  description: initialData?.description || "",
  requirements: initialData?.requirements || "",
  technologies: initialData?.technologies?.join(", ") || "",
  publishedDate: initialData?.publishedDate || "",
});

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.employmentType ||
      !formData.workMode ||
      !formData.description ||
      !formData.publishedDate
    ) {
      setError("Molimo popunite sva obavezna polja.");
      return;
    }

    if (Number(formData.salaryMin) > Number(formData.salaryMax)) {
      setError("Minimalna plaća ne može biti veća od maksimalne.");
      return;
    }

    const job = {
      ...formData,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),

      technologies: formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter((technology) => technology !== ""),
    };

    setError("");
    onSubmit(job);
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Naziv radnog mjesta *</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Tvrtka *</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="location">Lokacija *</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="employmentType">Vrsta zaposlenja *</label>

          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="">Odaberite</option>
            <option value="Puno radno vrijeme">
              Puno radno vrijeme
            </option>
            <option value="Nepuno radno vrijeme">
              Nepuno radno vrijeme
            </option>
            <option value="Praksa">Praksa</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="workMode">Način rada *</label>

        <select
          id="workMode"
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
        >
          <option value="">Odaberite</option>
          <option value="U uredu">U uredu</option>
          <option value="Hibridno">Hibridno</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="salaryMin">Minimalna plaća (€)</label>
          <input
            id="salaryMin"
            name="salaryMin"
            type="number"
            min="0"
            value={formData.salaryMin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salaryMax">Maksimalna plaća (€)</label>
          <input
            id="salaryMax"
            name="salaryMax"
            type="number"
            min="0"
            value={formData.salaryMax}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Opis posla *</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="requirements">
          Potrebna znanja i vještine
        </label>

        <textarea
          id="requirements"
          name="requirements"
          rows="4"
          value={formData.requirements}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="technologies">
          Tehnologije
        </label>

        <input
          id="technologies"
          name="technologies"
          type="text"
          placeholder="React, JavaScript, CSS"
          value={formData.technologies}
          onChange={handleChange}
        />

        <small>Tehnologije odvojite zarezom.</small>
      </div>

      <div className="form-group">
        <label htmlFor="publishedDate">Datum objave *</label>

        <input
          id="publishedDate"
          name="publishedDate"
          type="date"
          value={formData.publishedDate}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Spremi oglas
      </button>
    </form>
  );
}

export default JobForm;