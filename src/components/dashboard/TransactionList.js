import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TopBar from '../common/TopBar';
import {
  fetchTransactions, resetState, switchOffIsUpdated, switchOnIsUpdated,
} from '../../redux/dashboard/dashboardSlice';

const TransactionList = () => {
  // Setting current month for validating in transaction filter
  const month = new Date();
  month.setDate(1);
  month.setHours(0);
  month.setMinutes(0);

  // States for transaction filter
  const [timeFilter, setTimeFilter] = useState('month');
  const [typeFilter, setTypeFilter] = useState('all');

  // Dashboard redux state
  const dashboard = useSelector((state) => state.dashboard);

  // Dispatch hook
  const dispatch = useDispatch();

  // Using useEffect hook to fetch transactions on first load on the component
  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchTransactions());
    dispatch(switchOffIsUpdated());
  }, [dispatch]);

  // Show more event handler function
  const handlerShowMoreTransactions = () => {
    dispatch(switchOnIsUpdated());
    dispatch(fetchTransactions());
    dispatch(switchOffIsUpdated());
  };

  return (
    <main className="bg-light" id="transaction-list">
      <TopBar text="Transactions" />
      <div className="trc-filter">
        <select className="trc-filter" onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <select className="trc-filter" onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">IN</option>
          <option value="expense">OUT</option>
        </select>
      </div>
      <ul className="trc-list">
        {
        dashboard.transactions.map((transaction) => {
          // Validating transactions according to the selected filter
          if (timeFilter === 'month' && new Date(transaction.createdAt) < month) return null;
          if (typeFilter === 'expense' && transaction.amount > 0) return null;
          if (typeFilter === 'income' && transaction.amount < 0) return null;

          return (
            <li className="trc-list" key={transaction.id}>
              <p className="trc-cat">{transaction.category}</p>
              <p className={`trc-amt ${transaction.amount > 0 ? 'inc-clr' : 'exp-clr'}`}>{transaction.amount}</p>
              <p className="trc-descp">{transaction.description}</p>
              <p className="trc-time">{new Date(transaction.createdAt).toLocaleTimeString([], { timeStyle: 'short' })}</p>
            </li>
          );
        })
      }
        {(dashboard.transactions.length && dashboard.isMoreTransactions) && <button type="button" id="show-more-transactions" onClick={() => handlerShowMoreTransactions()}>Show more</button>}
      </ul>
    </main>
  );
};

export default TransactionList;
