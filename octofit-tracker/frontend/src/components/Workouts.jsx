import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('workouts')
      .then((data) => {
        if (isMounted) {
          setWorkouts(data);
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
