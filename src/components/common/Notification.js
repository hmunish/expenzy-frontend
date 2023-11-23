import PropTypes from 'prop-types';

const Notification = ({ message, type }) => (
  <div className={`notification ${type}`}>
    <p className="notification">{message}</p>
  </div>
);

Notification.defaultProps = {
  message: '',
  type: '',
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
