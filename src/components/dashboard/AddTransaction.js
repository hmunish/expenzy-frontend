import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TopBar from '../common/TopBar';
import { addTransaction, resetState, switchOnIsUpdated } from '../../redux/dashboard/dashboardSlice';
import Notification from '../common/Notification';

const AddTransaction = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const [transactionType, setTransactionType] = useState('income');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  const handlerAddTransaction = (e) => {
    e.preventDefault();
    const amount = transactionType === 'income' ? e.target.amount.value : -e.target.amount.value;
    const category = e.target.category.value;
    const description = e.target.description.value;

    dispatch(addTransaction({ amount, category, description }));
    dispatch(switchOnIsUpdated());
  };

  return (
    <section className="wh-100 add-transaction">
      {dashboard.isLoading && <Notification message="Adding Transaction..." type="loading" />}
      {dashboard.isError && <Notification message={dashboard.isAddedError} type="error" />}
      {dashboard.isSuccess && <Notification message="Transaction added successfully" type="success" />}
      <TopBar text="Add Transaction" />
      <form className="add-transaction" onSubmit={handlerAddTransaction}>
        <input className="add-transaction" type="text" name="amount" placeholder="Amount" />
        <input className="add-transaction" type="text" name="category" placeholder="Category" />
        <input className="add-transaction" type="text" name="description" placeholder="Description" />
        <div className="trc-type">
          <button type="button" className={`trc-type income ${transactionType === 'income' ? 'active' : ''}`} onClick={() => setTransactionType('income')}>Income</button>
          <button type="button" className={`trc-type expense ${transactionType === 'expense' ? 'active' : ''}`} onClick={() => setTransactionType('expense')}>Expense</button>
        </div>
        <input className="add-transaction" id="submit-transaction" type="submit" value="Add Transaction" />
      </form>
    </section>
  );
};

export default AddTransaction;
