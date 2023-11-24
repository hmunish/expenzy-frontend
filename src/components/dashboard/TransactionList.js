import TopBar from '../common/TopBar';

const TransactionList = () => (
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
      <li className="trc-list">
        <p className="trc-cat">Shopping</p>
        <p className="trc-amt exp-clr">-500</p>
        <p className="trc-descp">Buy some grocery</p>
        <p className="trc-time">10:00 am</p>
      </li>
      <li className="trc-list">
        <p className="trc-cat">Shopping</p>
        <p className="trc-amt inc-clr">-500</p>
        <p className="trc-descp">Buy some grocery</p>
        <p className="trc-time">10:00 am</p>
      </li>
      <li className="trc-list">
        <p className="trc-cat">Shopping</p>
        <p className="trc-amt inc-clr">-500</p>
        <p className="trc-descp">Buy some grocery</p>
        <p className="trc-time">10:00 am</p>
      </li>
      <li className="trc-list">
        <p className="trc-cat">Shopping</p>
        <p className="trc-amt inc-clr">-500</p>
        <p className="trc-descp">Buy some grocery</p>
        <p className="trc-time">10:00 am</p>
      </li>
      <li className="trc-list">
        <p className="trc-cat">Shopping</p>
        <p className="trc-amt exp-clr">-500</p>
        <p className="trc-descp">Buy some grocery</p>
        <p className="trc-time">10:00 am</p>
      </li>
      <li className="trc-list">
        <p className="trc-cat">Shopping</p>
        <p className="trc-amt exp-clr">-500</p>
        <p className="trc-descp">Buy some grocery</p>
        <p className="trc-time">10:00 am</p>
      </li>
    </ul>
  </main>
);

export default TransactionList;
