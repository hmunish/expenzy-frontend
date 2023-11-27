import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TopBar from '../common/TopBar';
import {
  fetchTransactions, resetState, switchOffIsUpdated, switchOnIsUpdated,
} from '../../redux/dashboard/dashboardSlice';

const TransactionList = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchTransactions());
    dispatch(switchOffIsUpdated());
  }, [dispatch]);

  const handlerShowMoreTransactions = () => {
    dispatch(switchOnIsUpdated());
    dispatch(fetchTransactions());
    dispatch(switchOffIsUpdated());
  };

  return (
    <main className="bg-light" id="transaction-list">
      <TopBar text="Transactions" />
      <div className="trc-filter">
        <select className="trc-filter">
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <select className="trc-filter">
          <option value="all">All</option>
          <option value="income">IN</option>
          <option value="expense">OUT</option>
        </select>
      </div>
      <ul className="trc-list">
        {
        dashboard.transactions.map((transaction) => (
          <li className="trc-list" key={transaction.id}>
            <p className="trc-cat">{transaction.category}</p>
            <p className={`trc-amt ${transaction.amount > 0 ? 'inc-clr' : 'exp-clr'}`}>{transaction.amount}</p>
            <p className="trc-descp">{transaction.description}</p>
            <p className="trc-time">{new Date(transaction.createdAt).toLocaleTimeString([], { timeStyle: 'short' })}</p>
          </li>
        ))
      }
        {(dashboard.transactions.length && dashboard.isMoreTransactions) && <button type="button" id="show-more-transactions" onClick={() => handlerShowMoreTransactions()}>Show more</button>}
      </ul>
    </main>
  );
};

export default TransactionList;
