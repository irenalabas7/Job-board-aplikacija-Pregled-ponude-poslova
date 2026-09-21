import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <div className="not-found">
        <h1>404</h1>
        <h2>Stranica nije pronađena</h2>

        <p>
          Stranica koju tražite ne postoji ili je premještena.
        </p>

        <Link to="/" className="details-link">
          Povratak na poslove
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;