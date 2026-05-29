import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data);
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
