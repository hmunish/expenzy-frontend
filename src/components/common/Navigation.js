import {
  FaChartPie,
  FaExchangeAlt,
  FaHome, FaPlusCircle, FaUser,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav id="navigation">
    <ul id="nav-wrp">
      <NavLink className="nav-btn" to="/">
        <FaHome />
        Home
      </NavLink>
      <NavLink className="nav-btn" to="/transactions">
        <FaExchangeAlt />
        Transactions
      </NavLink>
      <NavLink id="add-trnsc" className="nav-btn" to="/add-transaction">
        <FaPlusCircle />
      </NavLink>
      <NavLink className="nav-btn" to="/budget">
        <FaChartPie />
        Budget
      </NavLink>
      <NavLink className="nav-btn" to="/profile">
        <FaUser />
        Profile
      </NavLink>
    </ul>
  </nav>
);

export default Navigation;
