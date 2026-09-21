import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { createJob } from "../services/jobService";

function AddJobPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

async function handleAddJob(job) {
  try {
    await createJob(job);
    navigate("/");
  } catch (error) {
    setError(error.message);
  }
}

  return (
    <main>
      <div className="form-container">
        <h1>Dodavanje oglasa</h1>
        <p>Unesite podatke o novom oglasu za posao.</p>

        {error && <p className="form-error">{error}</p>}

        <JobForm onSubmit={handleAddJob} />
      </div>
    </main>
  );
}

export default AddJobPage;