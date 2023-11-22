import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ text, clickHandler }) => {
  const navigate = useNavigate();
  return (
    <nav>
      <button className="back" type="button" onClick={clickHandler || (() => navigate(-1))}>
        &larr;
      </button>
      <h1>{text}</h1>
    </nav>
  );
};

Navbar.defaultProps = {
  text: '',
  clickHandler: null,
};

Navbar.propTypes = {
  text: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default Navbar;
