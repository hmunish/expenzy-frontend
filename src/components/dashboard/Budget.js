import TopBar from '../common/TopBar';

const Budget = () => (
  <section className="wh-100 budget">
    <TopBar text="Financial Report" />
    <div className="budget">
      <div className="budget-pi-graph">
        <select id="budget-filter">
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <div id="pi-graph" />
      </div>
      <div className="budget-bar-graph">
        <div className="budget-bar-graph-toggle flx-ctr">
          <div id="budget-bar-graph-toggle-wrap">
            <div id="toggle-overlay" />
            <button type="button" className="budget-bar-graph-toggle active-bar-toggle">Expense</button>
            <button type="button" className="budget-bar-graph-toggle">Income</button>
          </div>
        </div>
        <div className="bar-graph">
          <div className="bar">
            <div className="bar-tag">
              <div className="tag-circle" />
              <p className="tag-cat">Shopping</p>
            </div>
            <p className="bar-amt">-5120</p>
            <progress className="bar-progress" value="57" min="0" max="100" />
          </div>
          <div className="bar">
            <div className="bar-tag">
              <div className="tag-circle" />
              <p className="tag-cat">Shopping</p>
            </div>
            <p className="bar-amt">-5120</p>
            <progress className="bar-progress" value="57" min="0" max="100" />
          </div>
          <div className="bar">
            <div className="bar-tag">
              <div className="tag-circle" />
              <p className="tag-cat">Shopping</p>
            </div>
            <p className="bar-amt">-5120</p>
            <progress className="bar-progress" value="57" min="0" max="100" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Budget;
