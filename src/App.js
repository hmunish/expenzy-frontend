import { useSelector } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnBoard from './components/onboarding/OnBoard';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const user = useSelector((state) => state.user);

  // Validating if user is authorized to access the app
  if (!user.isAuthorized) return <OnBoard />;
  return (
    <main>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
