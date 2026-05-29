import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { API_BASE_URL, codespaceName } from './lib/api.js';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

export default function App() {
  return (
    <BrowserRouter>
      <main className="container py-4">
        <header className="mb-4">
          <p className="text-muted text-uppercase fw-semibold mb-1">OctoFit Tracker</p>
          <h1 className="h3 mb-2">React 19 Presentation Tier</h1>
          <p className="mb-1">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces API routing.
          </p>
          <p className="mb-0">
            {codespaceName
              ? `Using Codespaces API base: ${API_BASE_URL}`
              : `VITE_CODESPACE_NAME is unset; using safe localhost fallback: ${API_BASE_URL}`}
          </p>
        </header>

        <nav className="nav nav-pills flex-wrap gap-2 mb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
