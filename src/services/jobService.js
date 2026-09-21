const API_URL = "https://6ab0d5d19751d2b03e6c8218.mockapi.io/jobs";

export async function getJobs() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Greška prilikom dohvaćanja poslova.");
  }

  return response.json();
}

export async function getJob(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Oglas nije pronađen.");
  }

  return response.json();
}

export async function createJob(job) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Greška prilikom dodavanja oglasa.");
  }

  return response.json();
}

export async function updateJob(id, job) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Greška prilikom uređivanja oglasa.");
  }

  return response.json();
}

export async function deleteJob(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Greška prilikom brisanja oglasa.");
  }
}