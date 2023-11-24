import { useSelector } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnBoard from './components/onboarding/OnBoard';
import Dashboard from './components/dashboard/Dashboard';
import TransactionList from './components/dashboard/TransactionList';
import AddTransaction from './components/dashboard/AddTransaction';
import Budget from './components/dashboard/Budget';
import Profile from './components/dashboard/Profile';

function App() {
  const user = useSelector((state) => state.user);
  // Validating if user is authorized to access the app
  if (!user.isAuthorized) return <OnBoard />;
  return (
    <main>
      <Routes>
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
