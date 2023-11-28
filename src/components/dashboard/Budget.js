import { useDispatch, useSelector } from 'react-redux';
import useRazorpay from 'react-razorpay';
import { useEffect, useState } from 'react';
import TopBar from '../common/TopBar';
import { buyPremium, switchOnPremium, updateOrderStatus } from '../../redux/user/userSlice';
import { getBudget } from '../../redux/dashboard/dashboardSlice';

const Budget = () => {
  const user = useSelector((state) => state.user); // Redux user state
  const dashboard = useSelector((state) => state.dashboard); // Redux dashboard state
  const dispatch = useDispatch();
  const [transactionType, setTransactionType] = useState('expense');
  const budgetTransactions = transactionType === 'income' ? dashboard.incomeGroupTotal : dashboard.expenseGroupTotal;
  const budgetTransactionsTotal = transactionType === 'income' ? dashboard.budgetIncomeTotal : dashboard.budgetExpenseTotal;
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    dispatch(getBudget());
  }, [dispatch]);

  const handlerBuyPremium = async () => {
    // Creating razorpay order from backend
    const { payload: data } = await dispatch(buyPremium());

    // Validating if key & order id exist in the response data if not returning error
    if (!data.key && !data.order_id) return false;

    // Options for razorpay checkout window
    const options = {
      key: data.key,
      order_id: data.orderId,
      handler: async (response) => {
        await dispatch(updateOrderStatus({ orderId: data.order_id, paymentId: response.razorpay_payment_id, status: 'SUCCESS' }));
        dispatch(switchOnPremium());
      },
    };
    // Creating new razorpay object
    const rzp = new Razorpay(options);

    // Updating database with order failed if payment is failed
    rzp.on('payment.failed', () => {
      dispatch(updateOrderStatus({ orderId: data.order_id, paymentId: null, status: 'FAILED' }));
    });

    // Opening razorpay window
    return rzp.open();
  };

  // Rendering budget if user is a premium user
  return (
    <section className="wh-100 budget">
      <TopBar text="Financial Report" />
      {user.profile.isPremium || <button type="button" id="buy-premium" onClick={handlerBuyPremium}>Buy Premium</button>}
      {user.profile.isPremium && (
      <div className="budget">
        <div className="budget-pi-graph">
          <div id="pi-graph" />
        </div>
        <div className="budget-bar-graph">
          <div className="budget-bar-graph-toggle flx-ctr">
            <div id="budget-bar-graph-toggle-wrap">
              <div id="toggle-overlay" className={transactionType === 'income' ? 'tx-100' : ''} />
              <button type="button" className={`budget-bar-graph-toggle ${transactionType === 'expense' ? 'active-bar-toggle' : ''}`} onClick={() => setTransactionType('expense')}>Expense</button>
              <button type="button" className={`budget-bar-graph-toggle ${transactionType === 'income' ? 'active-bar-toggle' : ''}`} onClick={() => setTransactionType('income')}>Income</button>
            </div>
          </div>
          <div className="bar-graph">
            {
              budgetTransactions.map((transaction) => (
                <div className="bar" key={transaction.category}>
                  <div className="bar-tag">
                    <div className="tag-circle" />
                    <p className="tag-cat">{transaction.category}</p>
                  </div>
                  <p className="bar-amt">{transaction.total}</p>
                  <progress className="bar-progress" value={Math.round((+transaction.total / budgetTransactionsTotal) * 100)} min="0" max="100" />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

export default Budget;
