import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizeUser } from '../../redux/user/userSlice';
import { updatePageType } from '../../redux/onboard/onboardSlice';
import SignIn from './SignIn';
import SignUp from './SignUp';

const OnBoard = () => {
  const user = useSelector((state) => state.user);
  const onboard = useSelector((state) => state.onboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorizeUser());
  }, [dispatch]);

  if (user.isAuthorized) return navigate('/');

  if (onboard.pageType === 'signup') return <SignUp />;
  if (onboard.pageType === 'signin') return <SignIn />;
  return (
    <main id="onboard">
      <section className="wrapper">
        <div id="slider">
          <div className="slider-image-wrapper" />
          <div className="slider-content-wrapper">
            <h1 className="title-1">
              Gain total control
              of your money
            </h1>
            <p className="descp-1">Become your own money manager and make every cent count</p>
          </div>
        </div>
        <div id="button-box">
          <button
            type="button"
            className="dark"
            onClick={() => dispatch(updatePageType('signup'))}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="light"
            onClick={() => dispatch(updatePageType('signin'))}
          >
            Sign In
          </button>
        </div>
      </section>
    </main>
  );
};

export default OnBoard;
