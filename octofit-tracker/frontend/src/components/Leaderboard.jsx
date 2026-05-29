import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(leaderboardEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        if (isMounted) {
          setEntries(normalizeCollectionResponse(payload));
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p className="text-danger">Unable to load leaderboard: {error}</p>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id ?? entry.id} className="list-group-item d-flex justify-content-between">
            <span>{entry.user?.username ?? 'Unknown user'}</span>
            <span className="fw-semibold">{entry.score ?? 0}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
