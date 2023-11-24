import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ text, clickHandler }) => {
  const navigate = useNavigate();
  return (
    <nav id="topbar">
      <button className="back" type="button" onClick={clickHandler || (() => navigate(-1))}>
        &larr;
      </button>
      <h1 id="tbr-title">{text}</h1>
    </nav>
  );
};

TopBar.defaultProps = {
  text: '',
  clickHandler: null,
};

TopBar.propTypes = {
  text: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default TopBar;
