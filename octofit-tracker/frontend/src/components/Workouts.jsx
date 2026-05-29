import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(workoutsEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        if (isMounted) {
          setWorkouts(normalizeCollectionResponse(payload));
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
    return <p className="text-danger">Unable to load workouts: {error}</p>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout._id ?? workout.id} className="list-group-item">
            <strong>{workout.name ?? 'Workout plan'}</strong>
            <div className="small text-muted">{workout.description ?? 'No description'}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
