import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import { getJob, updateJob } from "../services/jobService";

function EditJobPage() {
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

  async function handleUpdateJob(updatedJob) {
    try {
      await updateJob(id, updatedJob);
      navigate(`/jobs/${id}`);
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

  if (error && !job) {
    return (
      <main>
        <p className="error-message">{error}</p>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Uređivanje oglasa</h1>
        <p>Izmijenite podatke oglasa za posao.</p>

        {error && <p className="form-error">{error}</p>}

        <JobForm
          initialData={job}
          onSubmit={handleUpdateJob}
        />
      </div>
    </main>
  );
}

export default EditJobPage;