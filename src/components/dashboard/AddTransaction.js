import TopBar from '../common/TopBar';

const AddTransaction = () => (
  <section className="wh-100 add-transaction">
    <TopBar text="Add Transaction" />
    <form className="add-transaction">
      <input className="add-transaction" type="text" name="amount" placeholder="Amount" />
      <input className="add-transaction" type="text" name="category" placeholder="Category" />
      <input className="add-transaction" type="text" name="description" placeholder="Description" />
      <div className="trc-type">
        <button type="button" className="trc-type income">Income</button>
        <button type="button" className="trc-type expense">Expense</button>
      </div>
      <input className="add-transaction" type="date" name="date" placeholder="Pick your date" />
      <input className="add-transaction" id="submit-transaction" type="submit" value="Add Transaction" />
    </form>
  </section>
);

export default AddTransaction;
