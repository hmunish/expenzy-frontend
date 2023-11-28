import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../common/Navigation';
import dpImg from '../assets/dp-big.png';
import accountImg from '../assets/account.png';
import exportImg from '../assets/export.png';
import settingsImg from '../assets/settings.png';
import signoutImg from '../assets/logout.png';
import { removeAuthorization } from '../../redux/user/userSlice';
import { resetState } from '../../redux/onboard/onboardSlice';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(resetState());
    dispatch(removeAuthorization());
  };
  return (
    <section className="profile bg-light">
      <div className="profile-details">
        <img src={dpImg} alt="DP" className="profile-details" />
        <p className="profile-details">
          Username
          <br />
          <span className="profile-details">{user.profile.email}</span>
        </p>
      </div>
      <div id="profile-options">
        <div className="profile-option">
          <div id="profile-option-wrp">
            <img src={accountImg} alt="Account" />
            <p>Account</p>
          </div>
        </div>
        <div className="profile-option">
          <div id="profile-option-wrp">
            <img src={settingsImg} alt="Settings" />
            <p>Settings</p>
          </div>
        </div>
        <div className="profile-option">
          <div id="profile-option-wrp">
            <img src={exportImg} alt="Export" />
            <p>Export</p>
          </div>
        </div>
        <div
          className="profile-option"
          role="link"
          tabIndex={-1}
          aria-hidden="true"
          onClick={handleSignout}
        >
          <div id="profile-option-wrp">
            <img src={signoutImg} alt="SignOut" />
            <p>Sign Out</p>
          </div>
        </div>
      </div>
      <Navigation />
    </section>
  );
};

export default Profile;
