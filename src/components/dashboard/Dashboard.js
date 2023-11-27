import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dp from '../assets/dp.png';
import incomeImg from '../assets/income.png';
import expenseImg from '../assets/expense.png';
import incomingImg from '../assets/incoming.png';
import outgoingImg from '../assets/outgoing.png';
import Navigation from '../common/Navigation';
import {
  fetchTotals, fetchTransactions, resetState, switchOffIsUpdated,
} from '../../redux/dashboard/dashboardSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dashboard = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchTotals());
    dispatch(fetchTransactions());
    dispatch(switchOffIsUpdated());
  }, [dispatch]);

  const date = new Date();

  return (
    <main id="dashboard">
      <div id="dbd-details-wrp">
        <div className="wrp">
          <div id="dbd-profile-wrp">
            <p className="date">
              {date.toLocaleDateString([], { weekday: 'long' })}
              {' '}
              {date.getDate()}
              <br />
              {date.toLocaleDateString([], { month: 'long' })}
            </p>
            <div id="dbd-dp-name">
              <img src={dp} className="dp" alt="dp" />
              <p className="username">{user.profile.email}</p>
            </div>
          </div>
          <div id="dbd-balance-wrp">
            <p id="acc-bal">Account Balance</p>
            <p id="bal">{dashboard.totalIncome - dashboard.totalExpense}</p>
            <div id="dbd-inc-exp">
              <div className="inc-exp" id="inc">
                <img src={incomeImg} alt="income" />
                <p className="inc-exp">
                  Income
                  <br />
                  <span className="inc-exp">{dashboard.totalIncome}</span>
                </p>
              </div>
              <div className="inc-exp" id="exp">
                <img src={expenseImg} alt="expense" />
                <p className="inc-exp">
                  Expenses
                  <br />
                  <span className="inc-exp">{dashboard.totalExpense}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="recent-transactions-box">
        <div className="rts-link">
          <p className="rts-link">Recent Transactions</p>
          <p className="rts-link"><Link to="/transactions" className="rts-link">View All</Link></p>
        </div>
        <div id="transactions-wrp">
          {/* Rendering top 3 transactions */}
          {dashboard.transactions.slice(0, 3).map((transaction) => (
            <div className="transaction" key={transaction.id}>
              <img src={transaction.amount > 0 ? incomingImg : outgoingImg} alt="transaction" />
              <p className="trs-amt">
                &#8377;
                {' '}
                {Math.abs(transaction.amount)}
                <span className="trs-cat">{transaction.amount > 0 ? 'Income' : 'Expense'}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Navigation />
    </main>
  );
};

export default Dashboard;
