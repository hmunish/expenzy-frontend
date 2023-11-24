import dp from '../assets/dp.png';
import incomeImg from '../assets/income.png';
import expenseImg from '../assets/expense.png';
import incomingImg from '../assets/incoming.png';
import outgoingImg from '../assets/outgoing.png';
import Navigation from '../common/Navigation';

const Dashboard = () => (
  <main id="dashboard">
    <div id="dbd-details-wrp">
      <div className="wrp">
        <div id="dbd-profile-wrp">
          <p className="date">
            Monday 9
            <br />
            November
          </p>
          <div id="dbd-dp-name">
            <img src={dp} className="dp" alt="dp" />
            <p className="username">VISHNU</p>
          </div>
        </div>
        <div id="dbd-balance-wrp">
          <p id="acc-bal">Account Balance</p>
          <p id="bal">9400.0</p>
          <div id="dbd-inc-exp">
            <div className="inc-exp" id="inc">
              <img src={incomeImg} alt="income" />
              <p className="inc-exp">
                Income
                <br />
                <span className="inc-exp">25000</span>
              </p>
            </div>
            <div className="inc-exp" id="exp">
              <img src={expenseImg} alt="expense" />
              <p className="inc-exp">
                Expenses
                <br />
                <span className="inc-exp">11200</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="recent-transactions-box">
      <div className="rts-link">
        <p className="rts-link">Recent Transactions</p>
        <p className="rts-link"><a href="/transactions" className="rts-link">View All</a></p>
      </div>
      <div id="transactions-wrp">
        <div className="transaction">
          <img src={incomingImg} alt="incoming" />
          <p className="trs-amt">
            &#8377; 15000
            <span className="trs-cat">Income</span>
          </p>
        </div>
        <div className="transaction">
          <img src={outgoingImg} alt="incoming" />
          <p className="trs-amt">
            &#8377; 15000
            <span className="trs-cat">Income</span>
          </p>
        </div>
        <div className="transaction" />
      </div>
    </div>
    <Navigation />
  </main>
);

export default Dashboard;
